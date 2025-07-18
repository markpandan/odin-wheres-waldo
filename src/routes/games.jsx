import { useEffect, useRef, useState } from "react";
import styles from "./games.module.css";
import BoundingBox from "../components/BoundingBox";
import {
  getContainedSize,
  getContainedX,
  getNaturalPosition,
  isInsideBox,
} from "../utils/imageUtils";
import Stopwatch from "../components/Stopwatch";
import StartModal from "../components/StartModal";
import HighScoreModal from "../components/HighScoreModal";

const Games = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [image, setImage] = useState();
  const [entities, setEntities] = useState([]);
  const [time, setTime] = useState(0);
  const [pos, setPos] = useState();

  const [active, setIsActive] = useState(false);
  const startDialogRef = useRef(false);
  const highScoreDialogRef = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchGame = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/games/images/1/entities",
          { signal: abortController.signal }
        );

        const jsonData = await response.json();
        if (!response.ok) {
          setError(jsonData.message);
        } else {
          const output = jsonData.output;

          setImage(output.imageUrl);
          setEntities(
            output.Entities.map((values) => {
              return { ...values, selected: false };
            })
          );
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGame();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const isAllSelected = entities.every((entity) => entity.selected == true);

    if (isAllSelected && entities.length !== 0) {
      console.log("Game Over");
      setIsActive(false);

      highScoreDialogRef.current.show();
    }
  }, [entities]);

  const handleLoad = () => {
    startDialogRef.current.show();
    // highScoreDialogRef.current.close();
  };

  const handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { containedWidth, scale } = getContainedSize(e.target);

    const containedX = getContainedX(offsetX, containedWidth, e.target.width);
    const containedY = offsetY;

    if (!containedX) {
      setPos();
    } else {
      const naturalPos = getNaturalPosition([containedX, containedY], scale);

      setPos([offsetX, offsetY]);

      entities.some((entity, currentIndex) => {
        if (isInsideBox(naturalPos, entity.box)) {
          console.log("Entity Detected");

          setEntities(
            entities.map((values, index) => {
              if (index == currentIndex) {
                return { ...values, selected: true };
              } else {
                return values;
              }
            })
          );

          return true;
        }
      });
    }
  };

  return (
    <>
      <div className={`flex-container ${styles.gameContainer}`}>
        {error && <div>{error}</div>}
        {loading ? (
          <div> Loading...</div>
        ) : (
          <>
            <HighScoreModal
              ref={highScoreDialogRef}
              time={time}
              onRestart={() => {
                highScoreDialogRef.current.close();
                setTime(0);
                setIsActive(true);
                setEntities(
                  entities.map((values) => {
                    return { ...values, selected: false };
                  })
                );
              }}
            />
            <StartModal
              ref={startDialogRef}
              onStart={() => {
                startDialogRef.current.close();
                setIsActive(true);
              }}
            />
            <img
              className={styles.gameImage}
              src={image}
              onClick={handleImageClick}
              onLoad={handleLoad}
            />
            {pos && <BoundingBox pos={pos} />}
          </>
        )}
        <div className={styles.gameObjectives}>
          <div>Objectives</div>
          <Stopwatch isActive={active} time={time} setTime={setTime} />
        </div>
      </div>
    </>
  );
};

export default Games;

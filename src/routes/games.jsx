import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BoundingBox from "../components/BoundingBox";
import HighScoreModal from "../components/HighScoreModal";
import StartModal from "../components/StartModal";
import Stopwatch from "../components/Stopwatch";
import { fetchGet } from "../utils/fetchUtils";
import {
  getContainedSize,
  getContainedX,
  getNaturalPosition,
  isInsideBox,
} from "../utils/imageUtils";
import styles from "./games.module.css";
import ObjectiveModal from "../components/ObjectiveModal";

const Games = () => {
  const { gameId } = useParams();

  const [isGameActive, setIsGameActive] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [image, setImage] = useState();
  const [entities, setEntities] = useState([]);
  const [time, setTime] = useState(0);

  // const [pos, setPos] = useState();
  const [objectivesPos, setObjectivesPos] = useState([]);

  const startDialogRef = useRef(false);
  const highScoreDialogRef = useRef(false);
  const objectDialogRef = useRef(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchGame = async () => {
      try {
        const response = await fetchGet(
          `games/images/${gameId}/entities`,
          abortController.signal
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isAllSelected = entities.every((entity) => entity.selected == true);

    if (isAllSelected && entities.length !== 0) {
      console.log("Game Over");
      setIsGameActive(false);
      setObjectivesPos([]);

      highScoreDialogRef.current.show();
    }
  }, [entities]);

  const handleLoad = () => {
    startDialogRef.current.show();
    // highScoreDialogRef.current.close();
    objectDialogRef.current.close();
  };

  const handleImageClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { containedWidth, scale } = getContainedSize(e.target);

    const containedX = getContainedX(offsetX, containedWidth, e.target.width);
    const containedY = offsetY;

    const naturalPos = getNaturalPosition([containedX, containedY], scale);

    entities.some((entity, currentIndex) => {
      if (isInsideBox(naturalPos, entity.box) && !entity.selected) {
        console.log("Entity Detected");

        setObjectivesPos((objectivesPos) => [
          ...objectivesPos,
          [offsetX, offsetY],
        ]);

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
  };

  return (
    <>
      <div className={`flex-container ${styles.gameContainer}`}>
        {error && <div>{error}</div>}
        {loading ? (
          <div> Loading...</div>
        ) : (
          <>
            <ObjectiveModal ref={objectDialogRef} entities={entities} />
            <HighScoreModal
              ref={highScoreDialogRef}
              time={time}
              gameId={gameId}
              onRestart={() => {
                highScoreDialogRef.current.close();
                setTime(0);
                setIsGameActive(true);
                setEntities(
                  entities.map((values) => {
                    return { ...values, selected: false };
                  })
                );
                setObjectivesPos([]);
              }}
            />
            <StartModal
              ref={startDialogRef}
              onStart={() => {
                startDialogRef.current.close();
                setIsGameActive(true);
              }}
            />
            <img
              className={styles.gameImage}
              src={image}
              onClick={handleImageClick}
              onLoad={handleLoad}
            />
            {objectivesPos.map((pos, index) => (
              <BoundingBox key={index} pos={pos} />
            ))}
          </>
        )}
        <div className={`${styles.gameUtilities}`}>
          <div className={`container ${styles.utilitiesContainer}`}>
            <Stopwatch isActive={isGameActive} time={time} setTime={setTime} />
            <button
              onClick={() => {
                objectDialogRef.current.show();
              }}
            >
              <span>Objectives</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;

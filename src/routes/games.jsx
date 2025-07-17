import { useEffect, useState } from "react";
import styles from "./games.module.css";
import BoundingBox from "../components/BoundingBox";
import {
  getContainedSize,
  getContainedX,
  getNaturalPosition,
} from "../utils/imageUtils";

const Games = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [image, setImage] = useState();
  const [entities, setEntities] = useState();
  const [pos, setPos] = useState();

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
          setEntities(output.Entities);
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

  const handleClick = (e) => {
    const dimensions = getContainedSize(e.target);

    const containedX = getContainedX(
      e.nativeEvent.offsetX,
      dimensions.containedWidth,
      e.target.width
    );
    const containedY = e.nativeEvent.offsetY;

    if (containedX) {
      const [naturalX, naturalY] = getNaturalPosition(
        [containedX, containedY],
        dimensions.scale
      );

      entities.forEach((entity) => {
        const [x1, y1, x2, y2] = entity.box;

        if (
          naturalX >= x1 &&
          naturalX <= x2 &&
          naturalY >= y1 &&
          naturalY <= y2
        ) {
          console.log("Entity Detected");
        }
      });
    }

    setPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };

  return (
    <>
      <div className={`flex-container ${styles.gameContainer}`}>
        {error && <div>{error}</div>}
        {loading ? (
          <div> Loading...</div>
        ) : (
          <>
            <img
              className={styles.gameImage}
              src={image}
              onClick={handleClick}
            />
            {pos && <BoundingBox pos={pos} />}
          </>
        )}
        <div className={styles.gameObjectives}>
          <div>Objectives</div>
          <div>Stopwatch</div>
        </div>
      </div>
    </>
  );
};

export default Games;

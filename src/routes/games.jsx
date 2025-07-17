import { useState } from "react";
import styles from "./games.module.css";
import BoundingBox from "../components/BoundingBox";
import {
  getContainedSize,
  getContainedX,
  getNaturalPosition,
} from "../utils/imageUtils";

const Games = () => {
  const [pos, setPos] = useState();

  const handleClick = (e) => {
    const dimensions = getContainedSize(e.target);

    const containedX = getContainedX(
      e.nativeEvent.offsetX,
      dimensions.containedWidth,
      e.target.width
    );
    const containedY = e.nativeEvent.offsetY;

    if (containedX) {
      console.log(
        getNaturalPosition([containedX, containedY], dimensions.scale)
      );
    }
  };

  const handleLoad = (e) => {
    const naturalWidth = e.target.naturalWidth;
    const naturalHeight = e.target.naturalHeight;

    console.log({ naturalWidth, naturalHeight });
  };

  return (
    <>
      <div className={`flex-container ${styles.gameContainer}`}>
        <img
          className={styles.gameImage}
          src="/src/assets/genshin-impact.jpeg"
          onClick={handleClick}
          onLoad={handleLoad}
        />
        {pos && <BoundingBox pos={pos} />}
        <div className={styles.gameObjectives}>
          <div>Objectives</div>
          <div>Stopwatch</div>
        </div>
      </div>
    </>
  );
};

export default Games;

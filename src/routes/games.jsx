import { useState } from "react";
import styles from "./games.module.css";
import BoundingBox from "../components/BoundingBox";

const Games = () => {
  const [pos, setPos] = useState();
  const handleClick = (e) => {
    setPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };

  return (
    <>
      <div
        className={`flex-container ${styles.gameContainer}`}
        onClick={(e) => handleClick(e)}
      >
        <img
          className={styles.gameImage}
          src="/src/assets/genshin-impact.jpeg"
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

import { useState } from "react";
import styles from "./games.module.css";
import BoundingBox from "../components/BoundingBox";

const Games = () => {
  const [pos, setPos] = useState();
  const handleClick = (e) => {
    setPos([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
  };

  return (
    <div className="container page-container">
      <h2>Game</h2>
      <div className={styles.gameContainer} onClick={(e) => handleClick(e)}>
        {pos && <BoundingBox pos={pos} />}
      </div>
    </div>
  );
};

export default Games;

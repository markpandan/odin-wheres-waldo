import styles from "./games.module.css";

const Games = () => {
  const handleClick = (e) => {
    console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  return (
    <div className="container page-container">
      <h2>Game</h2>
      <div
        className={styles.gameContainer}
        onClick={(e) => handleClick(e)}
      ></div>
    </div>
  );
};

export default Games;

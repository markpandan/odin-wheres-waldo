import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

const GameCard = ({ gameId, name, thumbnail }) => {
  return (
    <div className={styles.gameCardContainer}>
      <img className={styles.cardImage} src={thumbnail} alt={name} />
      <div className={styles.cardDetails}>
        <Link to={`games/${gameId}`}>{name}</Link>
      </div>
    </div>
  );
};

export default GameCard;

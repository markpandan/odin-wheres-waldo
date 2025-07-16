import GameCard from "../components/GameCard/GameCard";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className="container page-container">
      <h2>Game Lists</h2>
      <div className={styles.gameList}>
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
        <GameCard />
      </div>
    </div>
  );
};

export default Home;

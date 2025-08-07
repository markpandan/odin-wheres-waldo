import GameCard from "../components/GameCard/GameCard";
import useGetData from "../hooks/useGetData";
import styles from "./home.module.css";

const Home = () => {
  const { data: gameList, loading, error } = useGetData("games/images");

  return (
    <div className="container page-container">
      <h2>Game Lists</h2>
      {error && <div>{error}</div>}
      {loading && <div>Loading</div>}
      <div className={styles.gameList}>
        {gameList.map((game) => (
          <GameCard
            key={game.id}
            gameId={game.id}
            name={game.name}
            thumbnail={game.thumbnailUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

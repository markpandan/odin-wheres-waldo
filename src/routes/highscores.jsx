import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import styles from "./highscores.module.css";
import { fetchGet } from "../utils/fetchUtils";
import { useSearchParams } from "react-router-dom";

const Highscores = () => {
  const [highScoreList, setHighScoreList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const gameId = searchParams.get("gameId") || "";

  useEffect(() => {
    if (!gameId) return;

    const abortController = new AbortController();

    const fetchHighscores = async () => {
      try {
        const route = `games/highscores?gameId=${gameId}`;
        const response = await fetchGet(route, abortController.signal);

        const jsonData = await response.json();
        if (!response.ok) {
          setHighScoreList(jsonData.message);
        } else {
          setHighScoreList(jsonData.output);
        }
      } catch (error) {
        if (!error.name === "AbortError") {
          console.error(error.message);
        }
      }
    };

    fetchHighscores();

    return () => abortController.abort();
  }, [gameId]);

  const gameList = useGetData("games/list");

  const handleSelectChange = async (e) => {
    setSearchParams({ gameId: e.target.value });

    // const response = await fetchGet(`games/highscores?gameId=${gameId}`);
    // const jsonData = await response.json();

    // setHighScoreList(jsonData.output);
  };

  return (
    <div className="container page-container">
      <h2>Highscores</h2>
      <div className={styles.dropdownContainer}>
        <div>
          <label htmlFor="image">Image: </label>
          <select
            name="image"
            id="image"
            value={gameId}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select A Game
            </option>
            {gameList.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Time Finished</th>
          </tr>
        </thead>
        <tbody>
          {highScoreList.map((list) => (
            <tr key={list.id}>
              <td>{list.name}</td>
              <td>{list.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Highscores;

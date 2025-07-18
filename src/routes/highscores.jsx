import { useState } from "react";
import useGetData from "../hooks/useGetData";
import styles from "./highscores.module.css";
import { fetchGet } from "../utils/fetchUtils";

const Highscores = () => {
  const [highScoreList, setHighScoreList] = useState([]);

  const gameList = useGetData("games/list");

  const handleSelectChange = async (e) => {
    const gameId = e.target.value;

    const response = await fetchGet(`games/highscores?gameId=${gameId}`);
    const jsonData = await response.json();

    setHighScoreList(jsonData.output);
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
            value=""
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

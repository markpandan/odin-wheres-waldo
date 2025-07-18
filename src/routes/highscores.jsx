import styles from "./highscores.module.css";

const Highscores = () => {
  return (
    <div className="container page-container">
      <h2>Highscores</h2>
      <div className={styles.dropdownContainer}>
        <div>
          <label htmlFor="image">Image: </label>
          <select name="image" id="image">
            <option value="0">Genshin Impact</option>
            <option value="1">Honkai Star Rail</option>
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
          <tr>
            <td>Mark</td>
            <td>00:01:23</td>
          </tr>
          <tr>
            <td>Marky</td>
            <td>00:02:23</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Highscores;

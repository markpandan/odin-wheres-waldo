import { useMemo } from "react";
import { computeTime } from "../../utils/timeUtils";
// import styles from "./StartModal.module.css";

const HighScoreModal = ({ ref, time, onRestart }) => {
  const [minutes, seconds, miliseconds] = useMemo(
    () => computeTime(time),
    [time]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
    // Fetch POST
  };

  return (
    <dialog ref={ref}>
      <div className="dialog-container">
        <p>Game Over</p>
        <p>Time Elapsed: {`${minutes}:${seconds}.${miliseconds}`}</p>

        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <label htmlFor="playerName">Insert your name:</label>
            <input type="text" name="playerName" id="playerName" required />
          </div>
          <div className="button-group">
            <button onClick={onRestart}>Try Again</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default HighScoreModal;

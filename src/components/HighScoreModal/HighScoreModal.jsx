import { useMemo } from "react";
import { computeTime } from "../../utils/timeUtils";
import useForm from "../../hooks/useForm";
import { fetchPost } from "../../utils/fetchUtils";
import { useNavigate } from "react-router-dom";
import styles from "./HighScoreModal.module.css";

const HighScoreModal = ({ ref, time, gameId, onRestart }) => {
  const { inputs, handleChange } = useForm({
    name: "",
  });

  const navigate = useNavigate();

  const timeDisplay = useMemo(() => {
    const [minutes, seconds, miliseconds] = computeTime(time);
    return `${minutes}:${seconds}.${miliseconds}`;
  }, [time]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const routeURL = `games/highscores?gameId=${gameId}`;
    await fetchPost(routeURL, {
      ...inputs,
      time: timeDisplay,
    });

    // TODO: Add error catcher
    navigate("/highscores", { replace: true });
  };

  return (
    <dialog ref={ref} className="dialog-blur">
      <div className={styles.dialogContainer}>
        <h2>Game Over</h2>
        <hr />
        <h3>Time Elapsed: {timeDisplay}</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-fields">
            <label htmlFor="playerName">Insert your name:</label>
            <input
              type="text"
              name="name"
              id="playerName"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              onClick={onRestart}
              className="dialog-button"
              formNoValidate
            >
              Try Again
            </button>
            <button type="submit" className="dialog-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default HighScoreModal;

import { useBeforeUnload, useBlocker, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { fetchDelete, fetchPut } from "../../utils/fetchUtils";
import styles from "./HighScoreModal.module.css";
import { useCallback, useEffect, useState } from "react";

const HighScoreModal = ({ ref, score, gameId, onRestart }) => {
  const routeUrl = `games/highscores?gameId=${gameId}`;
  const { inputs, handleChange } = useForm({
    name: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const deleteScore = useCallback(async () => {
    if (score && !isSubmit)
      await fetchDelete(routeUrl, {
        highscoreId: score.id,
      });
  }, [routeUrl, isSubmit, score]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isSubmit && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      deleteScore();
      blocker.proceed();
    }
  }, [blocker, deleteScore]);

  useBeforeUnload(async () => {
    deleteScore();
  });

  const handleRestart = async (e) => {
    deleteScore();
    onRestart(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    await fetchPut(routeUrl, {
      highscoreId: score.id,
      name: inputs.name,
    });

    // TODO: Add error catcher
    navigate(`/highscores?gameId=${gameId}`, { replace: true });
  };

  return (
    <dialog ref={ref} className="dialog-blur">
      <div className={styles.dialogContainer}>
        <h2>You've Found Them All!</h2>
        <hr />
        <h3>Time Elapsed: {score && score.time}</h3>
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
              onClick={handleRestart}
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

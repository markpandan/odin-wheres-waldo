import styles from "./StartModal.module.css";

const StartModal = ({ ref, gameName, onStart }) => {
  return (
    <dialog ref={ref} className="dialog-blur">
      <div className={styles.dialogContainer}>
        <h2>Start Game?</h2>
        <hr />
        <div className={styles.startBodyContainer}>
          <div className={styles.bodyName}>
            <p>Game:</p>
            <p>Targets:</p>
          </div>
          <div className={styles.bodyValue}>
            <p>{gameName}</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <button className="dialog-button" onClick={onStart}>
            Start
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default StartModal;

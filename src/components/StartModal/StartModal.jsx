import styles from "./StartModal.module.css";

const StartModal = ({ ref, onStart }) => {
  return (
    <dialog ref={ref} className={styles.startDialog}>
      <div className={styles.dialogContainer}>
        <p>Start Game?</p>
        <p>Targets: 5</p>
        <button onClick={onStart}>Start</button>
      </div>
    </dialog>
  );
};

export default StartModal;

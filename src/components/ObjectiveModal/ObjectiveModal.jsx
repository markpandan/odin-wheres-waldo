import styles from "./ObjectiveModal.module.css";

const ObjectiveModal = ({ ref, entities }) => {
  const handleCloseClick = () => {
    ref.current.close();
  };

  return (
    <dialog ref={ref} className={styles.objectiveDialog}>
      <p>Objectives</p>
      <div className={styles.entityList}>
        {entities.map((entity) => {
          const selectedStyling = entity.selected ? styles.selected : "";

          return (
            <figure
              key={entity.id}
              className={`${selectedStyling} ${styles.entityContainer}`}
            >
              <img
                src={entity.imageUrl}
                className={styles.entityImage}
                alt=""
              />
              <figcaption>{entity.name}</figcaption>
            </figure>
          );
        })}
      </div>
      <button
        className={styles.closeObjectiveDialog}
        onClick={handleCloseClick}
      >
        x
      </button>
    </dialog>
  );
};

export default ObjectiveModal;

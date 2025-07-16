import styles from "./BoundingBox.module.css";

const BoundingBox = ({ pos }) => {
  let [x, y] = pos;

  return (
    <div style={{ top: y, left: x }} className={styles.boundingBoxContainer}>
      <div className={styles.boundingBoxDetails}>
        <p>X: {x}</p>
        <p>Y: {y}</p>
        <p className={styles.boundingBoxObject}>Object: Undefined</p>
      </div>
    </div>
  );
};

export default BoundingBox;

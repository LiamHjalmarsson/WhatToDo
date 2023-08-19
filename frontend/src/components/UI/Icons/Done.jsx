import styles from "./Done.module.css";

const Done = ({ completed }) => {
    return (
        !completed ? (
            <div className={styles.doneIcon}>
                <span className={styles.checkmark}></span>
            </div>
        ) : (
            <div className={styles.unfinishedIcon}>
                <span className={styles.unfinished}> - </span>
            </div>
        )
    );
}

export default Done;
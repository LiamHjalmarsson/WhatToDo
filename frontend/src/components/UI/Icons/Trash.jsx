import styles from "./Trash.module.css";

const Trash = () => {
    return (
            <div className={styles.container}>
                <span className={styles.trash}>
                    <span></span>
                    <i></i>
                </span>
            </div>
    )
}

export default Trash;
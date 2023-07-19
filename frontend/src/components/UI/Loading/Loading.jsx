import styles from "./Loading.module.css";

const Loading = (props) => {
    return (
        <>
            <div className={styles.div}>
                <h4>
                    {props.title}                     
                </h4>
            </div>
        </>
    );
}  

export default Loading;
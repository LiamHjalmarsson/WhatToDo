import styles from "./Input.module.css";

const Input = (props) => {
    return (
        <div className={styles.container}>
            <label htmlFor={props.input.id}> {props.label} </label>
            <input {...props.input} className={`${styles.input} ${props.customClass}`}/>
        </div>
    )
}

export default Input;
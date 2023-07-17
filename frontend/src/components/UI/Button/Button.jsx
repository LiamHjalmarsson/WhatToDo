import styles from "./Button.module.css";

const Button = (props) => {
    return <button {...props.button} className={`${props.customClass} ${styles.button}`}> {props.children} </button>
}

export default Button;
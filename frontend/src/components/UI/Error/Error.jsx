import styles from "./Error.module.css";

const Error = (props) => {
    return (
        <>
            <div>
                {props.children}
            </div>
        </>
    );
}

export default Error;
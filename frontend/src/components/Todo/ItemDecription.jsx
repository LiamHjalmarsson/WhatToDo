import Button from "../UI/Button/Button";
import "../../index.css";
import styles from "./ItemDescription.module.css";

let ItemDescription = ({value, onChange, onSubmit, onCancel}) => {
    return (
        <>
            <div className={styles.container}> 
                <textarea 
                    className={styles.form}
                    value={value}
                    onChange={onChange}
                />
                <div className="btnContainer">
                    <Button button={{ onClick: onCancel }}>Cancel</Button>
                    <Button button={{ onClick: onSubmit }}>Save</Button>
                </div>
            </div>
        </>
    );
} 

export default ItemDescription;
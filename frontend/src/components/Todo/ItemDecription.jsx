import Button from "../UI/Button/Button";
import "../../index.css";
import styles from "./ItemDescription.module.css";
import Input from "../UI/Input/Input";

let ItemDescription = ({title, value, onChange, onSubmit, onCancel, changeTitleHandler}) => {
    return (
        <>
            <div className={styles.container}> 
                <form action="PUT" onSubmit={onSubmit}>
                    <Input 
                        label={title} 
                        input={{ 
                            id: "title",
                            type: "text",
                            placeholder: title,
                            value: title,
                            onChange: changeTitleHandler  
                        }}
                    />
                    <textarea 
                        className={styles.form}
                        value={value}
                        onChange={onChange}
                    />
                    <div className="btnContainer">
                        <Button button={{ onClick: onCancel }}>Cancel</Button>
                        <Button button={{ type: "submit" }}>Save</Button>
                    </div>
                </form>
            </div>
        </>
    );
} 

export default ItemDescription;
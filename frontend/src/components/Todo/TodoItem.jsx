import { useState } from "react";
import Button from "../UI/Button/Button";
import styles from "./TodoItem.module.css";
import useHttp from "../../hooks/use-http";
import ItemDescription from "./ItemDecription";

const TodoItem = ({ item, doneHandler, removeHandler, updateTodoHandler }) => { 
    let [isEditing, setIsEditing] = useState(false);  // Initializing state variable 'isEditing' and its setter function using the 'useState' hook
    let [editDescription, setEditDescription] = useState(item.description ? item.description : "");  // Initializing state variable 'editDescription' and its setter function with the description of the item or an empty string if there's no description

    let { isLoading, sendRequest } = useHttp(); 

    let toggleEditHandler = () => {  
        setIsEditing(prevIsEditing => !prevIsEditing);  // Using the previous state to set the new value
    }

    let submitHandler = async () => {  
        sendRequest(
            {
                url: `http://127.0.0.1:8000/api/todo-items/${item.id}`, 
                method: "PUT",
                headers: { "Content-Type": "application/json" },  
                body: { description: editDescription }  // The new description value to be updated
            },
            (recourse) => {
                updateTodoHandler(recourse);  // Callback function to handle the response data from the HTTP request
            }
        );
        toggleEditHandler();  // Toggling the 'isEditing' state to exit the editing mode
    };

    let changeEditHandler = (e) => {  
        setEditDescription(e.target.value);
    }

    return (
        <li key={item.id} className={styles.li}> 
            <h4 className={styles.title}>{item.title}</h4>  
            {isEditing && (  
                <ItemDescription
                    value={editDescription}  // Passing the current edited description as a value to 'ItemDescription'
                    onChange={changeEditHandler}  // Passing the 'changeEditHandler' function to handle changes in the edited description
                    onSubmit={submitHandler}  // Passing the 'submitHandler' function to handle the submission of the edited description
                    onCancel={toggleEditHandler}  // Passing the 'toggleEditHandler' function to cancel the edit mode
                />
            )}

            {
                isLoading && <p> Loading </p>  
            }

            {
                !isLoading && <p className="">{item.description ? item.description : "No description is available"}</p>  
            }
            
            <div className={styles.btnContainer}> 
                <Button
                    customClass={styles.button}  
                    button={{
                        onClick: () => removeHandler(item.id)
                    }}
                >
                    Remove
                </Button>
                <Button 
                    customClass={styles.button}  
                    button={{ onClick: toggleEditHandler }} 
                >
                    Edit
                </Button>
                <Button
                    customClass={styles.button} 
                    button={{
                        onClick: () => doneHandler(item.id)
                    }}
                >
                    Done
                </Button>
            </div>
        </li>
    );
};

export default TodoItem;

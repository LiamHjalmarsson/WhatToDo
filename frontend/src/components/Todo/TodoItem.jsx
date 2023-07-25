import { useState } from "react";
import Button from "../UI/Button/Button";
import styles from "./TodoItem.module.css";
import useHttp from "../../hooks/use-http";
import ItemDescription from "./ItemDecription";

const TodoItem = ({ item, doneHandler, removeHandler, updateTodoHandler }) => { 
    let [isEditing, setIsEditing] = useState(false);  // Initializing state variable 'isEditing' and its setter function using the 'useState' hook
    let [editDescription, setEditDescription] = useState(item.description ? item.description : "");  // Initializing state variable 'editDescription' and its setter function with the description of the item or an empty string if there's no description
    let [title, setTitle] = useState(item.title);  

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
                body: {
                        title,
                        description: editDescription 
                    }  // The new description value to be updated
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

    let changeTitleHandler = (e) => {  
        setTitle(e.target.value);
    }

    let message;
    if (isLoading) {
        message = "Loading...";
    } 
    else {
        message = item.description ? item.description : "No description is available";
    }

    return (
        <li key={item.id} className={`${styles.li} ${styles.li} ${item.completed ? styles.done: undefined} `}> 
            {
                !isEditing && <h4 className={styles.title}>{item.title}</h4>  
            }

            {isEditing && (  
                <ItemDescription
                    value={editDescription}  // Passing the current edited description as a value to 'ItemDescription'
                    onChange={changeEditHandler}  // Passing the 'changeEditHandler' function to handle changes in the edited description
                    onSubmit={submitHandler}  // Passing the 'submitHandler' function to handle the submission of the edited description
                    onCancel={toggleEditHandler}  // Passing the 'toggleEditHandler' function to cancel the edit mode
                    changeTitleHandler={changeTitleHandler}
                    title={title}
                />
            )}

            <p className={styles.p}> {message} </p>

                    <div className={styles.btnContainer}> 
                        <Button
                            customClass={styles.button}  
                            button={{
                                onClick: () => {
                                    removeHandler(item.id);
                                }
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
                                onClick: () => doneHandler(item)
                            }}
                        >
                            {
                                !item.completed ? "Done" : "Not Completed"
                            }
                        </Button>
                    </div>

        </li>
    );
};

export default TodoItem;

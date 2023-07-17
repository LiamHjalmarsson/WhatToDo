import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import styles from "./Form.module.css";
import useHttp from "../../hooks/use-http";
import Error from "../UI/Error/Error";

const TodoForm = ({ onAddTodo, errorMsg }) => {  
    let { isLoading, error, sendRequest } = useHttp();  

    let [title, setTitle] = useState("");  
    let [description, setDescription] = useState("");  

    let submitHandler = async (e) => {  
        e.preventDefault();  

        try {
            sendRequest(
                {
                    url: "http://127.0.0.1:8000/api/todo-items",
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        title: title,
                        description: description,
                    }
                },
                (recourse) => onAddTodo(recourse)  // Callback function to handle the response data from the HTTP request
            );

        } catch (err) {
            console.log(err);  // Logging any errors that occur during the HTTP request
        }

        setTitle("");  
        setDescription("");  
    }

    let titleChangeHandler = (e) => {  
        setTitle(e.target.value);  // Updating the 'title' state variable with the new input value
    }

    let descriptionChangeHandler = (e) => { 
        setDescription(e.target.value);  // Updating the 'description' state variable with the new input value
    }

    return (
        <div className={styles.container}> 
            <form action="POST" className={styles.form} onSubmit={submitHandler}>  
                <Input
                    label="Title" 
                    input={
                        {
                            id: "title",
                            type: "text",
                            placeholder: "Add title of task",
                            value: title,
                            onChange: titleChangeHandler  
                        }
                    }
                />
                <Input
                    label="Description"  
                    input={
                        {
                            id: "description",
                            type: "text",
                            placeholder: "Add description",
                            value: description,
                            onChange: descriptionChangeHandler 
                        }
                    }
                />
                <Button
                    button={{
                        onClick: (e) => {
                            e.preventDefault(); 
                            setTitle(""); 
                            setDescription(""); 
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    button={
                        {
                            type: "submit", 
                        }
                    }
                >
                    Add new Task
                </Button>
            </form>
            {error && <p> {error} </p>} 
        </div>
    );
}

export default TodoForm; 
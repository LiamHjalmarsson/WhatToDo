import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import styles from "./Form.module.css";
import useHttp from "../../hooks/use-http";

const TodoForm = ({ onAddTodo }) => {
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");

    let { isLoading, error, sendRequest } = useHttp();

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
            console.log(err);
        }

        setTitle("");
        setDescription("");
    }

    let titleChangeHandler = (e) => {
        setTitle(e.target.value);
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
                <div className={styles.btnContainer}>
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
                </div>
            </form>
            {
                error && <p> {error} </p>
            }
            {
                isLoading && <p> loadig.... </p>
            }
        </div>
    );
}

export default TodoForm; 
import { useEffect, useState } from "react";
import styles from "./TodoItem.module.css";
import useHttp from "../../hooks/use-http";
import TodoItem from "./TodoItem";
import TodoForm from "./Form";
import Loading from "../UI/Loading/Loading";
import Button from "../UI/Button/Button";

const Todos = () => {  
    let [todos, setTodos] = useState([]);  

    let { isLoading, error, sendRequest } = useHttp(); 

    useEffect(() => {  // Using the 'useEffect' hook to fetch data when the component mounts
        let transform = (object) => {  // A helper function to transform the fetched data
            let loadedTransForm = [];

            object.forEach(element => {
                loadedTransForm.push(element);
            });

            setTodos(loadedTransForm);  // Updating the 'todos' state with the fetched data
        }

        sendRequest(
            {
                url: "http://127.0.0.1:8000/api/todo-items"  
            },
            transform  // Passing the 'transform' function as a callback to handle the fetched data
        );

    }, [sendRequest]);  // The effect will run when the component mounts and whenever 'sendRequest' changes

    let addTodoHandler = (newTodo) => { 
        setTodos((prevTodos) => [...prevTodos, newTodo]);  // Adding the new todo item to the 'todos' state
    };

    let updateTodoHandler = (updatedTodo) => { 
        setTodos((prevTodos) => {
            let updatedTodos = prevTodos.map((todo) => {
                if (todo.id === updatedTodo.id) {  // If the todo id matches the updated todo id, return the updated todo
                    return updatedTodo;
                }
                return todo;
            });
            return updatedTodos;  // Returning the updated 'todos' state
        });
    };

    let removeHandler = (todoId) => {  
        sendRequest(
            {
                url: `http://127.0.0.1:8000/api/todo-items/${todoId}`, 
                method: "DELETE"
            },
            () => {
                setTodos((prevTodos) => {
                    const updatedTodos = prevTodos.filter((todo) => todo.id !== todoId);  // Filtering out the removed todo item
                    return updatedTodos;  // Updating the 'todos' state with the remaining todo items
                });
            }
        );
    };

    let doneHandler = async (id) => {  
        await sendRequest(
            {
                url: `http://127.0.0.1:8000/api/todo-items/${id}`,  
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: { completed: true },  
            },
            () => {
                let updatedTodo = todos.map((todo) => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            completed: true, 
                        };
                    }
                    return todo;
                });

                setTodos(updatedTodo);  // Updating the 'todos' state with the updated todo item
            }
        );
    };

    return (
        <>
            <TodoForm onAddTodo={addTodoHandler} />
            
            {
                error && <h4> {error} </h4>  
            }
            { 
                isLoading ? (
                    <Loading title="Loading todos from DB"/>
                ) : ( 
                    <div className={styles.container}>
                        <ul className={styles.ul}>  
                            {todos.map((todo) => (
                                <TodoItem
                                    key={todo.id}  // Use 'id' as the key for the 'TodoItem' component
                                    item={todo}  // Pass the todo item as a prop to the 'TodoItem' component
                                    doneHandler={doneHandler}  // Pass the 'doneHandler' function as a prop to the 'TodoItem' component
                                    errorMsg={error}  // Pass the 'error' as a prop to the 'TodoItem' component
                                    loading={isLoading}  // Pass the 'isLoading' as a prop to the 'TodoItem' component
                                    removeHandler={removeHandler}  // Pass the 'removeHandler' function as a prop to the 'TodoItem' component
                                    updateTodoHandler={updateTodoHandler}  // Pass the 'updateTodoHandler' function as a prop to the 'TodoItem' component
                                />
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    );
};

export default Todos;

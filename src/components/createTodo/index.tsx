import React, { useState, useCallback } from 'react';
import nextId from "react-id-generator";
import { ITodoItem, ICreateTodoProps } from "../types/interfaces";
import styles from "./styles.module.css";

const initialTodoData: ITodoItem = {
    title: "",
    description: "",
    id: nextId(),
    isComplete: false
}

const CreateTodo = (props: ICreateTodoProps): JSX.Element => {

    const { setTodoList } = props;
    const [todoData, setTodoData] = useState<ITodoItem>(initialTodoData);

    const addTodo = useCallback(
        (todoData: ITodoItem): void => {
            setTodoList((prevState) => [...prevState, todoData])
        }, [setTodoList]
    );

    const onAddTodo = useCallback(
        (): void => {
            if (todoData.title.length > 0) {
                addTodo(todoData);
            }
            setTodoData({ ...initialTodoData, id: nextId() });
        }, [setTodoData, addTodo, todoData]
    );

    const onChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
            const property: string | null = event.target?.getAttribute('data-property');
            if (property) {
                setTodoData((prevState) => ({ ...prevState, [property]: event.target.value }))
            }
        }, [setTodoData]
    );

    return (
        <div className={styles.createTodoContainer}>
            <input
                data-property='title'
                type="text"
                placeholder="Title"
                className={styles.todoTitle}
                value={todoData.title}
                onChange={onChangeHandler}
            />
            <textarea
                data-property='description'
                placeholder="Description"
                value={todoData.description}
                className={styles.todoDescription}
                onChange={onChangeHandler}
            />
            <button onClick={onAddTodo} className="todo-add-button" disabled={todoData.title.length === 0}>Add</button>
        </div>
    )
}
export default React.memo(CreateTodo);
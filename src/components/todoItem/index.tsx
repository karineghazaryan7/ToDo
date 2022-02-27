import React, { useEffect, useState, useCallback } from 'react';
import { ITodoItem, ITodoItemProps } from '../types/interfaces';
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { MdOutlineDownloadDone } from "react-icons/md";
import { VscCompassActive } from "react-icons/vsc";
import styles from "./styles.module.css";
import { Draggable } from "react-beautiful-dnd";

const TodoItem = (props: ITodoItemProps) => {

    const { todo, index, deleteTodo, updateTodo } = props;

    const [itemReadOnly, setItemReadOnly] = useState<boolean>(true);
    const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
    const [currentTodoData, setCurrentTodoData] = useState<ITodoItem>(todo);

    const onTodoItemEdit = (): void => {
        setItemReadOnly(false);
    };

    const onTodoComplete = useCallback((): void => {
        setCurrentTodoData((prevState: ITodoItem): ITodoItem => {
            const state: ITodoItem = { ...prevState, isComplete: !prevState.isComplete };
            updateTodo?.(state);
            return state;
        });
    }, [updateTodo]
    );

    const onSave = (): void => {
        setItemReadOnly(true);
        setShowSaveButton(false);
        updateTodo?.(currentTodoData);
    };

    const onChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const property: string | null = event.target?.getAttribute('data-property');
            if (property) {
                const changedItem: ITodoItem = { ...currentTodoData, [property]: event.target.value };
                const { title, description } = todo;
                setShowSaveButton(changedItem.title.length > 0 && (title !== changedItem.title || description !== changedItem.description));
                setCurrentTodoData({ ...currentTodoData, [property]: event.target.value });
            }
        }, [currentTodoData, todo]
    );

    useEffect(() => {
        setCurrentTodoData(todo);
    }, [todo]);

    return (
        <Draggable draggableId={todo.id} index={index}>
            {provided => (
                <div className={styles.todoItemContainer}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <button onClick={onTodoComplete} className={`button ${styles.todoDone}`}>
                        {currentTodoData.isComplete ? <MdOutlineDownloadDone fill='white' /> : <VscCompassActive fill='white' />}
                    </button>
                    <input
                        data-property="title"
                        className={styles.todoItemTitle}
                        style={{ pointerEvents: itemReadOnly ? "none" : "auto" }}
                        value={currentTodoData.title}
                        disabled={itemReadOnly}
                        onChange={onChangeHandler}
                    />
                    <input
                        data-property="description"
                        title={currentTodoData.description}
                        style={{ pointerEvents: itemReadOnly ? "none" : "auto" }}
                        className={styles.todoItemDescription}
                        value={currentTodoData.description}
                        disabled={itemReadOnly}
                        onChange={onChangeHandler}
                    />
                    <button onClick={onTodoItemEdit} className="button">
                        <AiFillEdit fill='white' />
                    </button>
                    <button onClick={() => deleteTodo?.(todo.id)} className="button">
                        <AiTwotoneDelete fill='white' />
                    </button>
                    {showSaveButton && (
                        <button className="button" onClick={onSave}>
                            Save
                        </button>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(TodoItem);
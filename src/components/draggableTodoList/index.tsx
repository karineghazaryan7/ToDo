import React, { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ITodoItem, IDragAndDropListProps } from '../types/interfaces';
import TodoItem from '../todoItem';
import styles from "./styles.module.css";

const DragAndDropList = (props: IDragAndDropListProps) => {

    const { todoList, setTodoList, deleteTodo, updateTodo } = props;

    const reorder = useCallback(
        (list: ITodoItem[], startIndex: number, endIndex: number): ITodoItem[] => {
            const result: ITodoItem[] = [...list];
            const [removed]: ITodoItem[] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        }, []
    );

    const onDragEnd = useCallback(
        (result: DropResult): void => {
            if (!result.destination) {
                return;
            }
            if (result.destination.index === result.source.index) {
                return;
            }
            const reorderedTodoList = reorder(
                todoList,
                result.source.index,
                result.destination.index
            );
            setTodoList(reorderedTodoList);
        }, [setTodoList, reorder, todoList]
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className={styles.todoListContainer}>
                            {Array.isArray(todoList) &&
                                todoList.map((item, index) =>
                                    <TodoItem
                                        key={item.id}
                                        todo={item}
                                        index={index}
                                        deleteTodo={deleteTodo}
                                        updateTodo={updateTodo}
                                    />
                                )
                            }
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
export default React.memo(DragAndDropList);
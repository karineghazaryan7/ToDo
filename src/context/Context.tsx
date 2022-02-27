import React, { useState, createContext, useCallback } from 'react';
import { ITodoItem, IDefaultContextState } from '../components/types/interfaces';

const defaultState = {
    todoList: []
}

const TodoListContext = createContext<IDefaultContextState>(defaultState);

function TodoListProvider({ children }: { children: React.ReactNode }) {
    const [todoList, setTodoList] = useState<ITodoItem[]>(defaultState.todoList);

    const updateTodo = useCallback((item: ITodoItem): void => {
        // We are copying the state, before updating it
        setTodoList?.((prevState) => {
            const index: number = prevState.findIndex((todo) => todo.id === item.id);
            if (index !== -1) {
                const newList: ITodoItem[] = [...prevState];
                newList[index] = { ...newList[index], ...item };
                return newList;
            }
            return prevState;
        });
    }, []);

    const deleteTodo = useCallback((id: string): void => {
        // Filter returns a new array, so we are not mutating the initial state
        setTodoList?.((prevState) => (prevState.filter((item) => item.id !== id)));
    }, []);

    const value = {
        todoList,
        setTodoList,
        updateTodo,
        deleteTodo
    };

    return (
        <TodoListContext.Provider value={value}>
            {children}
        </TodoListContext.Provider>
    );
}
export { TodoListContext, TodoListProvider };
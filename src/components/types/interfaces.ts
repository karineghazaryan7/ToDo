export interface ITodoItem {
    title: string;
    description: string;
    id: string;
    isComplete: boolean;
};

export interface ICreateTodoProps {
    setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
};

export interface IDragAndDropListProps {
    todoList: ITodoItem[];
    setTodoList: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
    deleteTodo: ((id: string) => void) | undefined;
    updateTodo: ((item: ITodoItem) => void) | undefined;
};

export interface ITodoItemProps {
    todo: ITodoItem;
    index: number;
    deleteTodo: ((id: string) => void) | undefined;
    updateTodo: ((item: ITodoItem) => void) | undefined;
};

export interface IDefaultContextState {
    todoList: ITodoItem[];
    setTodoList?: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
    updateTodo?: (item: ITodoItem) => void;
    deleteTodo?: (id: string) => void;
};
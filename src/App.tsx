import { FC, useContext } from 'react';
import CreateTodo from './components/createTodo';
import DragAndDropList from './components/draggableTodoList';
import { TodoListContext } from './context/Context';

import './App.css';

const App: FC = (): JSX.Element => {
  const { setTodoList, todoList, deleteTodo, updateTodo } = useContext(TodoListContext);

  return (
    <div className="App">
      {!!setTodoList && (
        <>
          <CreateTodo setTodoList={setTodoList} />
          <DragAndDropList
            todoList={todoList}
            setTodoList={setTodoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </>
      )}
    </div>
  );
}

export default App;

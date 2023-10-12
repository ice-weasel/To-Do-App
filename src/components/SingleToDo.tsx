import React, {  } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";


interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

interface SingleTodoProps {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<SingleTodoProps> = ({
  index,
  todo,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const loggedInUser = "YOUR_USER";

  React.useEffect(() => {
    if (edit) {
      inputRef.current?.focus();
    }
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, todo: editTodo } : prevTodo
      )
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    const isTaskInCompletedTodos = completedTodos.some(
      (completedTodo) => completedTodo.id === id
    );
  
    if (isTaskInCompletedTodos) {
      const updatedCompletedTodos = completedTodos.filter(
        (completedTodo) => completedTodo.id !== id
      );
      setCompletedTodos(updatedCompletedTodos);
      updateLocalStorage(updatedCompletedTodos, todos);
      console.log(`Task with ID ${id} has been deleted from completedTodos.`);
    }
  
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    updateLocalStorage(completedTodos, updatedTodos);
    console.log(`Task with ID ${id} has been deleted from todos.`);
  };
  
  const handleDone = (id: number) => {
    const doneTodo = todos.find((todo) => todo.id === id);

    if (doneTodo) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      const updatedCompletedTodos = [
        ...completedTodos,
        { ...doneTodo, isDone: true },
      ];

      setTodos(updatedTodos);
      setCompletedTodos(updatedCompletedTodos);
    }
  };

  const updateLocalStorage = (completed: Todo[], remaining: Todo[]) => {
    const userTodoData = { todos: remaining, completedTodos: completed };
    const userTodoDataJSON = JSON.stringify(userTodoData);
    localStorage.setItem(`userTodo_${loggedInUser}`, userTodoDataJSON);
    console.log("Data stored in local storage:", userTodoDataJSON);
  };
  return (
    
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
         
          className={`todos__single`}
        >
          <span className="icon_done" onClick={() => handleDone(todo.id)}>
            <BsCheckCircleFill />
          </span>

          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span
              className={`todos__single--text ${
                todo.todo.length > 20 ? "long-text" : ""
              }`}
            >
              {todo.todo}
            </span>
          )}
          <span className="icon_delete" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
        </form>
      
  
  );
};

export default SingleTodo;

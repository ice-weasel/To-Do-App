import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

const SingleTodo: React.FC<{
  index: number;
  todo: Todo;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todos, setTodos, completedTodos, setCompletedTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    const doneTodo = todos.find((todo) => todo.id === id);

    if (doneTodo) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      const updatedCompletedTodos = [...completedTodos, { ...doneTodo, isDone: true }];

      setTodos(updatedTodos);
      setCompletedTodos(updatedCompletedTodos);
    }
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot: DraggableStateSnapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
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
            <span className="todos__single--text">{todo.todo}</span>
          )}
          <span className="icon_delete" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

import React, { useState, useEffect } from "react";
import "../components/styles.css";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "../models/model";

interface UserTodoData {
  todos: Todo[];
  completedTodos: Todo[];
}

const ToDoFinal: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

  useEffect(() => {
    // Retrieve the user's to-do list from localStorage
    const userTodoJSON = localStorage.getItem(`userTodo_${loggedInUser}`);
    if (userTodoJSON) {
      const userTodoData: UserTodoData = JSON.parse(userTodoJSON);
      setTodos(userTodoData.todos || []);
      setCompletedTodos(userTodoData.completedTodos || []);
    }
  }, [loggedInUser]);

  // Function to update local storage with tasks data
  const updateLocalStorage = () => {
    const userTodoData: UserTodoData = { todos, completedTodos };
    const userTodoDataJSON = JSON.stringify(userTodoData);
    localStorage.setItem(`userTodo_${loggedInUser}`, userTodoDataJSON);
  
    console.log("Data stored in local storage:", userTodoDataJSON);
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const newTodo: Todo = { id: Date.now(), todo, isDone: false };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setTodo("");
      updateLocalStorage();

      console.log("Updated Todos:", updatedTodos);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceList = source.droppableId === "TodosList" ? todos : completedTodos;
    const destinationList = destination.droppableId === "TodosList" ? todos : completedTodos;

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setTodos([...todos]);
    setCompletedTodos([...completedTodos]);
    updateLocalStorage();
  };

  // Function to clear completed tasks
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-image">
        <div className="text-div">
          <h1 className="text-div">T O D O</h1>
          <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        </div>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
       
      </div>
    </DragDropContext>
  );
};

export default ToDoFinal;
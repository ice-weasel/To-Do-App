import React, { useState, useEffect } from "react";
import "../components/styles.css";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import { Todo } from "../models/model";

interface UserTodoData {
  todos: Todo[];
  completedTodos: Todo[];
}

const ToDoFinal: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    // Check if a user is already logged in
    const loggedInUserJSON = localStorage.getItem("loggedInUser");
    const existingUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

    if (existingUser) {
      setLoggedInUser(existingUser);
    }
  }, []);

  const handleLogOut = () => {
    // Clear the currently logged-in user
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    // You can also clear other data and perform additional log out tasks if needed.
    // Redirect to the login page
    window.location.href = "/login-page";
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const newTodo: Todo = { id: Date.now(), todo, isDone: false };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setTodo("");
      updateLocalStorage();
    }
  };

  const handleToggleComplete = (taskId: number) => {
    // Toggle the 'isDone' property of the specified task
    const updatedTodos = todos.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    setTodos(updatedTodos);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const userTodoData: UserTodoData = { todos, completedTodos };
    localStorage.setItem(`userTodo_${loggedInUser}`, JSON.stringify(userTodoData));
  };

  return (
    <div className="bg-image">
      {loggedInUser ? (
        <div className="signout-div">
          <button className="bn3" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      ) : (
        // You can also implement a login button or a login prompt here
        <div>Please log in to access the todo list.</div>
      )}
      {loggedInUser && (
        <div className="top-div">
          <h1 className="text-div">T O D O</h1>
          <div>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
          </div>
        </div>
      )}
      {loggedInUser && (
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          handleToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default ToDoFinal;

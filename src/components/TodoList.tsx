import React, { useState } from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleToDo";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  handleToggleComplete: (taskId: number) => void;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  handleToggleComplete,
}) => {
  const [view, setView] = useState<"all" | "active" | "completed">("all");

  const handleToggleView = (newView: "all" | "active" | "completed") => {
    setView(newView);
  };

  const handleClearCompleted = () => {
    // Filter out completed tasks and update the todos state
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);

    // Clear the completed todos by updating the completedTodos state
    setCompletedTodos([]);

    // Remove completed tasks from local storage
    const loggedInUserJSON = localStorage.getItem("loggedInUser");
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      localStorage.setItem(`userTodo_${loggedInUser}`, JSON.stringify({ todos: updatedTodos, completedTodos: [] }));
      console.log("Completed tasks removed from local storage.");

      
    }
  };
  // Filter tasks based on the current view
  const filteredTodos =
    view === "active"
      ? todos
      : view === "completed"
      ? completedTodos
      : [...todos, ...completedTodos];

  // Calculate the count of remaining todos
  const remainingTodosCount = todos.filter((todo) => !todo.isDone).length;

  return (
    <div className="container">
     
        
          <div
            className={`todos`}
           
          >
            {filteredTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={filteredTodos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            ))}
            
            <div className="footer-div">
              <div className="item-count">
                {remainingTodosCount}{" "}
                {remainingTodosCount === 1 ? "item" : "items"} remaining
              </div>
              <div className="clear">
                <button
                  onClick={handleClearCompleted}
                  className={`view-button ${view === "all" ? "active" : ""}`}
                >
                  Clear Completed
                </button>
              </div>
              <div className="button-div">
                <button
                  onClick={() => handleToggleView("all")}
                  className={`view-button ${view === "all" ? "active" : ""}`}
                >
                  All
                </button>
                <button
                  onClick={() => handleToggleView("active")}
                  className={`view-button ${view === "active" ? "active" : ""}`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleToggleView("completed")}
                  className={`view-button ${
                    view === "completed" ? "active" : ""
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
      
      
    </div>
  );
};

export default TodoList;


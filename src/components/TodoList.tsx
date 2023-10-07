import React, { useEffect, useState } from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleToDo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const [view, setView] = useState<"all" | "active" | "completed">("all");

  const handleToggleView = (newView: "all" | "active" | "completed") => {
    setView(newView);
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
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>Enter your tasks here</span>
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
            {provided.placeholder}
            <div className="footer-div">
              <div className="item-count">
                {remainingTodosCount}{" "}
                {remainingTodosCount === 1 ? "item" : "items"} remaining
              </div>
              <div className="button-view">
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
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

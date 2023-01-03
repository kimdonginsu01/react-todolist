import React, { useState } from "react";
import status from "../../constants/status";
import Item from "./Item";
import "./list.scss";

function List({ todos, handleSaveTodo, handlePrepareEdit, handleDelete }) {
  const initContext = {
    top: 0,
    left: 0,
    visibility: "hidden",
    todo: {
      id: undefined,
      status: undefined,
      name: "",
    },
  };

  const initTodo = {
    id: undefined,
    name: "",
    status: 0,
  };

  const [context, setContext] = useState(initContext);
  const [todoState, setTodoState] = useState(initTodo);

  const handleShowContextMenu = (e, todo) => {
    setContext({
      ...context,
      top: e.clientY,
      left: e.clientX,
      visibility: "visible",
    });

    setTodoState({
      ...todoState,
      ...todo,
    });
  };

  const handleCloseContextMenu = () => {
    setContext({
      ...context,
      visibility: "hidden",
    });

    setTodoState({
      ...todoState,
      ...initTodo,
    });
  };

  const handleSaveStatus = (status) => {
    setContext({
      ...context,
      visibility: "hidden",
    });
    handleSaveTodo({
      ...todoState,
      status: status,
    });
  };

  return (
    <>
      <ul>
        {todos.map((todo, key) => {
          return (
            <Item
              todo={todo}
              key={key}
              handlePrepareEdit={handlePrepareEdit}
              handleDelete={handleDelete}
              handleShowContextMenu={handleShowContextMenu}
            />
          );
        })}
      </ul>
      <div
        className={`status-context-cover ${context.visibility}`}
        onClick={() => handleCloseContextMenu()}
      ></div>
      <div
        className={`status-context-menu ${context.visibility}`}
        style={{
          top: `${context.top}px`,
          left: `${context.left}px`,
          transform: `${
            window.innerHeight - context.top <= 150 ? "translateY(-100%)" : ""
          }`,
        }}
      >
        <button
          className={`todo-status todo`}
          onClick={() => handleSaveStatus(status.TODO)}
        >
          Todo
        </button>
        <button
          className={`todo-status process`}
          onClick={() => handleSaveStatus(status.PROCESSING)}
        >
          Processing
        </button>
        <button
          className={`todo-status completed`}
          onClick={() => handleSaveStatus(status.COMPLETED)}
        >
          Completed
        </button>
      </div>
    </>
  );
}

export default List;

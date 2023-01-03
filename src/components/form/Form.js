import React, { useEffect, useState } from "react";
import "./form.scss";

function Form({ handleSaveTodo, todo }) {
  const initTodo = {
    id: undefined,
    name: "",
    status: 0,
  };

  const [todoState, setTodoState] = useState(initTodo);

  const handleChange = (e) => {
    setTodoState({
      ...todoState,
      name: e.target.value,
    });
  };

  useEffect(() => {
    setTodoState({
      ...todoState,
      id: todo.id,
      name: todo.name,
      status: todo.status,
    });
  }, [todo]);

  const handleChangeFormToSave = () => {
    setTodoState(initTodo);
  };

  return (
    <div className="todo-form">
      {todoState.id && (
        <button className="edit-tag" onClick={() => handleChangeFormToSave()}>
          Edit: {todo.name}
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveTodo(todoState);
        }}
      >
        <input
          type="text"
          placeholder=" "
          name="name"
          onChange={(e) => handleChange(e)}
          value={todoState.name}
        />
        <button className="todo-save" placeholder="Input todo" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default Form;

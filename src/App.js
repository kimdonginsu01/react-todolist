import "./App.css";
import "./app.scss";
import Form from "./components/form/Form";
import List from "./components/list/List";
import todoApi from "./apis/todoApi";
import React, { useEffect, useState } from "react";

function App() {
  const initTodo = { id: undefined, name: "", status: undefined };
  const [todo, setTodo] = useState(initTodo);
  const [todos, setTodos] = useState([initTodo]);

  const renderData = (todo) => {
    const response = todoApi.get();
    setTodos({
      ...response,
    });
  };

  useEffect(() => {
    renderData();
  }, []);

  const handleSaveTodo = (todo) => {
    todoApi.save({ ...todo, status: todo.status ?? 0 });

    if (todo.id === undefined) {
      todo = { ...initTodo };
    }
    renderData({ ...initTodo });
  };

  const handlePrepareEdit = (todoParam) => {
    setTodo({
      ...todo,
      ...todoParam,
    });
  };

  const handleDelete = (id) => {
    todoApi.delete(id);
    renderData();
  };

  return (
    <div className="App">
      <div className="title">
        Todo <strong>list</strong>
      </div>
      <div className="todo-list">
        <Form handleSaveTodo={handleSaveTodo} todo={todo || initTodo} />
        <List
          todos={todos}
          handlePrepareEdit={handlePrepareEdit}
          handleDelete={handleDelete}
          handleSaveTodo={handleSaveTodo}
        />
      </div>
    </div>
  );
}

export default App;

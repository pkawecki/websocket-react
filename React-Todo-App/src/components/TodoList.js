import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import io from "socket.io-client";
const socket = io("http://localhost:7000");

function TodoList() {
  //State declaration
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //Socket declaration
    socket.on("updateData", (data) => {
      console.log("updateData at connection with server: ", [...data]);
      setTodos(data);
      console.log("todos", todos);
    });
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log("emitting taksk to the server: ", todo);
    socket.emit("serverAddTask", todo);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    newValue.id = todoId;
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
    socket.emit("serverUpdateTask", { todoId, newValue });
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
    socket.emit("serverRemoveTask", id);
  };

  return (
    <>
      <h1>Feelin' productive today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </>
  );
}

export default TodoList;

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import io from "socket.io-client";

function TodoList() {
  //State declaration
  const [todos, setTodos] = useState([]);

  //Socket declaration
  const socket = io("http://localhost:7000");

  useEffect(() => {
    // updateServer();
    socket.on("updateData", (data) => {
      console.log("updateData at connection with server: ", [...data]);
      setTodos(data);
      console.log(todos);
    });

    socket.on("clientRemoveTask", () => {
      // console.log("client is now removing task:", id);
      // console.log("todos: ", [...todos]);
      // let filteredArr = [...todos].filter((todo) => todo.id !== id);
      // console.log("filtered arr", filteredArr);
      // setTodos(filteredArr);
    });
    console.log("useeffect run");
  }, []);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
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
      <Todo todos={todos} removeTodo={removeTodo} />
    </>
  );
}

export default TodoList;

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import io from "socket.io-client";
const socket = io("http://localhost:7000");

function TodoList() {
  //State declaration
  const [todos, setTodos] = useState([]);

  //Refs
  // const todosRef = React.createRef();
  // todosRef.current = todos;

  useEffect(() => {
    //Socket declaration

    // updateServer();
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
    // console.log(...todos);
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

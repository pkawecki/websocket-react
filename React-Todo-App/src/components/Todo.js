import React, { useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
// import { io } from "socket.io-client";

function Todo({ todos, removeTodo }) {
  // const socket = io("http://localhost:7000");

  // const clickFunc = () => {
  //   console.log("emitting");
  //   socket.emit("my-event", { id: 69 });
  // };

  // const updateServer = () => {
  //   console.log("updating server with todos,", todos);
  //   socket.emit("updateServer", [...todos]);
  // };

  // useEffect(() => {
  //   // updateServer();
  //   socket.on("message", (data) => {
  //     console.log("message from server: ", [...data]);
  //     // todos = [...data];

  //   });
  // });

  return todos.map((todo, index) => (
    <div className="todo-row" key={index}>
      <div
        key={todo.id}
        className="todo-text"
        onClick={() => {
          console.log("button clicked");
        }}
      >
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;

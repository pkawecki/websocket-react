const express = require("express");

const path = require("path");
let taskList = [
  { id: 1, text: "chuj1" },
  { id: 2, text: "chuj2" },
  { id: 3, text: "chuj3" },
  { id: 4, text: "chuj4" },
];

//App setup
const port = 7000;
const app = express();

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Socket setup
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:8000", methods: ["*"] },
});

//User action service
io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);
  //Emitting task list
  socket.emit("updateData", taskList);

  //Emitting updateData
  socket.on("serverRemoveTask", (id) => {
    console.log("removing id", id);
    taskList = taskList.filter((element) => {
      return element.id !== id;
    });
    console.log(taskList);
    socket.broadcast.emit("updateData", taskList);
  });
  socket.on("serverAddTask", (task) => {
    console.log("adding received");
    taskList = [task, ...taskList];
    socket.broadcast.emit("updateData", taskList);
  });

  socket.on("disconnect", () => {
    socket.removeAllListeners();
  });
});

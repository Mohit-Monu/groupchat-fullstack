require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authroutes = require("./routes/AuthRoutes");
const forgetpassRoutes = require("./routes/forgetpassRoutes");
const GroupRoutes = require("./routes/GroupRoutes");
const AdminRoutes = require("./routes/AdminRoutes");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());
app.use(express.json());

app.use("/user", authroutes);
app.use("/password", forgetpassRoutes);
app.use("/group", GroupRoutes);
app.use("/admin", AdminRoutes);

io.on("connection", (socket) => {
  console.log(`⚡: user just connected!`);
  try {
    socket.on("sendmessage", (obj) => {
      console.log("first")
      socket.broadcast.emit("sendmessageResponse",obj);
    });
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(process.env.MONGODB)
  .then((res) => {
    http.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

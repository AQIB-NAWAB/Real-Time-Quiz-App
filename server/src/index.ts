import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { UserManager } from "./managers/User";
import { AdminManager } from "./managers/Admin";
import { userEvents } from "./socketEvents/UserEvent";
import { quizEvents } from "./socketEvents/QuizEvent";

dotenv.config();

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Managers

const userManager = new UserManager();
const adminManager = new AdminManager(); 

io.on("connection", (socket) => {

// Events functions
  userEvents(socket,userManager,adminManager);
  quizEvents(socket,adminManager,io); 
});



const port = process.env.PORT;
server.listen(port, () => {
  console.log("Server is listing on the port ", port);
});

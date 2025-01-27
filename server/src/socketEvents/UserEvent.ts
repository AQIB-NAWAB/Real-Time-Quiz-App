import { Socket } from "socket.io";
import { UserManager } from "../managers/User";
import { AdminManager } from "../managers/Admin";



export const userEvents=(socket:Socket,userManager:UserManager,adminManager:AdminManager)=>{
      // register user to a quiz
  socket.on("register", (username: string) => {
    const userData = {
      id: socket.id,
      username,
    };

    const user = userManager.addUser(userData);

    if (!user) {
      socket.emit("user-exist", {
        message: "You are already registered with this id",
      });
    } else {
      socket.emit("user-registered", {
        message: "User Registered , Successfuly",
      });
    }
  });


  

  // disconnect
  socket.on("disconnect", () => {
    userManager.removeUser(socket.id);
  });

}
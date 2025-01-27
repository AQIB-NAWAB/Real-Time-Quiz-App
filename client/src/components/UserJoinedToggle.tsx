import { useEffect, useState } from "react";
import { useSocket } from "../context/socketContext";
import styles from "./components.module.css";

const UserJoinedToggle = () => {
  const { socket } = useSocket();

  const [userJoined, setUserJoined] = useState<{
    isJoined: boolean;
    userName: string;
  }>({
    isJoined: false,
    userName: "",
  });

  const [resetAnimation, setResetAnimation] = useState(false); 

  useEffect(() => {
    socket.on("user-joined-quiz", (data) => {
      console.log(data);

      setUserJoined({
        isJoined: true,
        userName: data.userName,
      });

      setResetAnimation(true);
      setTimeout(() => setResetAnimation(false), 10); 
    });

    return () => {
      socket.off("user-joined-quiz");
    };
  }, [socket]);

  return (
    <>
      {userJoined.isJoined && (
        <div
          key={resetAnimation ? "reset" : "default"} 
          className={`absolute bottom-10 right-10 bg-gray-50 p-4 shadow rounded-lg hover:shadow-lg ${
            resetAnimation ? "" : styles.customAnimation
          }`}
        >
          {userJoined.userName} Joined !!
        </div>
      )}
    </>
  );
};

export default UserJoinedToggle;

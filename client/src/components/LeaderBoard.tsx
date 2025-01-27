import React, { useEffect, useState } from "react";
import socket from "../utils/socketClient";
import { useParams } from "react-router-dom";

const LeaderBoard: React.FC<{ showFull: boolean }> = ({ showFull }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const { quizName } = useParams();

  useEffect(() => {
    socket.emit("get-leaderboard-request", quizName);

    socket.on("get-leaderboard-response", (data) => {
      setLeaderBoard(data);
    });

    return () => {
      socket.off("get-leaderboard-response");
    };
  }, [quizName]);

  return (
    <div
      className={`fixed 
                  bg-white 
                  shadow-lg 
                  rounded-2xl 
                  p-6 
                  w-[25%] 

                  h-[90vh]
                  overflow-y-scroll
                  transition-all 
                  duration-500 
                  ease-in-out 
                  transform 
                  ${showFull ? "] top-1/2 left-1/2 scale-100 opacity-100 translate-x-[-50%] translate-y-[-50%]" : "top-10 right-10 scale-90 opacity-90"}
                `}
    >
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        Leaderboard
      </h2>
      <ul className="space-y-3">
        {leaderBoard.length > 0 ? (
          leaderBoard.map((user, index) => (
            <li
              key={user.id}
              className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
            >
              <span className="font-medium text-gray-800">
                {index + 1}. {user.name}
              </span>
              <span className="text-sm text-gray-500">Score: {user.score}</span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading leaderboard...</p>
        )}
      </ul>
    </div>
  );
};

export default LeaderBoard;

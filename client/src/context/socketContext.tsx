import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import socket from "../utils/socketClient";
import { Quiz, QuizState, SocketContextState } from "./constants";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext<SocketContextState | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [currentSelectedQuiz,setCurrentSelectedQuiz]=useState<Quiz|null>(null);
  const [quizState,setQuizState]=useState<QuizState>({
    name:"",
    startTime: new Date(),
    endTime: new Date(),
  });
  const [allQuizes,setAllQuizes]=useState<Quiz[]>([]);
  
  const navigate=useNavigate();



  const getQuizes=async()=>{
    socket.emit("get-quizes-request");
  }

  useEffect(() => {
    socket.connect();

    getQuizes();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("user-exist", (data: { message: string }) => {
      alert(data.message);
    });

    socket.on("user-registered", (data: { message: string }) => {
      alert(data.message);
      setIsRegister(true);
    });



    // get all todos
    socket.on("get-quizes-response",(data)=>{
      setQuizes(data);
    })


    socket.on("create-quiz-response",(data)=>{
      alert(data.message);
    })

    socket.on("get-quiz-details-response",(data)=>{
      setCurrentSelectedQuiz(data);
      console.log(data);
    })
  

    socket.on("quiz-created",()=>{
        getQuizes();
    })


    socket.on("get-published-quizes-response",(data)=>{
      setAllQuizes(data);
    })

    socket.on("quiz-status-update-response",(data)=>{
      console.log(data);
      setCurrentSelectedQuiz(data);
    })

    socket.on("join-quiz-response",(data)=>{
      alert(data.message);
      navigate("/quiz/play/"+data.quizName);

      setCurrentSelectedQuiz(data.quiz);
      
    })


   

    socket.on("disconnect", () => {
      setName("");
      setIsRegister(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isRegister,
        setIsRegister,
        name,
        setName,
        quizes,
        setQuizes,
        quizState,
        setQuizState,
        currentSelectedQuiz,
        setCurrentSelectedQuiz,
        allQuizes,
        setAllQuizes
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextState => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};


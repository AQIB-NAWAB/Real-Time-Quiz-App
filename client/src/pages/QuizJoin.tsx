import { useEffect } from "react";
import { useSocket } from "../context/socketContext"
import { useNavigate, useParams } from "react-router-dom";

const QuizJoin = () => {

    const {socket,isRegister,name} =useSocket();
    const {quizName} =useParams();
     const navigate=useNavigate();
    useEffect(()=>{

        if(isRegister){
            const data={
                userId:socket.id,
                quizName,
                userName:name
            }   
            socket.emit("join-quiz-requset",data);
        }else{
            navigate("/");
        }


        
    },[])


  return (
    <div className="h-[100vh] bg-gray-200 flex justify-center items-center">
        <div className="border-4 border-b-blue-500 w-16 h-16 rounded-full border-l-white border-r-white border-t-white animate-spin">

        </div>
    </div>
  )
}

export default QuizJoin
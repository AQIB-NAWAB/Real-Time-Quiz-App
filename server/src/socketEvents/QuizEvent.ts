import { DefaultEventsMap, Server, Socket } from "socket.io";
import { AdminManager } from "../managers/Admin";



export const quizEvents=(socket:Socket,adminManager:AdminManager,io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>)=>{


  // quizes handling
  socket.on("get-quizes-request",()=>{
    
    const data=adminManager.getAllQuiz();
    // sending a request with quizes
    socket.emit("get-quizes-response",data);

  })

  // get detail of a quiz
  socket.on("get-quiz-details-request",(name:string)=>{
     const data= adminManager.getSingleQuizDetails(name);
      socket.emit("get-quiz-details-response",data);
  })

  // create quiz 
  socket.on("create-quiz-request",({name,startTime,endTime}:{name:string,startTime:Date,endTime:Date
  })=>{
    
    adminManager.createQuiz(name,startTime,endTime);

    // updating the user who create quiz
    socket.emit("create-quiz-response",{message:"Quiz Created Sucessfully"})
    
    // updating everyone so fetch the new quiz realtime
    io.emit("quiz-created");
  })
  
  // add question to quiz
  socket.on("add-question-to-quiz-request",(data)=>{
    const {name,question,correctOptionIndex,options}=data;
    adminManager.addQuestion(name,question,options,correctOptionIndex);

  })

  // get all published request 
  socket.on("get-published-quizes-request",()=>{
    const data=adminManager.getAllPublishedQuizes();

      socket.emit("get-published-quizes-response",data);
  })


  // quiz status 
  socket.on("quiz-status-update-requset",(data)=>{
    const {name,status}=data;

    const quiz=adminManager.updateQuizStatus(name,status);
    socket.emit("quiz-status-update-response",quiz);
    
    const quizes=adminManager.getAllPublishedQuizes();

    io.emit("get-published-quizes-response",quizes);
  })

  
  socket.on("join-quiz-requset",(data)=>{
    const {userId,quizName,userName}=data;


    const quiz= adminManager.addContestantToQuiz(userId,quizName,userName);

    if(quiz){
      socket.emit("join-quiz-response",{message:"Quiz Joined Sucessfully",quizName,quiz:quiz.getQuizDetails()});

      socket.join(quizName);


      socket.to(quizName).emit("user-joined-quiz",{
        userName      
      })


    }

  })


  socket.on("submit-answer-request",(data)=>{


      const {
        questionName,
        userId,
        answer,
        quizName
      } =data;

      adminManager.submitAnswer(quizName,questionName,answer,userId);

      const leaderboardResult=adminManager.getResult(quizName);

      io.to(quizName).emit("get-leaderboard-response",leaderboardResult);
  })


  socket.on("get-leaderboard-request",(quizName:string)=>{
    
    const data=adminManager.getResult(quizName);

    io.to(quizName).emit("get-leaderboard-response",data);
  })

}
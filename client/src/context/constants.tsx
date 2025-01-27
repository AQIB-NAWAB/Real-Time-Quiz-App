import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface Quiz {
  name: string;
  questions: Question[];
  startTime: Date;
  endTime: Date;
  contestants: string[];
  isActive: boolean;
  status:string
}

export interface SocketContextState {
  socket: Socket;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  isRegister: boolean;
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  quizes: Quiz[];
  setQuizes: Dispatch<SetStateAction<Quiz[]>>;
  quizState:QuizState;
  setQuizState:Dispatch<SetStateAction<QuizState>>;
  currentSelectedQuiz:Quiz|null,
  setCurrentSelectedQuiz:Dispatch<SetStateAction<Quiz|null>>,
  allQuizes:Quiz[],
  setAllQuizes:Dispatch<SetStateAction<Quiz[]>>
}

export interface Question {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export interface QuizState {
  name: string;
  endTime: Date;
  startTime: Date;
}

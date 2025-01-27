import { Question } from "./Question";
import { Quiz } from "./Quiz";

export class AdminManager  {
  private quizzes: Map<string, Quiz>;

  constructor() {
    this.quizzes = new Map<string, Quiz>();
  }

  getAllQuiz() {
    return Array.from(this.quizzes.values());
  }

  createQuiz(name: string, startTime: Date, endTime: Date) {
    const newQuiz = new Quiz(name, startTime, endTime);
    this.quizzes.set(name, newQuiz);
    return newQuiz;
  }

  getSingleQuizDetails(name: string) {
    return this.quizzes.get(name)?.getQuizDetails() || null;
  }

  addQuestion(
    name: string,
    question: string,
    options: string[],
    correctOptionIndex: number
  ) {
    if (!this.quizzes.get(name)) {
      return null;
    }

    const newQuestion = new Question(question, options, correctOptionIndex);
    this.quizzes.get(name)?.addQuestion(question, newQuestion);
  }

  getAllPublishedQuizes() {
    return Array.from(this.quizzes.values()).filter(quiz => quiz.isPublished());
  }

  updateQuizStatus(name:string,status:string){
    
    if(!this.quizzes.get(name)){
      return null;
    }


    const quiz=this.quizzes.get(name);

    quiz?.updateStatus(status);
    
    return quiz?.getQuizDetails();
  
  }

  addContestantToQuiz(userId:string,quizName:string,userName:string){

    const quiz=this.quizzes.get(quizName) || null;

    if(quiz==null){
      return null;
    }

    quiz.joinQuiz(userId,userName);
    return quiz;
  }

  submitAnswer( quizName:string,questionName:string,answer:number,userId:string){
    
      const quiz=this.quizzes.get(quizName) || null;

      if(!quiz){
        return null;
      }


      quiz.submitAnswer(userId,questionName,answer);


    }

    getResult(quizName:string){
      return this.quizzes.get(quizName)?.getLeaderboard();
    }
  
}

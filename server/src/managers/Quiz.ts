import { Question } from "./Question";

interface ContestantType{
 score:number;
 name:string;
 id:string 
}
export class Quiz {
  private name: string;
  private questions: Map<string, Question>;
  private startTime: Date;
  private endTime: Date;
  private contestants: Map<string, ContestantType>;
  private status: string;

  constructor(name: string, startTime: Date, endTime: Date) {
    this.name = name;
    this.questions = new Map();
    this.startTime = startTime;
    this.endTime = endTime;
    this.contestants = new Map();
    this.status = "unpublish";
  }

  addQuestion(q: string, question: Question) {
    this.questions.set(q, question);
  }

  

  getQuizDetails() {
    return {
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      questions: Array.from(this.questions.values()),
      status: this.status,
    };
  }

  submitAnswer(userId:string,questionName:string,answer:number){
    const isCorrect= this.questions.get(questionName)?.checkAnswer(answer);

    const contestant = this.contestants.get(userId);
      if (contestant) {
        if(isCorrect){
          contestant.score+=1;
        } else{
          contestant.score-=1;
        }
      }

  }

  joinQuiz(userId:string,username:string){
    this.contestants.set(userId,{
      id:userId,
      score:0,
      name:username
    });
  }

  isPublished(){
    if(this.status=="publish"){
      return true;
    }
    return false;
  }

  markPublished(){
    this.status="publish";
  }

  updateStatus(status:string

  ){
    this.status=status;
  }

  getLeaderboard(){
    const contestants=Array.from(this.contestants.values());


    contestants.sort((a,b)=>{
      if(b.score!==a.score){
        return b.score-a.score;
      }
      return a.name.localeCompare(b.name);
    })


    return contestants.map((contestant, index) => ({
      rank: index + 1,
      id: contestant.id,
      name: contestant.name,
      score: contestant.score,
    })).splice(0,10);

  }
}

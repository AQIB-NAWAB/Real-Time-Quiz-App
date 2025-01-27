export class Question {
    private question: string;
    private options: string[];
    private correctOptionIndex: number;
  
    constructor(question: string, options: string[], correctOptionIndex: number) {
      if (correctOptionIndex < 0 || correctOptionIndex >= options.length) {
        throw new Error("Invalid correctOptionIndex");
      }
  
      this.question = question;
      this.options = options;
      this.correctOptionIndex = correctOptionIndex;
    }
  
    checkAnswer(optionIndex: number): boolean {
      return optionIndex === this.correctOptionIndex;
    }
  
    getDetails(): { question: string; options: string[] } {
      return {
        question: this.question,
        options: this.options,
      };
    }
  }
  
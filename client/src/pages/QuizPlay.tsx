import { useState, useEffect } from "react";
import { useSocket } from "../context/socketContext";
import UserJoinedToggle from "../components/UserJoinedToggle";
import LeaderBoard from "../components/LeaderBoard";

interface Question {
  question: string;
  options: string[];
}

interface Quiz {
  name: string;
  questions: Question[];
}

const QuizPlay = () => {
  const { currentSelectedQuiz, socket } = useSocket();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (currentSelectedQuiz) {
      setIsLoading(false);
    } else {
      setError("Failed to load quiz data");
    }
  }, [currentSelectedQuiz]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !currentSelectedQuiz) {
    return <div className="text-center text-red-500 text-xl mt-10">{error || "Quiz not found"}</div>;
  }

  const quizData: Quiz = currentSelectedQuiz;

  const handleNext = () => {
    if (currentQuestionIndex === quizData.questions.length - 1) {
      setShowFull(true);
      return;
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    }
  };

  const handleOptionClick = (index: number) => {
    if (index !== selectedOptionIndex) {
      socket.emit("submit-answer-request", {
        questionName: quizData.questions[currentQuestionIndex].question,
        userId: socket.id,
        answer: index,
        quizName: quizData.name,
      });
    }
    setSelectedOptionIndex(index);
    handleNext();
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <UserJoinedToggle />
      <LeaderBoard showFull={showFull} />

      {!showFull && (
        <div className="mt-20 mr-32">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
            {quizData.name}
          </h1>
          <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 transition-all duration-300 hover:shadow-2xl">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Question {currentQuestionIndex + 1} of {quizData.questions.length}
            </p>
            <p className="text-2xl text-gray-800 font-medium mb-6">
              {quizData.questions[currentQuestionIndex].question}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {quizData.questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full py-4 px-6 text-left rounded-xl transition-all duration-200 
                  ${
                    selectedOptionIndex === index
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;

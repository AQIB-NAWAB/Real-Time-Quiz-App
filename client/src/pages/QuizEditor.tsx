import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/socketContext";
import ModalForQuestion from "../components/ModalForQuestion";

const QuizEditor = () => {
  const [showModal, setShowModal] = useState(false);
  const { name } = useParams<{ name: string }>();
  const { socket, currentSelectedQuiz, setCurrentSelectedQuiz } = useSocket();

  useEffect(() => {
    if (name) {
      socket.emit("get-quiz-details-request", name);
    }
  }, [socket, name]);

  if (!currentSelectedQuiz) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  const openModal = () => setShowModal(true);

  const handleQuizStatusUpdate = () => {
    const data = {
      name,
      status:
        currentSelectedQuiz.status === "publish" ? "unpublish" : "publish",
    };
    socket.emit("quiz-status-update-requset", data);
  };

  return (
    <div className="p-6 md:p-12 lg:p-20 bg-gray-100 min-h-screen">
      {showModal && currentSelectedQuiz && (
        <ModalForQuestion
          name={name || ""}
          onClose={() => setShowModal(false)}
          setCurrentSelectedQuiz={setCurrentSelectedQuiz}
        />
      )}

      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl mx-auto relative">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {currentSelectedQuiz.name}
        </h1>
        <button
          onClick={handleQuizStatusUpdate}
          className={`absolute top-8 right-8 text-white rounded-md px-4 py-2 cursor-pointer transition-colors ${
            currentSelectedQuiz.status === "publish"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {currentSelectedQuiz.status === "publish" ? "Unpublish" : "Publish"}
        </button>

        <div className="mb-6 space-y-2">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Start Time:</span>{" "}
            {new Date(currentSelectedQuiz.startTime).toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">End Time:</span>{" "}
            {new Date(currentSelectedQuiz.endTime).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Questions</h2>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Add Question
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSelectedQuiz.questions.map((question, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 font-medium">
                {index + 1}. {question.question}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizEditor;

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./components.module.css";
import { useSocket } from "../context/socketContext";
import { Quiz } from "../context/constants";

const ModalForQuestion = ({ onClose,name,setCurrentSelectedQuiz }: { onClose: () => void,name:string,setCurrentSelectedQuiz:Dispatch<SetStateAction<Quiz|null>> }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number>(0);

  const {socket}=useSocket();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    setCorrectOptionIndex(index);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    if (correctOptionIndex === index) {
      setCorrectOptionIndex(0);
    } else if (correctOptionIndex > index) {
      setCorrectOptionIndex(correctOptionIndex - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      question.trim() === "" ||
      options.some((opt) => opt.trim() === "") ||
      correctOptionIndex >= options.length
    ) {
   
      return;
    }

    socket.emit("add-question-to-quiz-request",{
        name:name,
        question,
        correctOptionIndex,
        options
     })

     setCurrentSelectedQuiz((prev) => {
        if (!prev) return prev;
        return {
            ...prev,
            questions: [...prev.questions, { question, correctOptionIndex, options }]
        };
     })

        setQuestion("");
        setOptions([""]);
        setCorrectOptionIndex(0);
        onClose();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.questionBox}>
        <h1>Add Question</h1>
        <span className={styles.cross} onClick={onClose}>
          X
        </span>
        <div className={styles.questionBody}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="question"
              placeholder="Enter the question"
              value={question}
              onChange={handleQuestionChange}
              className={styles.inputField}
            />
            {options.map((option, i) => (
              <div key={i} className={styles.optionContainer}>
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, i)}
                  className={styles.inputField}
                />
                <div className={styles.holder}>
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(i)}
                      className={styles.removeBtn}
                    >
                      Remove
                    </button>
                  )}

                  <label className={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIndex === i}
                      onChange={() => handleCorrectOptionChange(i)}
                    />
                    Correct
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className={styles.addOptionBtn}
            >
              Add Option
            </button>
            <button type="submit" className={styles.submitBtn}>
              Submit Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForQuestion;
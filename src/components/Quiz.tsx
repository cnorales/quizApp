import React from "react";
import "../index.css";
//const axios = require("axios");

interface QuizTypes {
  checkAnswer: (answer: string) => void;
  correctAnswer: boolean;
  next: () => void;
  previous: () => void;
  data: {
    question: string;
    correct_answer: string;
    answers: string[];
  };
}

const Quiz: React.FC<QuizTypes> = ({
  checkAnswer,
  correctAnswer,
  next,
  previous,
  data: { question, correct_answer, answers },
}) => {
  return (
    <>
      <div className="container">
        <div className="questions">
          <h1 dangerouslySetInnerHTML={{ __html: question }} />
        </div>
        <div className="options">
          {answers.map((answer) => {
            const specialClassName = correctAnswer
              ? answer === correct_answer
                ? "green-button"
                : "red-button"
              : "";

            return (
              <button
                key={answer}
                className={`normal-button ${specialClassName}`}
                onClick={() => checkAnswer(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            );
          })}
        </div>
        {correctAnswer && (
          <>
            <div className="buttons">
              <button onClick={next} className="nextQuestion">
                Next
              </button>
              <button onClick={previous} className="previousQuestion">
                Previous
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;

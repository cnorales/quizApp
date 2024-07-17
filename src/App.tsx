import React, { useState, useEffect } from "react";
import Quiz from "./components/Quiz.tsx";
import axios from "axios";

const api_url =
  "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple";

function App() {
  const [questions, setQuestions] = useState([]);
  const [correctAnswer, getAnswer] = useState(false);
  const [points, setPoints] = useState(0);
  //const [options, getOptions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [result, setResult] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await axios.get(api_url);
      const questions = response.data.results.map((question) => ({
        ...question,
        answers: shuffleArray([
          question.correct_answer,
          ...question.incorrect_answers,
        ]),
      }));
      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const checkAnswer = (answer) => {
    if (!correctAnswer) {
      if (answer === questions[currIndex].correct_answer) {
        setPoints(points + 1);
      }
    }
    getAnswer(true);
  };

  const next = () => {
    if (currIndex < questions.length - 1) {
      setCurrIndex(currIndex + 1);
      getAnswer(false);
    } else {
      setResult(true);
    }
  };

  const previous = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex - 1);
      getAnswer(false);
    }
  };

  const reset = () => {
    setPoints(0);
    setCurrIndex(0);
    setResult(false);
    fetch();
  };

  return (
    <div className="project">
      <h1 className="text">Quiz</h1>
      {result ? (
        <>
          <h2 className="text">
            You Scored {points} out of {questions.length}
          </h2>
          <button className="text" onClick={reset}>
            Reset
          </button>
        </>
      ) : questions.length > 0 ? (
        <>
          <h2 className="text">Score : {points}</h2>
          <Quiz
            checkAnswer={checkAnswer}
            correctAnswer={correctAnswer}
            next={next}
            previous={previous}
            data={questions[currIndex]}
          />
          <h3 className="index">
            {currIndex + 1} out of {questions.length} Questions
          </h3>
        </>
      ) : (
        <div className="container">...Loading</div>
      )}
    </div>
  );
}

export default App;

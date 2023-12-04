/* Curtis Simpson 12/12/2022 */

import { useState } from "react";
import Question from "../Question";
import GameOver from "../GameOver";

const isGameOver = (currentIdx, numQuestions) => currentIdx + 1 > numQuestions;
const getRandomOrder = () => [0, 1, 2, 3].sort((a, b) => 0.5 - Math.random());

function Game({ questions }) {
  const questionCount = questions?.length;

  const [score, setScore] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answerOrder, setAnswerOrder] = useState(getRandomOrder);

  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleAnswerClick(e) {
    if (answered) return;

    const answer = e.target.textContent;
    setAnswered(true);

    if (answer === questions[questionIdx].correctAnswer) {
      setScore(score + 1);
      setIsCorrect(true);
    }
  }

  function nextQuestion() {
    setQuestionIdx(questionIdx + 1);
    setAnswerOrder(getRandomOrder);
    setAnswered(null);
    setIsCorrect(false);
  }

  return (
    <>
      <header>
        <h1>Trivia</h1>
        <p className="score">Score: {score}</p>
      </header>

      {isGameOver(questionIdx, questionCount) ? (
        // Game over screen
        <GameOver score={score} questionCount={questionCount} />
      ) : (
        // Game running
        <>
          <h2>Question #{questionIdx + 1}</h2>
          {questions && (
            <Question
              data={questions[questionIdx]}
              order={answerOrder}
              handleClick={handleAnswerClick}
            />
          )}

          {/* After question is answered show if answer is correct */}
          {answered && (
            <div className="centered">
              {isCorrect ? (
                <h2>Correct!</h2>
              ) : (
                <>
                  <h2>Incorrect</h2>
                  <p>Correct answer: {questions[questionIdx].correctAnswer}</p>
                </>
              )}
              <button className="button" onClick={nextQuestion}>
                Next question
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Game;

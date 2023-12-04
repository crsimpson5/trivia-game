/* Curtis Simpson 12/12/2022 */

import AnswerButton from "../AnswerButton";

function Question({ data, order, handleClick }) {
  const { correctAnswer, incorrectAnswers } = data;
  const answers = [correctAnswer, ...incorrectAnswers];

  return (
    <>
      <p>{data.question}</p>
      <div className="answer-container">
        {order.map((idx) => (
          <AnswerButton
            key={order[idx]}
            text={answers[idx]}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}

export default Question;

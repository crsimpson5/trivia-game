/* Curtis Simpson 12/12/2022 */

function AnswerButton({ text, handleClick }) {
  return (
    <button className="answer-button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default AnswerButton;
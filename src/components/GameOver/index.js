/* Curtis Simpson 12/12/2022 */

import { useCallback, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function GameOver({ score, questionCount }) {
  const success = score / questionCount >= 0.5;

  // ReactCanvasConfetti config
  // https://codesandbox.io/s/fireworks-fn-react-canvas-confetti-w594u?file=/src/App.js:684-731
  const [intervalId, setIntervalId] = useState();
  const refAnimationInstance = useRef(null);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current();
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 1200));
    }
  }, [intervalId, nextTickAnimation]);

  return (
    <div className="centered">
      {success ? <h2>Congrats!</h2> : <h2>Game Over</h2>}
      <p>
        {score} out of {questionCount} correct
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{ marginTop: "3rem" }}
      >
        Play again
      </button>
      {success && (
        <>
          <ReactCanvasConfetti refConfetti={getInstance} className="canvas" />
          {startAnimation()}
        </>
      )}
    </div>
  );
}

export default GameOver;

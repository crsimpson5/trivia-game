/* Curtis Simpson 12/12/2022 */

import React from "react";
import Game from "./components/Game";
import "./App.css";

// Trivia API parameters
const CATEGORY = "general_knowledge,history,science";
const DIFICULTY = "medium";
const QUESTION_COUNT = 10;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const data = await fetch(
        `https://the-trivia-api.com/api/questions?categories=${CATEGORY}&limit=${QUESTION_COUNT}&region=US&difficulty=${DIFICULTY}`
      ).then((res) => res.json());

      const questionArr = [];

      for (const q of data) {
        questionArr.push({
          correctAnswer: q.correctAnswer,
          incorrectAnswers: q.incorrectAnswers,
          question: q.question
        });
      }

      this.setState({ questions: questionArr });
    };

    fetchData();
  }

  render() {
    return (
      <div className="container">
        <Game questions={this.state.questions} />
      </div>
    );
  }
}

export default App;

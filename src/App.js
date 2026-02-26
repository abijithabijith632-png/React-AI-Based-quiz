import React, { useState } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);
    setShowResult(false);
    setCurrent(0);
    setScore(0);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, difficulty })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setQuestions(data);

    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Try again.");
    }

    setLoading(false);
  };

  const handleAnswer = (selected) => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setShowResult(false);
    setCurrent(0);
    setScore(0);
    setTopic("");
  };

  return (
    <div className="App">
      <h1>AI-Based Quiz App</h1>

      {questions.length === 0 && !loading && (
        <div>
          <input
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <button onClick={generateQuiz}>Generate Quiz</button>
        </div>
      )}

      {loading && <p>Generating questions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {questions.length > 0 && !showResult && (
        <div>
          <h2>
            Question {current + 1} of {questions.length}
          </h2>
          <p>{questions[current].question}</p>

          {questions[current].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div>
          <h2>Quiz Completed 🎉</h2>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button onClick={resetQuiz}>Create New Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
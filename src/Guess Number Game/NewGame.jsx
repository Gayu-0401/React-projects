import React, { useState, useEffect } from "react";

// Utility function to generate a random 4-digit number without repeating digits
const generateNumber = () => {
  const digits = Array.from({ length: 10 }, (_, i) => i);
  const randomDigits = digits.sort(() => 0.5 - Math.random()).slice(0, 4);
  return randomDigits.join("");
};

// Function to compare the guess with the secret number
const compareNumbers = (secret, guess) => {
  let result = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secret[i]) {
      result += "+";
    } else if (secret.includes(guess[i])) {
      result += "-";
    }
  }
  return result;
};

const GuessingGame = () => {
  const [name, setName] = useState("");
  const [secretNumber, setSecretNumber] = useState("");
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [guesses, setGuesses] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [bestScore, setBestScore] = useState(null);

  // Initialize the game
  const startGame = () => {
    setSecretNumber(generateNumber());
    setGuesses(0);
    setFeedback("");
    setGuess("");
    setTimeTaken(0);
    setStartTime(Date.now());
  };

  // Handle guess submission
  const handleGuess = () => {
    if (guess.length !== 4 || new Set(guess).size !== 4 || isNaN(guess)) {
      setFeedback("Please enter a valid 4-digit number with unique digits.");
      return;
    }

    setGuesses((prev) => prev + 1);
    const result = compareNumbers(secretNumber, guess);
    setFeedback(result);

    if (result === "++++") {
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000;
      setTimeTaken(timeElapsed);
      saveResult(name, guesses + 1, timeElapsed);
    }
  };

  // Save result to local storage
  const saveResult = (name, moves, time) => {
    const score = (time / moves) * 1000; // Weighted score calculation
    const newResult = { name, moves, time, score };
    const results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(newResult);
    localStorage.setItem("results", JSON.stringify(results));

    // Update best score
    const best = results.sort((a, b) => a.score - b.score)[0];
    setBestScore(best);
  };

  // Load best score on component mount
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    if (results.length > 0) {
      const best = results.sort((a, b) => a.score - b.score)[0];
      setBestScore(best);
    }
    startGame(); // Start a new game
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Guessing Number Game</h1>

      {!name && (
        <div>
          <h2>Enter your name to start</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {name && (
        <div>
          <h2>Welcome, {name}!</h2>
          <p>A 4-digit number has been generated. Start guessing!</p>
          <input
            type="text"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={4}
          />
          <button onClick={handleGuess}>Submit Guess</button>
          <p>Feedback: {feedback}</p>
          {feedback === "++++" && (
            <p>
              🎉 Congratulations, {name}! You guessed the number in {guesses}{" "}
              moves and {timeTaken.toFixed(2)} seconds.
            </p>
          )}
          <p>Number of guesses: {guesses}</p>
        </div>
      )}

      {bestScore && (
        <div style={{ marginTop: "20px" }}>
          <h2>Best Score</h2>
          <p>
            {bestScore.name} - Moves: {bestScore.moves}, Time:{" "}
            {bestScore.time.toFixed(2)}s, Score: {bestScore.score.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default GuessingGame;

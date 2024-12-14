import React, { useState, useEffect } from 'react'

function GuessingGame() {
    const [guess, setGuess] = useState("");
    const [secretNumber, setSecretNumber] = useState("");
    const [feedBack,setFeedback] = useState("");
    const [count,setCount] = useState(0)
    
    const startNewGame = () => {
        const random = Math.floor(Math.random() * 9000 + 1000); 
        setSecretNumber(random);
        localStorage.setItem("secretNumber", random); 
        setGuess(""); 
        setFeedback(""); 
        setCount(0)
        console.log("New game started. Generated Secret Number:", random); 
    };
    
    useEffect(() => {
        const storedNumber = localStorage.getItem("secretNumber");
        if (storedNumber) {
          setSecretNumber(parseInt(storedNumber)); 
        } else {
          const random = Math.floor(Math.random() * 9000 + 1000); 
          setSecretNumber(random);
          localStorage.setItem("secretNumber", random); 
          console.log("Generated new secret number:", random);
        }
      }, []);

    const handleGuess = () => {
        console.log("Generated Secret Number:", secretNumber);
        if(guess.length !== 4 || isNaN(guess)){
            setFeedback("Please enter a valid 4-digit number");
            setCount(count+1);
            return;
       }
       else{
           if(parseInt(guess) === secretNumber){
               setFeedback("🎉 Congratulations,  You guessed the correct number ");
               setCount(count+1);
            } 
           else if(parseInt(guess) < secretNumber){
               setFeedback("Your Guess is too low");
               setCount(count+1);
            } 
           else {
               setFeedback("Your Guess is too high");
               setCount(count+1);
            } 
       }
      };

    return (
        <>
            <h4 style={{ marginBottom: "0", paddingBottom: "0" }}>Welcome to</h4>
            <h1 style={{ color: "yellowgreen", marginTop: "0", marginBottom: "0", paddingTop: "0" }}>Guessing Number Game</h1>
            <p style={{ color: "blue" }}>A 4-digit number has been generated. Start guessing!</p>
            <input type="number" placeholder='Enter your Guess' value={guess} onChange={(e) => setGuess(e.target.value)} maxLength="4" style={{ padding: "7px 15px", borderRadius: "7px", border: "3px solid green" }} />
            <button onClick={handleGuess}
                style={{
                    padding: "7px 15px",
                    borderRadius: "7px",
                    marginLeft: "10px",
                    backgroundColor: "yellowgreen",
                    border: "none",
                    cursor: "pointer",
                }}
            >Submit Guess</button>
            <button onClick={startNewGame}
                style={{
                    padding: "7px 15px",
                    borderRadius: "7px",
                    marginLeft: "10px",
                    backgroundColor: "orange",
                    border: "none",
                    cursor: "pointer",
                }}
            >Start New Game</button>
            <p style={{ color: "red", marginTop: "10px" }}>{feedBack}</p>
            <h3>Number of guesses : {count}</h3>
        </>
    )
}

export default GuessingGame
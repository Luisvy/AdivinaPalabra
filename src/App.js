import React, { useState } from "react";
import "./App.css";
import Row from "./Row";

const App = () => {
  const targetWord = "PERRO";
  const maxAttempts = 6;

  const [guesses, setGuesses] = useState([]); // Array que almacena los intentos
  const [currentGuess, setCurrentGuess] = useState(""); // Almacena el intento actual
  const [isGameOver, setIsGameOver] = useState(false); // Indica si el juego ha terminado

  const handleInputChange = (event) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      return;
    }

    const updatedGuesses = [...guesses, currentGuess];
    setGuesses(updatedGuesses);

    if (currentGuess === targetWord || updatedGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    }
  };

  return (
    <div className="main-container">
      <h1>Adivina la palabra</h1>
      <form>
        <p>REGLAS:</p>
        <li>Intenta adivinar la palabra de 5 letras</li>
        <li>Por cada letra acertada se pondrá el cuadro en <strong id="correct">Verde</strong></li>
        <li>Si fallas, el cuadro será <strong id="absent">GRIS</strong>.</li>
        <li>Si la letra se repite, será <strong id="present">AMARILLO</strong></li>
        <li>Solo tienes {maxAttempts} intentos</li>
      </form>
      <h3>Intentos restantes: {maxAttempts - guesses.length}</h3>
      {guesses.map((guess, index) => (
        <Row key={index} guess={guess} targetWord={targetWord} />
      ))}
      {!isGameOver && (
        <>
          <input
            onChange={handleInputChange}
            maxLength={targetWord.length}
            placeholder="Di la palabra de 5 letras"
            value={currentGuess}
            disabled={isGameOver}
            className="input-field"
            type="text"
            autoComplete="off"
            autoFocus
            pattern="[A-Za-z]{5}"
            title="5 letras"
            required
          />
          <button onClick={handleGuess}>Adivina</button>
        </>
      )}
      {isGameOver && currentGuess !== targetWord && (
        <p>{`Se acabó, la palabra era: ${targetWord}`}</p>
      )}
      {isGameOver && currentGuess === targetWord && (
        <p>{`¡Has ganado!`}</p>
      )}
    </div>
  );
};

export default App;
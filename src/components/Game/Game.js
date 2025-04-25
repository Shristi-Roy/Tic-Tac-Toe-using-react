import React, { useState } from "react";
import "./Game.css";
import { Board } from "../Board/Board";

export const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (newBoard.every(cell => cell !== null)) {
      // All cells filled but no winner => it's a draw
      setIsDraw(true);
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const startNewGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <>
      <div id="game">
        <h1>Tic Tac Toe</h1>
        <Board cells={board} onCellClick={handleClick} />
      </div>

      {(winner || isDraw) && (
        <div id="modal-overlay" style={{ display: "flex" }}>
          <div id="game-result-modal">
            <div id="result-container">
              <div id="winner-container">
                <span>
                  {winner ? `${winner} Wins!` : "It's a Tie!"}
                </span>
              </div>
            </div>
            <div id="new-game-container">
              <button id="new-game-button" onClick={startNewGame}>
                Start New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import { useState, useEffect } from "react";
import confetti from 'canvas-confetti';
import "./TicTacToe.css";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(board);

  useEffect(() => {
    if (!winner) return;

    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        spread: 70,
        origin: {
          x: Math.random(),
          y: Math.random() * 1,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [winner]);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  const isDraw = !winner && board.every((square) => square !== null);

  return (
    <div className="tic-tac-toe">
      <h2 className="game-title">Tic Tac Toe</h2>

      <div className="game-status">
        {winner
          ? `Winner: ${winner}`
          : isDraw
            ? "Draw!"
            : `Current Player: ${isXTurn ? "X" : "O"}`}
      </div>

      <div className="board">
        {board.map((square, index) => (
          <button
            key={index}
            className={`square ${square === "X"
              ? "square-x"
              : square === "O"
                ? "square-o"
                : ""
              }`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}
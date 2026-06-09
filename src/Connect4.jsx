import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./Connect4.css";

const ROWS = 6;
const COLS = 7;

export default function Connect4() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [lastMove, setLastMove] = useState(null);

  const winner = calculateWinner(board);

  function handleClick(col) {
    if (winner) return;

    const newBoard = board.map(row => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = isRedTurn ? "R" : "Y";

        setBoard(newBoard);
        setIsRedTurn(!isRedTurn);

        setLastMove({ row, col });

        return;
      }
    }
  }

  function resetGame() {
    setBoard(createEmptyBoard());
    setIsRedTurn(true);
    setLastMove(null);
  }

  useEffect(() => {
    if (!winner) return;

    confetti({
      particleCount: 250,
      spread: 120,
      startVelocity: 40,
      origin: { y: 0.6 },
      colors: winner === "R"
        ? ["#ef4444", "#ffffff"]
        : ["#facc15", "#ffffff"],
    });
  }, [winner]);

  return (
    <div className="connect4">
      <h2 className="game-title">Connect 4</h2>

      <div className="game-status">
        {winner
          ? `Winner: ${winner === "R" ? "Red" : "Yellow"}`
          : `Current Player: ${isRedTurn ? "Red" : "Yellow"}`}
      </div>

      <div className="connect4-board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <button
                key={cIdx}
                className={`cell ${
                  cell === "R"
                    ? "red"
                    : cell === "Y"
                    ? "yellow"
                    : ""
                } ${
                  lastMove &&
                  lastMove.row === rIdx &&
                  lastMove.col === cIdx
                    ? "drop"
                    : ""
                }`}
                onClick={() => handleClick(cIdx)}
              />
            ))}
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array(COLS).fill(null)
  );
}

function calculateWinner(board) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const player = board[r][c];
      if (!player) continue;

      for (let [dr, dc] of directions) {
        let count = 0;

        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          if (
            nr < 0 ||
            nr >= ROWS ||
            nc < 0 ||
            nc >= COLS ||
            board[nr][nc] !== player
          ) {
            break;
          }

          count++;
        }

        if (count === 4) return player;
      }
    }
  }

  return null;
}
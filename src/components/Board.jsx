import React, { useState } from "react";
import "../styles/styles.css";

const BOARD_SIZE = 10;

export default function () {
  const [board, setBoard] = useState(
    new Array(BOARD_SIZE).fill(0).map((i) => new Array(BOARD_SIZE).fill(0))
  );

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cell, cellIdx) => (
            <div
              className={`cell ${true ? "food-cell" : ""}`}
              key={cellIdx}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

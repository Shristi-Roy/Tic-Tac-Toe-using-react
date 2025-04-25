import React from "react";
import "./Board.css";

export const Board = ({ cells, onCellClick }) => {
  return (
    <div id="board">
      {cells.map((cell, index) => (
        <button
          key={index}
          className="cell"
          onClick={() => onCellClick(index)}
        >
          <span className={`cell-content ${cell ? "populated" : ""}`}>
            {cell}
          </span>
        </button>
      ))}
    </div>
  );
};

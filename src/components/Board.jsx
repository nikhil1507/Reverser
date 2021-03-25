import React, { useEffect, useState } from "react";
import { generateBoard } from "../utils/utils";
import "../styles/styles.css";

// constants
const BOARD_SIZE = 10;

// direction enum
const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

// linkded list declaration
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }
}

export default function () {
  const [board, setBoard] = useState(generateBoard(BOARD_SIZE));
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [snake, setSnake] = useState(new LinkedList(getCurrentCords(board)));
  const [foodCell, setFoodCell] = useState(snake.head.value.cell + 2);
  const [snakeCell, setSnakeCell] = useState(new Set([snake.head.value.cell]));

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const currDirection = handleKeyPress(e);
      setDirection(currDirection);
    });
  }, []);

  // setting new cords
  const newCords = (directions) => {
    const snakeConst = snake.head.value;

    if (directions === "RIGHT") {
      return {
        row: snakeConst.row,
        col: snakeConst.col + 1,
      };
    }
    if (directions === "LEFT") {
      return {
        row: snakeConst.row,
        col: snakeConst.col - 1,
      };
    }
    if (directions === "UP") {
      return {
        row: snakeConst.row - 1,
        col: snakeConst.col,
      };
    }
    if (directions === "DOWN") {
      return {
        row: snakeConst.row + 1,
        col: snakeConst.col,
      };
    }
  };
  // function to move snake
  const moveSnake = (directions) => {
    const nextCords = newCords(directions);
    const newRow = nextCords.row;
    const newCol = nextCords.col;
    const newCell = board[newRow][newCol];
    const newSnakeValue = {
      row: newRow,
      col: newCol,
      cell: newCell,
    };
    console.log(newCell);
    setSnake(new LinkedList(newSnakeValue));
  };

  // function to move the snake manually

  return (
    <div className="board">
      {board.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((cell, cellIdx) => {
              const getClassName = getCellClass(cell, foodCell, snakeCell);
              return (
                <div
                  style={{ textAlign: "center" }}
                  className={getClassName}
                  key={cellIdx}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

//handling key press event
const handleKeyPress = (e) => {
  if (e.key === "ArrowUp") return Direction.UP;
  if (e.key === "ArrowRight") return Direction.RIGHT;
  if (e.key === "ArrowLeft") return Direction.LEFT;
  if (e.key === "ArrowDown") return Direction.DOWN;
  return;
};

// getting current cordinates
const getCurrentCords = (board) => {
  const rowSize = board.length;
  const colSize = board[0].length;

  const row = Math.floor(rowSize / 3);
  const col = Math.floor(colSize / 3);
  const cell = board[row][col];
  return {
    row,
    col,
    cell,
  };
};

// function get class

const getCellClass = (cell, foodCell, snakeCell) => {
  let className = "cell";
  if (cell === foodCell) className += " food-cell";
  if (snakeCell.has(cell)) className += " snake-cell";
  return className;
};

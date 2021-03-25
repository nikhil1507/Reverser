// function to generate the board

const generateBoard = (boardSize) => {
  const boardContainer = [];
  let counter = 1;
  for (let row = 0; row < boardSize; row++) {
    const rows = [];
    for (let col = 0; col < boardSize; col++) {
      rows.push(counter++);
    }
    boardContainer.push(rows);
  }
  return boardContainer;
};

export { generateBoard };

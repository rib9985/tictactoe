const winConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function win(board) {
  for (let i = 0; i < winConditions.length; i++) {
    let result = null;
    const winningCondition = winConditions[i];
    const a = board[winningCondition[0]];
    const b = board[winningCondition[1]];
    const c = board[winningCondition[2]];
    if (a === null || b === null || c === null) {
      continue;
    }
    if (a === b && b === c) {
      result = board[a];
      return result;
    }
  }
  return null;
}

// Example usage:
const board = ['x', 'x', 'x',
  'o', 'o', null,
  null, null, null];
const winner = win(board);
console.log(winner);

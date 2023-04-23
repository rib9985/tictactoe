const Player = (name, marker, score, turn) => ({
  name, marker, score, turn,
});

const playerOne = Player('playerOne', 'x', 0, true);
const playerTwo = Player('playerTwo', 'o', 0, false);

const Gameboard = (() => {
  const board = ['o', 'x', 'x',
    'x', 'x', 'o',
    'x', 'o', 'o'];
  const getBoard = () => board;
  const resetBoard = () => {
    for (let i = 0; i < board.length; i + 1) { board[i] = null; }
  };

  function setMaker(index, marker) {
    if (board[index] === null) {
      board[index] = marker;
      return console.log(`Set ${marker} at ${board[index]}`);
    }
    return console.log('Invalid Move');
  }

  return {
    board, getBoard, resetBoard, setMaker,
  };
})();

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

const win = (function () {
  // eslint-disable-next-line prefer-destructuring
  const board = Gameboard.board;

  const hasWon = () => {
    for (let i = 0; i <= 7; i++) {
      const winningCondition = winConditions[i];
      const a = board[winningCondition[0]];
      const b = board[winningCondition[1]];
      const c = board[winningCondition[2]];
      if (a === null || b === null || c === null) { continue; } else if (a === b && b === c) {
        console.log(`Winner is ${a}`);
        return a;
      } else continue;
    }
  };

  const checkForWinner = function () {
    const hasWonChecker = hasWon();
    let winner = null;
    if (hasWonChecker === playerOne.marker) {
      winner = playerOne;
      console.log('Winner is Player One');
    } else if (hasWonChecker === playerTwo.marker) {
      winner = playerTwo;
      console.log('Winner is Player Two');
    } else {
      console.log('Winnner is null');
    }
    return winner;
  };

  const checkForDraw = function () {
    // check each element in the gameboard array.
    // if each element != null -> board full
    // if board full ->
    if (board.includes(null)) {
      return false;
    }
    return true;
  };

  const checkRoundEnds = function () {
    if (checkForDraw() === true) {
      console.log('Round was a Draw!');
      return true;
    }
    if (checkForDraw() === false) {
      const winResult = checkForWinner();

      if (winResult != null) {
        console.log(`The Winner is ${winResult.name}`);
        console.log('Round Ends');
        return winResult;
      }
      return false;
    }
  };

  return {
    board, hasWon, checkForWinner, checkForDraw, checkRoundEnds,
  };
}());

console.log(win.checkRoundEnds());

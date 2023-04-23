/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const Player = (name, marker, score, turn) => ({
  name, marker, score, turn,
});

const Gameboard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const getBoard = () => board;
  const resetBoard = () => {
    for (let i = 0; i < board.length; i + 1) { board[i] = null; }
  };

  function setMarker(index, marker) {
    if (board[index] === null) {
      board[index] = marker;
      return console.log(`Set ${marker} at ${board[index]}`);
    }
    return console.log('Invalid Move');
  }

  return {
    board, getBoard, resetBoard, setMarker,
  };
})();

const playerOne = Player('playerOne', 'x', 0, true);
const playerTwo = Player('playerTwo', 'o', 0, false);

const changeInnerText = function (id, player) {
  let element = document.getElementById(id);
  let innerText = element.innerHTML;

  if ((innerText === null) || (innerText === '')) {
    console.log(player.marker);
    innerText = player.marker;
    element.innerHTML = innerText;
    return id;
  }
  console.log('this move is not valid');
  return null;
};

function playTurn(id) {
  let player = getCurrentPlayer();
  let playerNext = getNextPlayer();
  let makePlay = changeInnerText(id, player);
  if (makePlay != null) {
    // place it on the gameboard with the id
    Gameboard.setMarker(makePlay, player.marker);
    player.turn = false;
    playerNext.turn = true;
    console.log(Gameboard.board);
    let winner = WinChecker.checkRoundEnds;
  } return console.log('invalid move');
}

function handleClick(tileId) {
  console.log(tileId);
  playTurn(tileId);
}

const selectDocument = document.querySelector('.grid-container');
selectDocument.addEventListener('click', (e) => {
  clickHandler(e);
});

const clickHandler = function (e) {
  const tileId = e.target.id;
  handleClick(tileId);
};

const getCurrentPlayer = function () {
  if (playerOne.turn === true) {
    return playerOne;
  }
  return playerTwo;
};

const getNextPlayer = function () {
  if (playerOne.turn === false) {
    return playerOne;
  }
  return playerTwo;
};

const WinChecker = (() => {
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

  const win = function () {
    const board = Gameboard.getBoard;
    for (let i = 0; i <= 7; i++) {
      const winningCondition = winConditions[i];
      const a = board[winningCondition[0]];
      const b = board[winningCondition[1]];
      const c = board[winningCondition[2]];
      if (a === null || b === null || c === null) { continue; }
      if (a === b && b === c) {
        return board[a];
      }
      return null;
    }
  };

  const checkForWinner = function () {
    let winner = null;
    if (win === playerOne.marker) {
      winner = playerOne;
    } else if (win === playerTwo.marker) {
      winner = playerTwo;
    } else return winner;
  };

  const checkForDraw = function () {
    // check each element in the gameboard array.
    // if each element != null -> board full
    // if board full ->
    const board = Gameboard.getBoard;
    if (board.includes(null)) {
      return false;
    }
    return true;
  };

  const checkRoundEnds = function () {
    if (checkForDraw === true) {
      return true;
    }
    if (checkForDraw === false) {
      const winResult = checkForWinner;
      if (winResult != null) {
        return winResult;
      }
      return false;
    }
  };

  return { checkForWinner, checkForDraw, checkRoundEnds };
})();

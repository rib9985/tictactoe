/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const Player = (name, marker, score, turn) => ({
  name, marker, score, turn,
});

const Gamelogic = (() => {
  const Gameboard = (() => {
    const board = [null, null, null,
      null, null, null,
      null, null, null];

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

  const playerOne = Player('playerOne', 'x', 0, true);
  const playerTwo = Player('playerTwo', 'o', 0, false);

  const DisplayController = (() => {
    // get board id
    const getTileId = function () {
      const selectDocument = document.querySelector('.grid-container');
      return selectDocument.addEventListener('click', (e) => e.target.id);
    };

    // Change the text inside HTML on click
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

    const getPlayerScoreId = (i) => document.getElementById(`score-${i}`);

    const updateScore = (player) => {
      let i;
      if (player === playerOne) {
        i = 1;
      } else {
        i = 2;
      }
      const previousScore = getPlayerScoreId(i);
      previousScore.innerText = player.score;
    };

    return { changeInnerText, getTileId };
  })();

  const Gameplay = (() => {
    const round = 1;

    const incrementRound = () => round + 1;
    const incrementScore = (player) => player.score + 1;

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

    const switchPlayerTurn = function () {
      let player = getCurrentPlayer();
      let playerNext = getNextPlayer();
      player.turn = false;
      playerNext.turn = true;
    };

    const resetPlayersTurn = function () {
      playerOne.turn = true;
      playerTwo.turn = false;
    };

    const playTurn = function () {
      const choice = DisplayController.getTileId();
      const player = getCurrentPlayer();
      Gameboard.setMaker(choice, player.marker);
      DisplayController.changeInnerText(choice, player);
    };

    const newRound = function () {
      incrementRound();
      Gameboard.resetBoard();
      resetPlayersTurn();
    };

    const playRound = function () {
      playTurn();
      const roundEnd = WinChecker.checkRoundEnds();
      if (roundEnd === true) {
        incrementScore(playerOne);
        incrementScore(playerTwo);
        return;
      }
      if (roundEnd === false) {
        switchPlayerTurn();
        playTurn();
      } else if (roundEnd === playerOne) {
        return incrementScore(playerOne);
      } else if (roundEnd === playerTwo) {
        return incrementScore(playerTwo);
      }
    };
    return { playRound, newRound };
  })();

  const WinChecker = (() => {
    // eslint-disable-next-line prefer-destructuring
    const board = Gameboard.board;

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
      checkRoundEnds,
    };
  })();

  const Scoreboard = (() => {
    const getPlayerScore = (player) => player.score;

    return { getPlayerScore };
  })();
  return (Gameplay);
})();

Gamelogic.Gameplay();

/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const Player = (name, marker, score, turn) => ({
  name, marker, score, turn,
});

const Gamelogic = (() => {
  const Gameboard = (() => {
    const board = [null, null, null, null, null, null, null, null, null];
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
        let a = board[winningCondition[0]];
        let b = board[winningCondition[1]];
        let c = board[winningCondition[2]];
        if (a === null || b === null || c === null) { continue; }
        if (a === b && b === c) {
          return board[a];
        }
        return null;
      }

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
    };
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
      getCurrentPlayer.turn = false;
      getNextPlayer.turn = true;
    };

    const playTurn = function () {
      const choice = DisplayController.getTileId;
      const player = getCurrentPlayer;
      Gameboard.setMaker(choice, player.marker);
      DisplayController.updateTileMarker(choice, player);
    };

    const newRound = function () {
      incrementRound;
      Gameboard.resetBoard;
    };

    const playRound = function () {
      playTurn();
      const roundEnd = WinChecker.checkRoundEnds;
      if (roundEnd === true) {
        incrementScore(playerOne);
        incrementScore(playerTwo);
        return newRound;
      }
      if (roundEnd === false) {
        switchPlayerTurn();
      } else {
        if (roundEnd === playerOne) {
          incrementScore(playerOne);
        } else if (roundEnd === playerTwo) {
          incrementScore(playerTwo);
        }
        return newRound;
      }
    };
    return { playTurn };
  })();

  const Scoreboard = (() => {
    const getPlayerScore = (player) => player.score;

    return { getPlayerScore };
  })();

  const DisplayController = (() => {
    const getTileId = () => {
      const position = document.querySelector('.grid-container');
      position.addEventListener('click', (e) => {
        const tileId = e.target.id;
        return tileId;
      });
    };
    // get board id
    const updateTileMarker = (i, player) => {
      document.getElementById(i).innerText = player.marker;
    };
    // update board
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
    return {
      updateScore, updateTileMarker, getPlayerScoreId, getTileId,
    };
  }
  )();
  { return Gameplay.playTurn; }
})();

Gamelogic();

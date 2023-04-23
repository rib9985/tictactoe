const Gameplay = (() => {
  const round = 1;

  const incrementRound = () => round + 1;
  const incrementScore = (player) => player.score + 1;

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
})();

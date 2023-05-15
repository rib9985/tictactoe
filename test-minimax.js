/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const Player = (name, marker, score, turn) => ({
  name, marker, score, turn,
});

const DisplayController = (() => {
  const startButton = document.getElementById('start');

  const selectBoard = document.querySelectorAll('.board');

  let messageBoard = document.getElementById('message');

  const clickHandler = function (event) {
    const tileId = event.target.id;
    Gamelogic.playRound(tileId);
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
    return false;
  };

  const resetBoardDisplay = function () {
    document.querySelectorAll('.board').forEach((board) => {
      board.innerText = null;
    });
  };

  const getPlayerScoreId = (i) => document.getElementById(`score-${i}`);

  const updateScore = (player) => {
    let i;
    if (player.marker === 'x') {
      i = 1;
    } else {
      i = 2;
    }
    const previousScore = getPlayerScoreId(i);
    previousScore.innerHTML = player.score;
  };

  const updateMessageBoard = function (id) {
    if (id === 1) {
      messageBoard.innerHTML = 'Player One Wins';
    } if (id === 2) {
      messageBoard.innerHTML = 'Player Two Wins';
    } if (id === 3) {
      messageBoard.innerHTML = 'Its a Draw!';
    } if (id === 4) {
      messageBoard.innerHTML = '';
    }
  };

  const updateRoundDisplay = function (number) {
    let round = document.getElementById('round-number');
    round.innerHTML = number;
  };

  const deactivateBoardClick = () => {
    selectBoard.forEach((board) => {
      board.removeEventListener('click', clickHandler);
    });
  };

  const activateBoard = () => {
    selectBoard.forEach((board) => {
      board.addEventListener('click', clickHandler);
    });
  };
  startButton.onclick = activateBoard;
  return {
    activateBoard,
    deactivateBoardClick,
    changeInnerText,
    resetBoardDisplay,
    updateScore,
    updateMessageBoard,
    updateRoundDisplay,
  };
})();

const Gamelogic = (() => {
  const Gameboard = (() => {
    const board = [null, null, null,
      null, null, null,
      null, null, null];

    const getBoard = () => board;

    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) { board[i] = null; }
    };
    const checkEmptySpaces = (board) => {
      const emptySpace = [];
      board.forEach((element, index) => {
        if (element === null) {
          emptySpace.push(index);
        }
      });
      return emptySpace;
    };
    function setMarker(typeOfBoard, index, marker) {
      if (typeOfBoard[index] === null) {
        typeOfBoard[index] = marker;
        console.log(`Set ${marker} at ${typeOfBoard[index]}`);
        return true;
      }
      return false;
    }

    const undoMarker = function (board, index) {
      board[index] = null;
    };

    return {
      board, getBoard, resetBoard, setMarker, undoMarker, checkEmptySpaces,
    };
  })();

  const playerOne = Player('playerOne', 'x', 0, true);
  const playerTwo = Player('playerTwo', 'o', 0, false);

  const Gameplay = (() => {
    let round = 1;

    const incrementRound = () => round += 1;
    const incrementScore = (player) => player.score += 1;

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

    const isAi = function () {
      return true;
    };

    const bestMove = function () {
      const testerGameboard = Gameboard.board.map((x) => x);
      let fc = 0; // create a copy of the current board
      const choosenMove = minimax(testerGameboard, 0, playerTwo, -Infinity, Infinity);
      console.log(`The chosen move is ${choosenMove.index}`); // the minimax function will be self contained
      return choosenMove.index; // must be an index of the array
    };

    const minimax = function (board, depth, player, alpha, beta) {
      // Human player -> playerOne will always be maximizing, thus, worst case is -Infinity score.
      // Best case is +Infinity. The depth will reduce thee score because
      // it takes longer for him to reach the desired goal
      const availableMoves = Gameboard.checkEmptySpaces(board);
      const currentTerminalState = WinChecker.checkRoundEnds(board);
      if (currentTerminalState !== false) {
        if (currentTerminalState === playerTwo) {
          return { score: +100 - depth };
        }
        if (currentTerminalState === playerOne) {
          return { score: -100 + depth };
        }
        return { score: 0 };
      }

      let moves = [];
      console.log(moves);
      for (let i = 0; i < availableMoves.length; i++) {
        let move = {};
        move.index = availableMoves[i];
        Gameboard.setMarker(board, availableMoves[i], player.marker);
        if (player === playerTwo) {
          let result = minimax(board, depth + 1, playerOne, alpha, beta);
          move.score = result.score;
          if (move.score > alpha) {
            alpha = move.score;
          }
        }
        if (player === playerOne) {
          let result = minimax(board, depth + 1, playerTwo, alpha, beta);
          move.score = result.score;
          if (move.score < beta) {
            beta = move.score;
          }
        }
        Gameboard.undoMarker(board, availableMoves[i]);
        moves.push(move);

        if (alpha >= beta) {
          break;
        }
      }

      let bestMove;
      if (player === playerTwo) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        let bestScore = +Infinity;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      console.log(moves[bestMove]);
      console.log(depth);
      return moves[bestMove];
    };

    const playTurn = function (id) {
      let player = getCurrentPlayer();
      let makePlay;
      if (player === playerOne) {
        makePlay = DisplayController.changeInnerText(id, playerOne);
      } else if (player === playerTwo) {
        makePlay = DisplayController.changeInnerText(id, playerTwo);
      }
      if (makePlay !== false) {
        Gameboard.setMarker(Gameboard.board, makePlay, player.marker);
        console.log(Gameboard.board);
        return true;
      }
      if (makePlay === false) {
        console.log('returning false');
        return false;
      }
    };

    const newRound = function () {
      incrementRound();
      Gameboard.resetBoard();
      DisplayController.resetBoardDisplay();
      DisplayController.updateMessageBoard(4);
      resetPlayersTurn();
      DisplayController.activateBoard();
    };

    const newRoundWithTimeout = () => setTimeout(() => {
      newRound();
    }, 2000);

    const playRound = function (id) {
      const turnWasPlayed = playTurn(id);
      if (turnWasPlayed) {
        const roundEnd = WinChecker.checkRoundEnds(Gameboard.board);
        if (roundEnd === false) {
          switchPlayerTurn();
          if (getCurrentPlayer() === playerTwo && isAi() === true) {
            playRound(bestMove());
          } console.log('player not AI');
        } else if (roundEnd === true) {
          DisplayController.updateMessageBoard(3);
          DisplayController.updateRoundDisplay(round);
          DisplayController.deactivateBoardClick();
          newRoundWithTimeout();
        } else if (roundEnd === playerOne) {
          incrementScore(playerOne);
          DisplayController.updateMessageBoard(1);
          DisplayController.updateScore(playerOne);
          DisplayController.updateRoundDisplay(round);
          DisplayController.deactivateBoardClick();
          newRoundWithTimeout();
        } else if (roundEnd === playerTwo) {
          incrementScore(playerTwo);
          DisplayController.updateMessageBoard(2);
          DisplayController.updateScore(playerTwo);
          DisplayController.updateRoundDisplay(round);
          DisplayController.deactivateBoardClick();
          newRoundWithTimeout();
        }
      } else { console.log('playRound is invalid, playTurn returned false'); }
    };
    return { playRound, newRound };
  })();

  const WinChecker = (() => {
    // eslint-disable-next-line prefer-destructuring
    const playingBoard = Gameboard.board;

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

    const hasWon = (board) => {
      for (let i = 0; i <= 7; i++) {
        const winningCondition = winConditions[i];
        const a = board[winningCondition[0]];
        const b = board[winningCondition[1]];
        const c = board[winningCondition[2]];
        if (a === null || b === null || c === null) { continue; } else if (a === b && b === c && c === a) {
          console.log(`Winner is ${a}`);
          return a;
        } else continue;
      }
      return null;
    };

    const checkForWinner = function (board) {
      const hasWonChecker = hasWon(board);
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

    const checkForDraw = function (board) {
      if (board.includes(null)) {
        return false;
      }
      return true;
    };

    const checkRoundEnds = function (board) {
      if (checkForDraw(board) === true) {
        const winResult = checkForWinner(board);
        if (winResult === null) { return true; }
        return winResult;
      }
      if (checkForDraw(board) === false) {
        const winResult = checkForWinner(board);

        if (winResult != null) {
          console.log(`The Winner is ${winResult.name}`);
          console.log('Round Ends');
          return winResult;
        }
        return false;
      }
    };

    return {
      checkRoundEnds, checkForWinner,
    };
  })();

  return (Gameplay);
})();

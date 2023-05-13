const bestMove = function () {
  const testerGameboard = Gameboard.board.map((x) => x);
  let bestScore = -Infinity;

  let choosenMove;
  for (let i = 0; i < 9; i++) {
    if (Gameboard.setMarker(testerGameboard, i, playerTwo.marker) === true) {
      const score = minimax(testerGameboard, 0, false, +Infinity, -Infinity);
      Gameboard.undoMarker(testerGameboard, i);
      if (score > bestScore) {
        bestScore = score;
        choosenMove = i;
      }
    }
  }
  return choosenMove;
};

const minimax = function (board, depth, isMaximizing, alpha, beta) {
  // check for terminal end state
  const iterations = 0;
  const result = WinChecker.checkRoundEnds(board);
  console.log(`$Evaluating at ${depth} at ${iterations}`);
  if (result !== false) {
    if (result === playerOne) {
      const score = +10 - depth;
      console.log('Player One has Won');
      return score;
    }
    if (result === playerTwo) {
      const score = -10 + depth;
      console.log('Player Two has Won');
      return score;
    }
    const score = 0;
    return score;
  }

  if (isMaximizing === true) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (Gameboard.setMarker(board, i, playerTwo.marker) === true) {
        const score = minimax(board, depth + 1, false, alpha, beta);
        Gameboard.undoMarker(board, i);
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
    }
    return bestScore;
  }

  if (isMaximizing === false) {
    let bestScore = +Infinity;
    for (let i = 0; i < 9; i++) {
      if (Gameboard.setMarker(board, i, playerOne.marker) === true) {
        const score = minimax(board, depth + 1, true, alpha, beta);
        Gameboard.undoMarker(board, i);
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
    } return bestScore;
  }
};

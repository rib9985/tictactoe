let aiPrecision = 20;

const changeAiPrecision = function (difficulty) {
  if (difficulty === 'easy') {
    aiPrecision = 20;
  }
  if (difficulty === 'medium') {
    aiPrecision = 70;
  }
  if (difficulty === 'hard') {
    aiPrecision = 100;
  }
  return aiPrecision;
};

const isAi = function () {
  return true;
};

const bestMove = function () {
  const testerGameboard = Gameboard.board.map((x) => x);
  const aiChoice = Math.max(Math.floor(Math.random() * 99), aiPrecision);

  if (aiChoice > 50) {
    const choosenMove = minimax(testerGameboard, 0, playerTwo, -Infinity, Infinity);
    return choosenMove.index;
  }

  const availableMoves = Gameboard.checkEmptySpaces();
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
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

  const moves = [];
  console.log(moves);
  for (let i = 0; i < availableMoves.length; i++) {
    const move = {};
    move.index = availableMoves[i];
    Gameboard.setMarker(board, availableMoves[i], player.marker);
    if (player === playerTwo) {
      const result = minimax(board, depth + 1, playerOne, alpha, beta);
      move.score = result.score;
      if (move.score > alpha) {
        alpha = move.score;
      }
    }
    if (player === playerOne) {
      const result = minimax(board, depth + 1, playerTwo, alpha, beta);
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

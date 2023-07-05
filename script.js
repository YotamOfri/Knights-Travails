function knightMoves(start_pos, end_pos) {
  // giving each move the steps value
  const board = [];
  board[JSON.stringify(start_pos)] = {
    steps: 0,
    path: "",
  };
  const quque = [start_pos];
  //   list for the position that has been used
  const list = [start_pos];
  while (!(quque[0][0] === end_pos[0] && quque[0][1] === end_pos[1])) {
    // taking the first position from the quque and remoeing it
    let loc = quque.shift();
    // finding all the possiable moves
    let moves = LegalMoves(Moves(loc));
    moves.forEach((move) => {
      if (!JSON.stringify(list).includes(JSON.stringify(move))) {
        quque.push(move);
        list.push(move);
        // giving the value to the move
        board[JSON.stringify(move)] = {
          steps: board[JSON.stringify(loc)].steps + 1,
          path: board[JSON.stringify(loc)].path + `${loc} , `,
        };
      }
      if (move[0] === end_pos[0] && move[1] === end_pos[1]) return;
    });
  }
  return board[JSON.stringify(end_pos)];
}

// all possible moves leagal dosent matter
function Moves(pos) {
  return [
    [pos[0] + 1, pos[1] - 2],
    [pos[0] + 1, pos[1] + 2],
    [pos[0] - 1, pos[1] - 2],
    [pos[0] - 1, pos[1] + 2],
    [pos[0] + 2, pos[1] - 1],
    [pos[0] + 2, pos[1] + 1],
    [pos[0] - 2, pos[1] - 1],
    [pos[0] - 2, pos[1] + 1],
  ];
}
// filter all the moves by what is leagal
function LegalMoves(array) {
  return array.filter((move) => {
    return move[0] >= 1 && move[0] <= 8 && move[1] <= 8 && move[1] >= 1;
  });
}
console.log(knightMoves([1, 1], [8, 8]));

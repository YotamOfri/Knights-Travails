// all possible moves leagal dosent matter
export function LegalMoves(array) {
  return array.filter((move) => {
    return move[0] >= 1 && move[0] <= 8 && move[1] <= 8 && move[1] >= 1;
  });
}
// filter all the moves by what is leagal
export function Moves(pos) {
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

import { knightMoves } from "./KnightMoves";
import { StringToList } from "./StringToList";
const board = document.querySelector(".board");

// animation div creation
// Setting up the Knight Button and SVG
const knight_placement_button = document.querySelector("#knight-btn");
const knight = document.createElement("div");
knight.setAttribute("id", "knight");
// knight.offsetParent.dataset; to Remeber Knight Parent
// Knight Placement Button Function
knight_placement_button.addEventListener("click", () => {
  board.style.cursor = "pointer";
  if (document.querySelector(".animation"))
    document.querySelector(".animation").classList.remove("animation");
  knight_placement_button.classList.add("animation");
  // removes any eventlistiners form the board
  board.removeEventListener("click", borad_click_end);
  // add the EventListenter
  board.addEventListener("click", board_click_knight);
});
// function Create Knight
function board_click_knight(event) {
  knight_placement_button.classList.remove("animation");
  let pos_x = 8 - event.target.dataset.x;
  let pos_y = 8 - event.target.dataset.y;
  knight.style.right = pos_x * 12.5 + "%";
  knight.style.top = pos_y * 12.5 + "%";
  knight.style.transform = "";
  if (event.target.id === "end_pos") event.target.offsetParent.append(knight);
  else board.append(knight);
  board.removeEventListener("click", board_click_knight);
  board.style.cursor = "default";
}
// Setting up the End Position
const end_pos_canvs = document.createElement("div");
end_pos_canvs.setAttribute("id", "end_pos");
const end_pos_button = document.querySelector("#end-place-btn");
end_pos_button.addEventListener("click", () => {
  board.style.cursor = "pointer";
  if (document.querySelector(".animation"))
    document.querySelector(".animation").classList.remove("animation");
  end_pos_button.classList.add("animation");
  // removes any eventlistiners form the board
  board.removeEventListener("click", board_click_knight);
  // add the EventListenter
  board.addEventListener("click", borad_click_end);
});
// function End Pos
function borad_click_end(event) {
  end_pos_button.classList.remove("animation");
  if (event.target.id === "knight")
    event.target.offsetParent.append(end_pos_canvs);
  else event.target.append(end_pos_canvs);
  board.removeEventListener("click", borad_click_end);
  board.style.cursor = "default";
}
// setting up the Start Move button
const start_move_btn = document.querySelector("#start-move-btn");
start_move_btn.addEventListener("click", start_move_function);

// function start Move
function start_move_function() {
  if (document.querySelector(".animation"))
    document.querySelector(".animation").classList.remove("animation");
  if (document.querySelector("#knight") && document.querySelector("#end_pos")) {
    let start_square_x = 8 - Math.round(parseInt(knight.style.right) / 12.5);
    let start_square_y = 8 - Math.round(parseInt(knight.style.top) / 12.5);
    let end_square_x = end_pos_canvs.offsetParent.dataset.x;
    let end_square_y = end_pos_canvs.offsetParent.dataset.y;
    let result = knightMoves(
      [parseInt(start_square_x), parseInt(start_square_y)],
      [parseInt(end_square_x), parseInt(end_square_y)]
    );
    let starting_Place = document.querySelector(
      `[data-x="${start_square_x}"][data-y="${start_square_y}"]`
    );
    starting_Place.innerText = 0;
    starting_Place.classList.add("visited");
    let path = result.path + `[${end_square_x},${end_square_y}]`;
    let ListMoves = StringToList(path);
    let delay = 500;
    for (let i = 0; i < ListMoves.length; i++) {
      let step = document.querySelector(
        `[data-x="${ListMoves[i][0]}"][data-y="${ListMoves[i][1]}"]`
      );
      setTimeout(() => {
        StartMoveAnimation_X(ListMoves[i][0]);
        setTimeout(() => {
          step.innerText = i + 1;
          step.classList.add("visited");
          StartMoveAnimation_Y(ListMoves[i][1]);
        }, 200 * 2);
      }, delay * 2);
      delay += 500;
    }
    // Knight Arrives to the end Point
    setTimeout(() => {
      board.querySelector("#knight").style.transform = "scale(0.5)";
      setTimeout(() => {
        knight.style.transform += "rotateY(180deg)";
        knight.style.right = parseInt(knight.style.right) - 2 + "%";
        document.querySelector(
          `[data-x="${end_square_x}"][data-y="${end_square_y}"]`
        ).style.paddingRight = "20px";
      }, 500);
    }, delay * 2);
  }
}
// start Move Animation
function StartMoveAnimation_Y(pos_y) {
  knight.style.top = (8 - pos_y) * 12.5 + "%";
}
function StartMoveAnimation_X(pos_x) {
  knight.style.right = (8 - pos_x) * 12.5 + "%";
}
// Clear Board Setup
const clear_board_btn = document.querySelector("#clear-board-btn");
clear_board_btn.addEventListener("click", ClearBoard);

// function Clear board
function ClearBoard() {
  if (document.querySelector(".animation"))
    document.querySelector(".animation").classList.remove("animation");
  if (board.querySelector("#knight")) board.querySelector("#knight").remove();
  if (board.querySelector("#end_pos")) board.querySelector("#end_pos").remove();
  // looping over each square
  document.querySelectorAll(".square").forEach((square) => {
    square.classList.remove("visited");
    square.innerText = "";
    square.style.paddingRight = "0px";
  });
}

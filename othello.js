const board = document.getElementById("board");
let turn = "black";
let gameEnded = false;

const BLACK = "black";
const WHITE = "white";

const initialBoard = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "white", "black", "", "", ""],
  ["", "", "", "black", "white", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

initializeBoard();

function initializeBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = i;
      square.dataset.col = j;
      square.addEventListener("click", handleClick);

      if (initialBoard[i][j] === BLACK) {
        placePiece(square, BLACK);
      } else if (initialBoard[i][j] === WHITE) {
        placePiece(square, WHITE);
      }

      board.appendChild(square);
    }
  }
}

function handleClick(event) {
  if (gameEnded) {
    return;
  }

  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  if (isValidMove(row, col)) {
    placePiece(square, turn);
    flipPieces(row, col);
    switchTurn();

    if (!hasValidMove()) {
      switchTurn();
      if (!hasValidMove()) {
        endGame();
      }
    }
  }
}

function isValidMove(row, col) {
  if (initialBoard[row][col] !== "") {
    return false;
  }

  let isValid = false;

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) {
        continue;
      }

      let r = row + dRow;
      let c = col + dCol;
      let hasOpponentPieceBetween = false;

      while (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const piece = initialBoard[r][c];

        if (piece === "") {
          break;
        } else if (piece === turn) {
          if (hasOpponentPieceBetween) {
            isValid = true;
          }
          break;
        } else {
          hasOpponentPieceBetween = true;
        }

        r += dRow;
        c += dCol;
      }
    }
  }

  return isValid;
}

function placePiece(square, color) {
  const piece = document.createElement("div");
  piece.classList.add(color);
  square.appendChild(piece);
  initialBoard[parseInt(square.dataset.row)][parseInt(square.dataset.col)] = color;
}

function flipPieces(row, col) {
  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) {
        continue;
      }

      let r = row

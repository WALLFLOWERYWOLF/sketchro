const container = document.querySelector(".container");
const clearbtn = document.querySelector(".clear");
let isMouseDown;
let isMouseOver;

function createGrid(gridSize) {
  container.innerHTML = "";
  let numberOfCells = gridSize * gridSize;
  let cellWidthHeight = 800 / gridSize;
  for (let i = 1; i <= numberOfCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = cellWidthHeight + "px";
    cell.style.height = cellWidthHeight + "px";
    container.appendChild(cell);

    cell.addEventListener("mouseover", () => {
      isMouseOver = true;
      handleCellColor(cell);
    });

    cell.addEventListener("mousedown", () => {
      isMouseDown = true;
      handleCellColor(cell);
    });

    cell.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
  }
}

function handleCellColor(cell) {
  if (isMouseDown && isMouseOver) {
    cell.style.backgroundColor = "black";
  }
}

function clear() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "white";
  });
}

createGrid(16);

const btn = document.querySelector(".adjust-grid-size");
btn.addEventListener("click", () => {
  let gridSize = prompt("Enter a number from 1 to 100");
  gridSize = Number(gridSize);
  if (!isNaN(gridSize) && gridSize >= 1 && gridSize <= 100) {
    createGrid(gridSize);
  } else {
    alert(
      "Not a valid number! Please try again and enter a valid number from 1 to 100."
    );
  }
});

clearbtn.addEventListener("click", () => {
  clear();
});

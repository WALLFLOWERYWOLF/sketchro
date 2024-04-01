const container = document.querySelector(".container");
const adjustGridSize = document.querySelector(".adjust-grid-size");
const clearButton = document.querySelector(".clear");
const modeSelectorButtons = document.querySelectorAll(".modeSelectorButton");
const gridBorders = document.querySelector(".grid-borders");
let isMouseDown;
let isMouseOver;
let modeSelected;
let sketchColor = "rgba(0, 0, 0, 1)";
let backgroundColor = "rgba(255, 255, 255, 1)";
let previousMode;

function createGrid(gridSize) {
  container.innerHTML = "";
  let numberOfCells = gridSize * gridSize;
  let cellWidthHeight = 750 / gridSize;
  for (let i = 1; i <= numberOfCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.increment = 0;
    cell.style.width = cellWidthHeight + "px";
    cell.style.height = cellWidthHeight + "px";
    cell.style.backgroundColor = backgroundColor;
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
    if (modeSelected === "rainbow") {
      cell.style.backgroundColor = rainbow();
    } else if (modeSelected === "gradual") {
      cell.style.backgroundColor = gradual(cell);
    } else {
      cell.style.backgroundColor = sketchColor;
    }
  }
}

function modeSelector(modeSelected) {
  switch (modeSelected) {
    case "eraser":
      eraser();
      break;
    case "color":
      sketchColorSelector();
      break;
    case "background-color":
      backgroundColorSelector();
      break;
  }
}

function eraser(cell) {
  sketchColor = backgroundColor;
  cell.dataset.increment = 0;
} 

function clear() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.backgroundColor = backgroundColor;
    cell.dataset.increment = 0;
  });
}

function backgroundColorSelector () {
  let newBackgroundColor = prompt("Enter a Background Color");
  if (newBackgroundColor !== "" && newBackgroundColor !== null) {
    backgroundColor = newBackgroundColor;
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.style.backgroundColor = backgroundColor;
  });
  } else {
    modeSelected = previousMode;
  }
}

function sketchColorSelector () {
  let newSketchColor = prompt("Enter a Sketch Color");
  if (newSketchColor !== "" && newSketchColor !== null) {
    sketchColor = newSketchColor;
  } else {
    modeSelected = previousMode;
  }
}

function gradual(cell) {
  let currentColor = cell.style.backgroundColor;
  let incrementValue = parseInt(cell.dataset.increment);
  let rgbValues = currentColor.slice(4, -1).split(",").map(rgbValue => parseInt(rgbValue));
  if (rgbValues.join("") !== "000") {
    let r = rgbValues[0];
    let g = rgbValues[1];
    let b = rgbValues[2];
    let nr = Math.round(Math.max(r - (r / (10 - incrementValue)), 0));
    let ng = Math.round(Math.max(g - (g / (10 - incrementValue)), 0));
    let nb = Math.round(Math.max(b - (b / (10 - incrementValue)), 0));
    incrementValue++;
    cell.dataset.increment = incrementValue;
    if (incrementValue === 10) cell.dataset.increment = 0;
    return `rgb(${nr}, ${ng}, ${nb})`;
  }
}

function rainbow() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

createGrid(16);

adjustGridSize.addEventListener("click", () => {
  let gridSize = prompt("Enter a number from 1 to 100");
  gridSize = Number(gridSize);
  if (!isNaN(gridSize) && gridSize >= 1 && gridSize <= 100) {
    createGrid(gridSize);
  } else {
    alert("Please try again and enter a valid number from 1 to 100.");
  }
});

clearButton.addEventListener("click", () => {
  clear();
});

modeSelectorButtons.forEach((modeSelectorButton) => {
  modeSelectorButton.addEventListener("click", (e) => {
    previousMode = modeSelected;
    modeSelected = e.target.classList[0];
    modeSelector(modeSelected)
  })
});

gridBorders.addEventListener("click", () => {
  previousMode = modeSelected;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    let border = cell.style.border;
    if(border === "") {
      cell.style.border = "1px solid black";
    } else {
      cell.style.border = "";
    }
  })
  modeSelected = previousMode;
});

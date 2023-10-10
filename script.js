// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set grid dimensions
    const heightGrid = 500;
    const widthGrid = 500;

    const grid = document.querySelector(".grid");
    grid.style.height = `${heightGrid}px`;
    grid.style.width = `${widthGrid}px`;

    // Create initial grid
    let userInput = 16 // Initial size
    const colorBoxesDef = "#ffffff"; // white
    let boxes = createGridBoxes(
        heightGrid, widthGrid, userInput, grid, colorBoxesDef);

    // Initialize color button list
    const pen = document.querySelector(".pen");
    const btnList = pen.querySelectorAll("button");

    // Button for random color
    const btnRandom = document.querySelector("#random");
    btnRandom.addEventListener("click", () => {
        boxes.forEach(box => {
            removeGridListeners(box);
            box.addEventListener("mouseover", colorRandom);
        });

        highlight(btnRandom, btnList);
    });

    // Button for shader
    const btnShade = document.querySelector("#shade");
    btnShade.addEventListener("click", () => {
        boxes.forEach(box => {
            removeGridListeners(box);
            box.addEventListener("mouseover", colorShade);
        });

        highlight(btnShade, btnList);
    });

    // Button for default color
    const btnDef = document.querySelector("#default");
    btnDef.addEventListener("click", () => {
        boxes.forEach(box => {
            removeGridListeners(box);
            box.addEventListener("mouseover", colorDefault);
        });

        highlight(btnDef, btnList);
    });

    // Highlight default button initially
    highlight(btnDef, btnList);

    // Button to recreate grid
    const btnSize = document.querySelector("#btnSize");
    btnSize.addEventListener("click", () => {
        do {
            userInput = +prompt("New grid size: 1 ~ 25 ?", "");
        }
        while (userInput < 0 || userInput > 25);
        
        if (userInput === 0) {
            return false;
        };

        grid.replaceChildren();
        boxes = createGridBoxes(
            heightGrid, widthGrid, userInput, grid, colorBoxesDef);
        
        highlight(btnDef, btnList);
    });

    // Button to clear grid
    const btnClear = document.querySelector("#btnClear");
    btnClear.addEventListener("click", () => {
        boxes.forEach(box => {
            box.style.backgroundColor = colorBoxesDef;
        });
    });
});

// Function to create grid boxes
function createGridBoxes(
    heightGrid, widthGrid, gridSize, grid, colorBoxesDef) {
    let heightBox = heightGrid / gridSize;
    let widthBox = widthGrid / gridSize;

    let gridSquare = gridSize ** 2;

    for (let i = 0; i < gridSquare; i++) {
        const box = document.createElement("div");
        box.classList = "gridBox";
        grid.append(box);
    };

    const boxes = document.querySelectorAll(".gridBox");
    boxes.forEach(box => {
        box.style.height = `${heightBox}px`;
        box.style.width = `${widthBox}px`;
        box.style.backgroundColor = colorBoxesDef;
        box.addEventListener("mouseover", colorDefault);
    });

    return boxes;
};

// Function for default color
function colorDefault(e) {
    e.target.style.backgroundColor = "#d3d3d3"; // lightgrey
};

// Function for random color
function colorRandom(e) {
    let color = Math.floor(Math.random()*16777215).toString(16);
    e.target.style.backgroundColor = "#" + color;
};

// Function for shading
function colorShade(e) {
    let target = e.target;
    let rgbString = target.style.backgroundColor;
    let rgbArray = rgbString.slice(4, -1).split(", ");

    let red = +rgbArray[0];
    let green = +rgbArray[1];
    let blue = +rgbArray[2];

    let redNew = Math.round(red * 0.9);
    let greenNew = Math.round(green * 0.9);
    let blueNew = Math.round(blue * 0.9);

    let rgbNew = "rgb(" + redNew + ", " + greenNew + ", " + blueNew + ")";
    target.style.backgroundColor = rgbNew;
};

// Function to remove grid boxes' event listeners
function removeGridListeners(e) {
    e.removeEventListener("mouseover", colorRandom);
    e.removeEventListener("mouseover", colorShade);
    e.removeEventListener("mouseover", colorDefault);
};

// Function to highlight current mode
function highlight(btn, btnList) {
    let len = btnList.length;
    for (let i = 0; i < len; i++) {
        if (btn === btnList[i]) {
            btnList[i].classList.add("bold");
        } else {
            btnList[i].classList.remove("bold");
        };
    };
};

// Run after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    
    // Set grid size
    let gridSize = 16;
    let gridSquare = gridSize ** 2;

    // Create grid
    const grid = document.querySelector(".grid");

    let gridPixels = (gridSize * 30); // *Check box size in CSS
    grid.style.height = `${gridPixels}px`;
    grid.style.width = `${gridPixels}px`;

    for (let i = 0; i < gridSquare; i++) {
        const box = document.createElement("div");
        box.classList = "gridBox";
        grid.append(box);
    };

    // Change box colour when hover
    const boxes = grid.querySelectorAll(".gridBox");
    boxes.forEach((box) => {
        box.addEventListener("mouseover", () => {
            box.style.backgroundColor = "lightgrey";
        });
    });

    // Clear grid
    const btnClear = document.querySelector("#clear");
    btnClear.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.style.backgroundColor = "white";
        });
    });
});

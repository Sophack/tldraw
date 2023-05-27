const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

//initial size:
let size = 10;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  const x = e.offsetX;
  const y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    //the offset method works with MouseEvent (above) on coordinates before and after mouseclick
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    //function will pass both parameters
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  //added fillstyle to correspond
  ctx.fillStyle = color;
  ctx.fill();
}

//function to delete drawing
drawLine(100, 100, 200, 200);

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  //add new point and creat a line to that point from the last specified point
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.stroke();
}

increaseBtn.addEventListener("click", () => {
  //when we increase we want:
  size += 5;
  //reset if its too big
  if (size > 50) {
    size = 50;
  }
  updateSize();
});

decreaseBtn.addEventListener("click", () => {
  //when size decreases we want
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSize();
});

//add function so color changes to corresponding user choice
colorEl.addEventListener("change", (e) => {
  color = e.target.value;
});

//below button clears everything 
//not an undo button

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSize() {
  sizeEl.innerText = size;
}

//below commented is no longer needed because x & y default values have been assigned
// drawCircle(50, 50);

//optional "counterclockwise" = False is default, and indicates clockwise, while true indicates counter-clockwise
//need a function that keeps drawing
//below function is called every frame (draw circle always)

// function draw () {
//     ctx.clearRect(0,0, canvas.width, canvas.height);
//     //changed below to x & y values with ++ to increase by 1
//     //moves the circle from left to right
//     drawCircle(x,y);

//     requestAnimationFrame(draw);
// }

// draw();

//also need the rectangle to cling to the box
//sources https://github.com/bradtraversy/vanillawebprojects/tree/master/breakout-game
//initially the variables had number values assigned and then the default values were added after let size

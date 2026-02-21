let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let spritesheetimg;

// Animation variables
let currentFrame = 0;
let totalFrames = 8; // number of frames in sprite sheet

// Frame rate control
let lastTime = 0;
let frameTimer = 0;
let animationFPS = 10; // change this to test
let frameInterval = 1000 / animationFPS;

window.onload = function () {

    board = document.getElementById("Spriteaimation");
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext("2d");

    spritesheetimg = new Image();
    spritesheetimg.src = "Assets/WalkingSpriteSheet.jpg";

    spritesheetimg.onload = function () {
        requestAnimationFrame(update);
    };
};

function update(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    frameTimer += deltaTime;

    context.clearRect(0, 0, boardWidth, boardHeight);

    if (frameTimer >= frameInterval) {
        currentFrame++;
        if (currentFrame >= totalFrames) {
            currentFrame = 0;
        }
        frameTimer = 0;
    }

    draw();

    requestAnimationFrame(update);
}

function draw() {

    let scale = boardWidth / spritesheetimg.width;
    let newWidth = boardWidth;
    let newHeight = spritesheetimg.height * scale;

    // Draw full sprite sheet scaled
    context.drawImage(spritesheetimg, 0, 0, newWidth, newHeight);

    // White border around full image
    context.strokeStyle = "white";
    context.lineWidth = 3;
    context.strokeRect(0, 0, newWidth, newHeight);

    // Green frame selector
    let frameWidth = newWidth / totalFrames;

    context.strokeStyle = "#3adc58";
    context.lineWidth = 3;

    context.strokeRect(
        currentFrame * frameWidth,
        0,
        frameWidth,
        newHeight
    );
    //sx,sy,sw,sh,dx,dy,dw,dh
    let frameWidth2 = spritesheetimg.width/totalFrames;
    let frameHeight2 = spritesheetimg.height;
    context.drawImage(
        spritesheetimg,
        currentFrame * frameWidth2,
        0,
        frameWidth2,
        frameHeight2,
        150,
        150,
        frameWidth2,
        frameHeight2
    );
}
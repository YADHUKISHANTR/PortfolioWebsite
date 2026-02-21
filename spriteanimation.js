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



//section 2

let board2;
let context2;
let ground2;


window.onload = function () {

    onloadDraw()
    onloadDraw2()
};

function update(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    frameTimer += deltaTime;

    context.clearRect(0, 0, boardWidth, boardHeight);
    context2.clearRect(0,0,boardWidth,boardHeight)

    if (frameTimer >= frameInterval) {
        currentFrame++;
        if (currentFrame >= totalFrames) {
            currentFrame = 0;
        }
        frameTimer = 0;
    }

    draw();
    Draw2();
    requestAnimationFrame(update);
}

function onloadDraw()
{
    board = document.getElementById("Spriteaimation");
    board.width = boardWidth;
    board.height = boardHeight;

    context = board.getContext("2d");

    spritesheetimg = new Image();
    spritesheetimg.src = "assets/WalkingSpriteSheet.jpg";

    spritesheetimg.onload = function () {
        requestAnimationFrame(update);
    };

    let slider = document.getElementById("fpsSlider");
    let output = document.getElementById("fpsValue");

    slider.oninput = function () {
      output.textContent = this.value;
      frameInterval = 1000 / this.value;
};
}

function draw() {

    let scale = boardWidth / spritesheetimg.width;
    let newWidth = boardWidth;
    let newHeight = spritesheetimg.height * scale;

    // Draw full sprite sheet scaled
    context.drawImage(spritesheetimg, 0, 0, newWidth, newHeight);

    // White border around full image
    context.strokeStyle = "#ffffff";
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



function onloadDraw2()
{
    board = document.getElementById("BounceCanv");
    board.width = boardWidth;
    board.height = boardHeight;

    context2 = board.getContext("2d");
    context2.fillStyle = "#373737";   //color
    context2.fillRect(0, boardHeight - 100, boardWidth, 100);


    context2.beginPath();
    context2.arc(250, 100, 15, 0, Math.PI * 2); 
    context2.fillStyle = "#373737";
    context2.fill();
}

let gravity = 0.4;
let velY = 0;
let position = 100; 
let bouncebtn = document.getElementById("BounceBtn");


function Draw2()
{

    context2.fillStyle = "#373737";   //color
    context2.fillRect(0, boardHeight - 100, boardWidth, 100);


    velY += gravity;
    position += velY;
    
    if(position >= (boardHeight - 100) - 15)
    {
        position = boardHeight - 100 - 15
        velY = -velY;
    }
    context2.beginPath();
    context2.arc(250, position, 15, 0, Math.PI * 2); 
    context2.fillStyle = "#373737";
    context2.fill();

}


bouncebtn.addEventListener("click",function(){
    position = 100;
    velY = 0;
    console.log("Button clicked!");
});


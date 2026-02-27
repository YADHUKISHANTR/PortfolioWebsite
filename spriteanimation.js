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

let primaryColor = "#373737"

//section 2

let board2;
let context2;
let ground2;



window.onload = function () {

    onloadDraw();
    onloadDraw2();
    onloadDraw3();
    onloadDraw4();
    onloadDraw5();
    onloadDraw6();
    onloadDraw7();
    onloadDraw8();
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
    Draw3();
    Draw6();
    draw7();
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

//section 2
let gravity = 0.4;
let velY = 0;
let position = 100; 
let bouncebtn = document.getElementById("BounceBtn");

function onloadDraw2()
{
    board2 = document.getElementById("BounceCanv");
    board2.width = boardWidth;
    board2.height = boardHeight;

    context2 = board2.getContext("2d");
    context2.fillStyle = primaryColor;   //color
    context2.fillRect(0, boardHeight - 100, boardWidth, 100);

    context2.beginPath();
    context2.arc(250, 100, 15, 0, Math.PI * 2); 
    context2.fillStyle = primaryColor;
    context2.fill();
}



function Draw2()
{

    //context2.fillStyle = primaryColor;   //color
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
    context2.fillStyle = primaryColor;
    context2.fill();

}


bouncebtn.addEventListener("click",function(){
    position = 100;
    velY = 0;
    //console.log("Button clicked!");
});


//section 3
let board3;
let context3;
let velocityX3 = 0;
let velocityY3 = 0;
let positionX3 = 250;
let positionY3 = 250;
let circlesize = 15;
function onloadDraw3()
{
    board3 = document.getElementById("EulerCanv");
    board3.width = boardWidth;
    board3.height = boardHeight;

    context3 = board3.getContext("2d");


    context3.beginPath();
    context3.arc(250, 250, circlesize, 0, Math.PI * 2); 
    context3.fillStyle = primaryColor;
    context3.fill();
}

function Draw3()
{


    positionX3 += velocityX3;
    positionY3 += velocityY3;

    if(positionX3 <= - circlesize)
    {
        positionX3 = boardWidth + circlesize;
    }
    else if(positionX3 >= boardWidth + circlesize)
    {
        positionX3 = -circlesize;

    }

    if(positionY3 <= -circlesize)
    {
        positionY3 = boardHeight + circlesize;
    }
    else if(positionY3 >= boardHeight + circlesize)
    {
        positionY3 = -circlesize;
    }

    context3.clearRect(0, 0, boardWidth, boardHeight);


    context3.beginPath();
    context3.arc(positionX3, positionY3, circlesize, 0, Math.PI * 2); 
    context3.fillStyle = primaryColor;
    context3.fill();
}

let Xplus = document.getElementById("Xplus"); 
let Xminus = document.getElementById("Xminus"); 
let Yplus = document.getElementById("Yplus"); 
let Yminus = document.getElementById("Yminus"); 

Xplus.addEventListener("click",function(){
  
    if(velocityX3 >= 15) return;
    velocityX3++;
    document.getElementById("xVelText").textContent = velocityX3;
});
Xminus.addEventListener("click",function(){
   if(velocityX3 <= -15) return;
    velocityX3--;
    document.getElementById("xVelText").textContent = velocityX3;
});
Yplus.addEventListener("click",function(){
    if(velocityY3 >= 15) return;
    velocityY3++;
    document.getElementById("yVelText").textContent = velocityY3;
});
Yminus.addEventListener("click",function(){
    if(velocityY3 <= -15) return;
    velocityY3--;
    document.getElementById("yVelText").textContent = velocityY3;
});



//section 4 verletrope
let board4;
let context4;
let ankhorpoint = {
    x: 250,
    y: 50,

}
let points = [];
let acceleration = 1500;
let FixD = 18;
for(let i = 0; i < 20; i++)
{
   points.push({
        x: 250,
        y: 50 + FixD * i, 
        oldx: 250,
        oldy: 50 + FixD * i
    });
}
function onloadDraw4()
{
    board4 = document.getElementById("RopeCanv");
    board4.width = boardWidth;
    board4.height = boardHeight;

    context4 = board4.getContext("2d");

    context4.beginPath();
    context4.arc(ankhorpoint.x, ankhorpoint.y, circlesize/3, 0, Math.PI * 2); 
    context4.fillStyle = "#ffffff";
    context4.fill();

    for(let i = 0; i < points.length; i++)
    {
        context4.beginPath();
        context4.arc(points[i].x, points[i].y, circlesize/3, 0, Math.PI * 2); 
        context4.fillStyle = primaryColor;
        context4.fill();
    }
    let slider = document.getElementById("AnkhorSlider");
    let output = document.getElementById("Xpos4");

    slider.oninput = function () {
      output.textContent = this.value;
      if(this.value >= 10 && this.value <= 490)
      ankhorpoint.x = this.value;
      
    };
    requestAnimationFrame(update4);
}

let lastTime4 = 0;

function update4(currentTime) {
    context4.clearRect(0, 0, boardWidth, boardHeight);

    let deltaTime = (currentTime - lastTime4) / 1000;
    lastTime4 = currentTime;

    // Move anchor
    //ankhorpoint.x += 1;

    // Verlet (predict positions)
    for(let i = 0; i < points.length; i++)
    {
        verletSimulation(points[i], deltaTime);
        addForceX(points[i],deltaTime);
    }

    // Solve constraints (correct positions)
    for(let j = 0; j < 15; j++) 
    {
        for(let i = 0; i < points.length - 1; i++)
        {
            fixDistance(points[i], points[i+1], FixD, false);
        }

        fixDistance(ankhorpoint, points[0], FixD, true);
    }

    // Draw anchor
    context4.beginPath();
    context4.arc(ankhorpoint.x, ankhorpoint.y, circlesize/2, 0, Math.PI * 2); 
    context4.fillStyle = "#ffffff";
    context4.fill();

    // Draw rope points
    for(let i = 0; i < points.length; i++)
    {
        context4.beginPath();
        context4.arc(points[i].x, points[i].y, circlesize/3, 0, Math.PI * 2); 
        context4.fillStyle = primaryColor;
        context4.fill();
    }

    requestAnimationFrame(update4);
}



function verletSimulation(points,deltaTime)
{
   
    let velocity = points.y - points.oldy;
    points.oldy = points.y;
    points.y += velocity + (acceleration * deltaTime * deltaTime);
}

function addForceX(points,deltaTime)
{
    if(points.x == ankhorpoint.x) return;

   if(points.x > ankhorpoint.x)
   {
        let velocity = points.x - points.oldx;
        points.oldx = points.x;
        points.x += velocity + (-0.005 * deltaTime * deltaTime);
   }
   else{
        let velocity = points.x - points.oldx;
        points.oldx = points.x;
        points.x += velocity + (0.005 * deltaTime * deltaTime);
   }
    
}

function fixDistance(p1, p2, restLength,isAnkhor)
{
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    let difference = restLength - distance;
    
    if(isAnkhor)
        percent = difference / distance;     
    else
        percent = difference / distance / 2;


    let offsetX = dx * percent;
    let offsetY = dy * percent;

    if(!isAnkhor)
    {
        p1.x -= offsetX;
        p1.y -= offsetY;
    }


    p2.x += offsetX;
    p2.y += offsetY;
}


//section 5
let board5;
let context5;
let lastTime5;

let cols = 25;
let rows = 20;

let clothpoints = [];

for (let i = 0; i < rows * cols; i++) {
    clothpoints.push({
        x: 0,
        y: 0,
        oldx: 0,
        oldy: 0
    });
}

// Grid setup
let pointIndex = 0;
let startX = 32;
let startY = 50;
let spacing = 18;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

        let x = startX + j * spacing;
        let y = startY + i * spacing;

        clothpoints[pointIndex].x = x;
        clothpoints[pointIndex].y = y;
        clothpoints[pointIndex].oldx = x;
        clothpoints[pointIndex].oldy = y;

        pointIndex++;
    }
}

function onloadDraw5() {

    board5 = document.getElementById("clothCanv");
    board5.width = boardWidth;
    board5.height = boardHeight;
    context5 = board5.getContext("2d");

    // Slider for index 0 movement
    let slider = document.getElementById("Ankhor1SliderX5");
    let output = document.getElementById("AnkhorX5");
    let slider2 = document.getElementById("Ankhor2SliderX5");
    let output2 = document.getElementById("AnkhorX52");
    let slider3 = document.getElementById("Ankhor3SliderX5");
    let output3 = document.getElementById("AnkhorX53");

    slider.oninput = function () {

        output.textContent = this.value;

        if(this.value >= 10 && this.value <= 490)
        {
             clothpoints[0].x = Number(this.value);
            clothpoints[0].oldx = Number(this.value);
        }
       
    };

    slider2.oninput = function () {

        output2.textContent = this.value;

        if(this.value >= 10 && this.value <= 490)
        {
            clothpoints[12].x = Number(this.value);
            clothpoints[12].oldx = Number(this.value);
        }
       
    };

    slider3.oninput = function () {

        output3.textContent = this.value;

        if(this.value >= 10 && this.value <= 490)
        {
             clothpoints[24].x = Number(this.value);
            clothpoints[24].oldx = Number(this.value);
        }
       
    };

    lastTime5 = performance.now();
    requestAnimationFrame(update5);
}

function update5(currentTime5) {

    context5.clearRect(0, 0, boardWidth, boardHeight);

    let deltaTime = (currentTime5 - lastTime5) / 1000;
    lastTime5 = currentTime5;

    // Physics (skip only 0 so slider controls it)
    for (let i = 4; i < clothpoints.length; i++) {
        if(i === 0 ||i == 12 || i === 24) continue;
        verletSimulation(clothpoints[i], deltaTime);
    }

    //////////// Constraint iterations
    for (let k = 0; k < 6; k++) {

        // Horizontal
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols - 1; j++) {

                let left = i * cols + j;
                let right = left + 1;

                let leftAnchor = (left === 0 || left === 12 || left === 24);
                let rightAnchor = (right === 0 || right === 12 || right === 24);

                if (leftAnchor) {
                    fixDistance(clothpoints[left], clothpoints[right], FixD, true);
                }
                else if (rightAnchor) {
                    fixDistance(clothpoints[right], clothpoints[left], FixD, true);
                }
                else {
                    fixDistance(clothpoints[left], clothpoints[right], FixD, false);
                }
            }
        }

        // Vertical
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < cols; j++) {

                let top = i * cols + j;
                let bottom = top + cols;

                let topAnchor = (top === 0 || top === 12 || top === 24);
                let bottomAnchor = (bottom === 0 || bottom === 12 || bottom === 24);

                if (topAnchor) {
                    fixDistance(clothpoints[top], clothpoints[bottom], FixD, true);
                }
                else if (bottomAnchor) {
                    fixDistance(clothpoints[bottom], clothpoints[top], FixD, true);
                }
                else {
                    fixDistance(clothpoints[top], clothpoints[bottom], FixD, false);
                }
            }
        }
    }

    ////////////////////////////
    // Draw lines
    context5.strokeStyle = primaryColor;
    context5.lineWidth = 1;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols - 1; j++) {

            let left = i * cols + j;
            let right = left + 1;

            context5.beginPath();
            context5.moveTo(clothpoints[left].x, clothpoints[left].y);
            context5.lineTo(clothpoints[right].x, clothpoints[right].y);
            context5.stroke();
        }
    }

    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols; j++) {

            let top = i * cols + j;
            let bottom = top + cols;

            context5.beginPath();
            context5.moveTo(clothpoints[top].x, clothpoints[top].y);
            context5.lineTo(clothpoints[bottom].x, clothpoints[bottom].y);
            context5.stroke();
        }
    }

    // Draw points
    for (let i = 0; i < clothpoints.length; i++) {

        context5.beginPath();

        if(i === 0 || i === 24 || i === 12)
        {
            context5.fillStyle = "white";
            context5.arc(
            clothpoints[i].x,
            clothpoints[i].y,
            circlesize / 3,
            0,
            Math.PI * 2
        );

        }
        else{
            context5.fillStyle = primaryColor;
            context5.arc(
            clothpoints[i].x,
            clothpoints[i].y,
            circlesize / 6,
            0,
            Math.PI * 2
        );

        }
        

        context5.fill();
    }

    requestAnimationFrame(update5);
}


//section 6
let board6;
let context6;

let gunImg;
let bulletImg;

let bulletlst = [];
let shootbtn = document.getElementById("shootbtn")
let bulletspeed = 10;

let spawnpoint = {
    x:145,
    y:225
};

function onloadDraw6()
{ 
   
    board6 = document.getElementById("ObjectCanv");
    board6.width = boardWidth;
    board6.height = boardHeight;
    context6 = board6.getContext("2d")

    gunImg = new Image();
    bulletImg = new Image();

    gunImg.src = "assets/gun2.png";
    bulletImg.src = "assets/bullet.png";

    gunImg.onload = function () {
    context6.drawImage(gunImg, 50, 200, 100, 100);
    context6.drawImage(bulletImg,spawnpoint.x, spawnpoint.y, 24, 15)

    context6.globalCompositeOperation = "source-atop";

    // Apply color
    context6.fillStyle = primaryColor;
    context6.fillRect(0, 0, 500, 500);

    // Reset blending mode
    context6.globalCompositeOperation = "source-over";
    };

    
}

shootbtn.addEventListener("click",function(){
    bulletlst.push(spawnpoint.x);
});


function Draw6()
{
    context6.clearRect(0,0,boardWidth,boardHeight);
   
    context6.drawImage(gunImg, 50, 200, 100, 100);
    BulletDraw();

    context6.globalCompositeOperation = "source-atop";

    context6.fillStyle = primaryColor;
    context6.fillRect(0, 0, 500, 500);

    context6.globalCompositeOperation = "source-over";

}

function BulletDraw()
{
    if(bulletlst.length == 0) return;

    for(let i = bulletlst.length - 1; i >= 0; i--)
    {
        
         bulletlst[i]+= bulletspeed;
        if (bulletlst[i] > boardWidth) {
            bulletlst.splice(i, 1);
            continue;
        }
        context6.drawImage(bulletImg,bulletlst[i], spawnpoint.y, 24, 15);
       
    }
    
}


///Section 7

let board7;
let context7;

let ParallaxImg = [];
let parallaxSize = {
    x: 576,
    y: 324
}
let parallaxSpeed = [0.05,0.2,0.4,0.7,1.0];
let parallaxPostion = [0,0,0,0,0];
let parallaxPostion2 = [parallaxSize.x,parallaxSize.x,parallaxSize.x,parallaxSize.x,parallaxSize.x];
function onloadDraw7()
{
    

    board7 = document.getElementById("PrallaxCanv");
    board7.width = boardWidth;
    board7.height = parallaxSize.y;
    context7 = board7.getContext("2d");
    for(let i = 0; i < 5; i++)
    {
        ParallaxImg.push(new Image);
    }

    ParallaxImg[0].src = "bgimages/1.png";
    ParallaxImg[1].src = "bgimages/2.png";
    ParallaxImg[2].src = "bgimages/3.png";
    ParallaxImg[3].src = "bgimages/4.png";
    ParallaxImg[4].src = "bgimages/5.png";


    for(let i = 0; i < 5; i++)
    {
        ParallaxImg[i].onload = function(){
        
            context7.drawImage(ParallaxImg[i], 0, 0, parallaxSize.x, parallaxSize.y);

        }
    }
   
    
   
}

function draw7()
{
    context7.clearRect(0,0,parallaxSize.x,parallaxSize.y);

    for(let i = 0; i < 5; i++)
    {
        if(parallaxPostion[i] <= -parallaxSize.x)
        {
            parallaxPostion[i] = parallaxSize.x;
        }
        if(parallaxPostion2[i] <= -parallaxSize.x)
        {
            parallaxPostion2[i] = parallaxSize.x;
        }

        context7.drawImage(ParallaxImg[i], parallaxPostion[i], 0, parallaxSize.x, parallaxSize.y);
        context7.drawImage(ParallaxImg[i], parallaxPostion2[i], 0, parallaxSize.x, parallaxSize.y);

        parallaxPostion[i] -= parallaxSpeed[i];
        parallaxPostion2[i] -= parallaxSpeed[i];

      
       
    }

}

//section 8

let board8;
let context8;
const FPS = 60;
let dz = 2;
let angle = 0;
let  changbtn = document.getElementById("ChangeWireframe");
let showl = document.getElementById("showline");
let showp = document.getElementById("showpoint");


let chanum = 1;

//cube
const vsCube = [
    {x : 0.5, y: 0.5, z: 0.25},   //0
    {x : -0.5, y: 0.5, z: 0.25},  //1
    {x : -0.5, y: -0.5, z: 0.25}, //2
    {x : 0.5, y: -0.5, z: 0.25},  //3

    {x : 0.5, y: 0.5, z: -0.5},   //4
    {x : -0.5, y: 0.5, z: -0.5},  //5
    {x : -0.5, y: -0.5, z: -0.5}, //6
    {x : 0.5, y: -0.5, z: -0.5},  //7
];

const fsCube = [
    [0,1,2,3],
    [4,5,6,7],
    [0,4],
    [1,5],
    [2,6],
    [3,7],
];

//Pyramid
const vsPiramid = [
    {x:-0.4, y:-0.4, z:0.4},  //0
    {x: 0.4, y:-0.4, z:0.4},  //1
    {x: 0.4, y:-0.4, z:-0.4}, //2
    {x:-0.4, y:-0.4, z:-0.4}, //3
    {x: 0.0, y: 0.5,  z:0.0}, //4 apex
];

const fsPiramid = [
    [0,1],[1,2],[2,3],[3,0], // base
    [0,4],[1,4],[2,4],[3,4], // sides
];

const vsCuboid = [
    {x:-0.5, y:0.3,  z:0.3},   //0
    {x: 0.5, y:0.3,  z:0.3},   //1
    {x: 0.5, y:-0.3, z:0.3},   //2
    {x:-0.5, y:-0.3, z:0.3},   //3
    {x:-0.5, y:0.3,  z:-0.3},  //4
    {x: 0.5, y:0.3,  z:-0.3},  //5
    {x: 0.5, y:-0.3, z:-0.3},  //6
    {x:-0.5, y:-0.3, z:-0.3},  //7
];

const fsCuboid = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
];

const vsDiomond = [
    {x:0,   y:0.6, z:0},   //0 top
    {x:0,   y:-0.6,z:0},   //1 bottom
    {x:0.6, y:0,   z:0},   //2 right
    {x:-0.6,y:0,   z:0},   //3 left
    {x:0,   y:0,   z:0.6}, //4 front
    {x:0,   y:0,   z:-0.6},//5 back
];

const fsDiomond = [
    [0,2],[0,3],[0,4],[0,5],
    [1,2],[1,3],[1,4],[1,5],
    [2,4],[4,3],[3,5],[5,2],
];

const vsTetrahedron = [
    {x:0,    y:0.6,  z:0},     //0 top
    {x:-0.5, y:-0.4, z:0.4},   //1
    {x:0.5,  y:-0.4, z:0.4},   //2
    {x:0,    y:-0.4, z:-0.5},  //3
];

const fsTetrahedron = [
    [0,1],[0,2],[0,3],
    [1,2],[2,3],[3,1],
];

const vsYB = [
       /* ===== HEART OUTLINE (SMOOTH) ===== */

        {x:0.0,  y:-0.85, z:0},   //0 bottom tip

        // left side
        {x:-0.25,y:-0.65,z:0},    //1
        {x:-0.55,y:-0.35,z:0},    //2
        {x:-0.75,y:0.05, z:0},    //3
        {x:-0.65,y:0.45, z:0},    //4
        {x:-0.35,y:0.70, z:0},    //5

        // top center dip
        {x:0.0,  y:0.55, z:0},    //6

        // right side (mirror)
        {x:0.35,y:0.70, z:0},     //7
        {x:0.65,y:0.45, z:0},     //8
        {x:0.75,y:0.05, z:0},     //9
        {x:0.55,y:-0.35,z:0},     //10
        {x:0.25,y:-0.65,z:0},     //11


        /* ===== LETTER D (CENTERED PROPERLY) ===== */

        {x:-0.20,y:0.35,z:0},     //12 spine top
        {x:-0.20,y:-0.35,z:0},    //13 spine bottom

        {x:0.15,y:0.25,z:0},      //14 curve top
        {x:0.25,y:0.0, z:0},      //15 mid curve
        {x:0.15,y:-0.25,z:0},     //16 curve bottom

            
];

const fsYB = [

   /* ===== HEART OUTLINE ===== */
[0,1],
[1,2],
[2,3],
[3,4],
[4,5],
[5,6],
[6,7],
[7,8],
[8,9],
[9,10],
[10,11],
[11,0],

/* ===== LETTER D ===== */
[12,13],      // spine
[12,14],
[14,15],
[15,16],
[16,13],


];


let vs = vsCube;
let fs = fsCube;
let showpoint = false;
let showline = true;

changbtn.addEventListener("click",function(){
    
    chanum++;
    if(chanum === 7)
    {
        chanum = 1;
    }
    switch(chanum)
    {
        case 1: vs = vsCube;
                fs = fsCube;
        break;
        case 2: vs = vsPiramid;
                fs = fsPiramid;
        break;
        case 3: vs = vsCuboid;
                fs = fsCuboid;
        break;
        case 4: vs = vsDiomond;
                fs = fsDiomond;
        break;
        case 5: vs = vsTetrahedron;
                fs = fsTetrahedron;
        break;
        case 6: vs = vsYB;
                fs = fsYB;
        break;
        
    }
    

});

showl.addEventListener("click",function(){
    showline = !showline;
    if(showline)
        showl.style.backgroundColor = "#4bdd3a";
    else
        showl.style.backgroundColor = "#dd3a3a"
});

showp.addEventListener("click",function(){
    showpoint = !showpoint;
    if(showpoint)
        showp.style.backgroundColor = "#4bdd3a"
    else
        showp.style.backgroundColor = "#dd3a3a"

    
});
function onloadDraw8()
{

    
    showp.style.backgroundColor = "#dd3a3a";

    board8 = document.getElementById("3dCanv");
    board8.width = boardWidth;
    board8.height = boardHeight;
   
    context8 = board8.getContext("2d");

    setTimeout(update8, 1000/FPS);
}

function translate_z({x,y,z},dz)
{
    return {x, y, z: z+dz};
}

function rotate_xz({x,y,z},angle)
{
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return{
        x: x*c-z*s,
        y,
        z:x*s+z*c,
    };
}
function rotate_xy({x,y,z}, angle)
{
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c - y*s,
        y: x*s + y*c,
        z: z
    };
}

function update8()
{
    const dt = 0.5/FPS;
    //dz += 1 * dt;
    angle += Math.PI*dt;
    context8.clearRect(0,0,board8.width,board8.height);
    
    context8.font = "20px Arial";
    context8.fillStyle = "white";

    
    switch(chanum)
    {
        case 1:context8.fillText("Cube",20,30);
        break;
        case 2: context8.fillText("Pyramid",20,30);
        break;
        case 3:context8.fillText("Cuboid",20,30);
        break;
        case 4: context8.fillText("Diomond",20,30);
        break;
        case 5: context8.fillText("Tetrahedron",20,30);
        break;
        case 6:context8.fillText("Heart",20,30);
        break;
        
    }

    if(showpoint)
    {
        for(const v of vs)
        {
            if(chanum == 2 || chanum == 5 || chanum == 6)
            {
                point(screen(project3d(translate_z(rotate_xz(v,angle),dz))));
            }
            else
            {
                point(screen(project3d(translate_z(rotate_xy(rotate_xz(v,angle),angle),dz))));
            }
            
        }
    }
   
    if(showline)
    {

        for(const f of fs)
        {
            for(let i = 0; i < f.length; ++i)
            {
                if(chanum == 2 || chanum == 5 || chanum == 6)
                {
                    const a = vs[f[i]]; 
                    const b = vs[f[(i+1)%f.length]]; 
                    line8(screen(project3d(translate_z(rotate_xz(a,angle),dz))), screen(project3d(translate_z(rotate_xz(b,angle),dz))));
                }
                else{
                    const a = vs[f[i]];
                const b = vs[f[(i+1)%f.length]];

                const ta = translate_z(
                                rotate_xy(
                                    rotate_xz(a, angle),
                                angle),
                            dz);

                const tb = translate_z(
                                rotate_xy(
                                    rotate_xz(b, angle),
                                angle),
                            dz);

                line8(
                    screen(project3d(ta)),
                    screen(project3d(tb))
                );
            }
                
            }
        }
    }

    setTimeout(update8, 1000/FPS);

}

function point({x,y})
{
    const s = 15;
    /*context8.fillStyle = "white";
    context8.fillRect(x - s/2,y-s/2,s,s);*/

    context8.beginPath();
    context8.arc(x, y, circlesize / 2, 0, Math.PI * 2);
    context8.fillStyle = "white";
    context8.fill();
}

function line8(p1,p2)
{
    context8.lineWidth = 3;
    context8.strokeStyle = primaryColor;
    context8.beginPath();
    context8.moveTo(p1.x,p1.y);
    context8.lineTo(p2.x,p2.y);
    context8.stroke();
}
function screen(p)
{
   return{
    x: (p.x + 1)/2*board8.width,
    y: (1 - (p.y + 1)/2)* board8.height,
   }
}

function project3d({x,y,z})
{
    const f = 1.5; // focal length
    return {
        x: (f * x) / z,
        y: (f * y) / z,
    };
}
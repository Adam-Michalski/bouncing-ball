var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 20;
var color = "#0000ff";
var g = 0.3; // acceleration due to gravity
var x = 50; // initial horizontal position
var y = 50; // initial vertical position
var vx = 10; // initial horizontal speed
var vy = -10; // initial vertical speed

window.onload = init;

function init() {
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    setInterval(onEachStep, 1000/60); // 60 fps
};

function onEachStep() {
    vy += g; // gravity increases the vertical speed
    x += vx; // horizontal speed increases horizontal position
    y += vy; // vertical speed increases vertical position

    if (y > canvas.height - radius){ // if ball hits the ground
        y = canvas.height - radius; // reposition it at the ground
        vy *= -0.8; // then reverse and reduce its vertical speed
        vx *= 0.99; // reduce horizontal speed due to friction
    }

    if (x > canvas.width - radius || x < radius){ // if ball goes beyond canvas
        vx = -vx;
    }

    drawBall();
};

function drawBall() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, true);
    context.closePath();
    context.fill();
};
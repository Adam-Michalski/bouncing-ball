import {Ball} from './objects/Ball';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let context = canvas.getContext('2d');

let ballCount:number= 9;
let balls:Ball[] = [];

const g = 981; // acceleration due to gravity (pixels/second squared)
let t0:number; // time at last call
let dt:number; // elapsed time between calls

window.onload = () => init();

var init = () => {
    for (var i = ballCount - 1; i >= 0; i--) {
        balls.push(new Ball({ 
            radius: getRandomInt(3, 30), 
            x:getRandomInt(0, 900), 
            y:getRandomInt(0, 900), 
            vx:getRandomInt(-1000, 2000), 
            vy:getRandomInt(-1000, 600),
            color: `rgb(${getRandomInt(0,255)}, ${getRandomInt(0,255)}, ${getRandomInt(0,255)})`
        }));
    }

    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    t0 = new Date().getTime(); // initialize value of t0  
    animFrame();
};

var animFrame = () => {
    requestAnimationFrame(animFrame);
    onEachStep();
}

var onEachStep = () => {
    var t1 = new Date().getTime(); // current time in milliseconds
    dt = 0.001 * (t1 - t0); // time elapsed in seconds since last call
    t0 = t1; // reset t0

    context.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.vy += (g * dt); // gravity increases the vertical speed
        ball.x += ball.vx * dt; // horizontal speed increases horizontal position
        ball.y += ball.vy * dt; // vertical speed increases vertical position

        if (ball.y > canvas.height - ball.radius){ // if ball hits the ground
            ball.y = canvas.height - ball.radius; // reposition it at the ground
            ball.vy *= -0.8; // then reverse and reduce its vertical speed
            ball.vx *= 0.99; // reduce horizontal speed due to friction
        }

        if (ball.y < ball.radius){ // if ball hits the ceiling
            ball.y = ball.radius;
            ball.vy *= -0.8; // then reverse and reduce its vertical speed
            ball.vx *= 0.99; // reduce horizontal speed due to friction
        }

        if (ball.x > canvas.width - ball.radius) {
            ball.x  = canvas.width - ball.radius;
            ball.vx *= -0.8; // reverse horizontal direction and velocity
        }

        if (ball.x < ball.radius){ // if ball goes beyond canvas
            ball.x = ball.radius;
            ball.vx *= -0.8; // reverse horizontal direction and velocity        
        }

        ball.draw(context);
    })
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
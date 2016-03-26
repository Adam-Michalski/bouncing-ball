import {Ball} from './objects/Ball';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let context = canvas.getContext('2d');

let g = 25; // acceleration due to gravity
let ball:Ball;
let t0; // time at last call
let dt; // elapsed time between calls

window.onload = () => init();

var init = () => {
    ball = new Ball({ radius: 20, x:50, y:50, vx:2050, vy:-300 });

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
    dt = 0.001 * (t1-t0); // time elapsed in seconds since last call
    t0 = t1; // reset t0

    ball.vy += g; // gravity increases the vertical speed
    ball.x += ball.vx * dt; // horizontal speed increases horizontal position
    ball.y += ball.vy * dt; // vertical speed increases vertical position

    if (ball.y > canvas.height - ball.radius){ // if ball hits the ground
        ball.y = canvas.height - ball.radius; // reposition it at the ground
        ball.vy *= -0.8; // then reverse and reduce its vertical speed
        ball.vx *= 0.99; // reduce horizontal speed due to friction
    }

    if (ball.x > canvas.width - ball.radius || ball.x < ball.radius){ // if ball goes beyond canvas
        ball.vx *= -0.8; // reverse horizontal direction and velocity
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
};
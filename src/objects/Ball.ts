export class Ball {

    public radius:number = 0;
    public color:string = 'blue';
    public x:number = 0;
    public y:number = 0;
    public vx:number = 0;
    public vy:number = 0;

    constructor(options) {
        Object.assign(this, options);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill(); 
    }

}
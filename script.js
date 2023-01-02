/** @type {HTMLCanvasElement} */ // say to VsCode it is canvas project to optimize advice context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.cli = 500;
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect(); // to get boundaries from the canvas
// console.log(canvasPosition);

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;  // real size of the sprite
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2; // Size in the canvas (aspect ratio)
        this.height = this.spriteHeight/2;
        this.image = new Image();
        this.image.src = boom.png;
        this.frame = 0; // init frame step
    }
    update() {
        this.frame++;
    }
    draw() {
        ctx.drawImage(this.image, this.spriteWidth + this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
}

window.addEventListener('click', function(e) {
    console.log(e);
    ctx.fillStyle = 'red';
    const rectWidth = 50;
    const rectHeight = 50;
    ctx.fillRect(e.x - canvasPosition.left - rectWidth/2, e.y - canvasPosition.top - rectHeight/2, rectWidth, rectHeight);
    //canvasPositon to fit the first point from rect and rectWidth/2 to adjust on the rect center.
})

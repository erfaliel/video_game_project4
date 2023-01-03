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
        this.spriteWidth = 200;  // real size of the sprite
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7; // Size in the canvas (aspect ratio)
        this.height = this.spriteHeight * 0.7;
        this.x = x; 
        this.y = y;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0; // init frame step
        this.timer = 0; // init timer
        this.angle = Math.random() * 6.2; // 0 to near 360°
        this.sound = new Audio();
        this.sound.src = 'boom.wav'; // https://opengameart.org/content/magic-sfx-sample
    }
    update() {
        if (this.frame === 0) this.sound.play();  // to launch boom sound
        this.timer++;
        if (this.timer % 10 === 0) {  // to reduce frame speed
            this.frame++;
        }
    }
    draw() {
        ctx.save();  // save context before to operate translate
        ctx.translate(this.x, this.y);  //set origin at this.x an this.y 
        ctx.rotate(this.angle); // rotate canva from this.angle
        ctx.drawImage(
            this.image,                         // image object
            this.spriteWidth * this.frame,      // start point: x (first frame = 0)
            0,                                  // start point: y
            this.spriteWidth,                   // width from the frame (width of one frame)
            this.spriteHeight,                  // idem for height
            0 - this.width/2,                   // Sprite pos.X on canva (in order mouse point to the center of the sprite we need to /2)
            0 - this.height/2,                  // Sprite pos.Y on canva
            this.width,                         // sprit size input in the canva
            this.height);                       // idem
        ctx.restore();

    }
}

// Events listner
window.addEventListener('click', function(e) {
    createAnimation(e);
});
// window.addEventListener('mousemove', function(e) {
//     createAnimation(e);
// });
function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
    console.log(explosions);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) { // check if all frame has done
            explosions.splice(i, 1);   // deleteindex i
            //i--;
        }
    }
    requestAnimationFrame(animate);
}

animate();
// reprednre 2h44'26''
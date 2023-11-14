class ThrowAbleObjects extends MoveableObject{

    img_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    
    constructor(x,y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.img_rotation);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(150,150);
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.applyGravitiy();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
           this.playAnimation(this.img_rotation);
          }, 800 / 10);
        }
    }

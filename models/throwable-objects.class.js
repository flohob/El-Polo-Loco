class ThrowAbleObjects extends MoveableObject{

    /**
     * boolean for splash animation in the lower code
     */
    bottleSplash = false;

    /**
     * different img sources 
     */
    img_rotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    img_splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * 
     * @param {number} x // x position on the game for the object
     * @param {number} y  // y postion for the objects in the game
     * constructor which loadImages and define various variables like x y width height and calls the animate and throw function
     */
    
    constructor(x,y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.img_rotation);
        this.loadImages(this.img_splash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(150,150);
        this.animate();
    }

/**
 * for throwing bottles in the game , calls the applyGravity Function for the Bottle to look like its thrown
 */
    throw() {
        this.speedY = 30;
        this.applyGravitiy();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * plays diffrerent Animation for different cases
     */

    animate() {
        setInterval(() => {
            if (this.bottleSplash === true) {
                this.playAnimation(this.img_splash);
                console.log(this.bottleSplash);
                this.bottleSplash = false;
            } else {
                this.playAnimation(this.img_rotation);
            }
        }, 800 / 10);
    }
    
}
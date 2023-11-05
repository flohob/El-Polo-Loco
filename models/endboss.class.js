class Endboss extends MoveableObject {

    height = 300;
    width = 200;
    y = 360;
    x = 70;

    imgWalking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',

    ];

    constructor(imgWalking) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.y = 120;
        this.x = 720; 
        this.loadImages(this.imgWalking);
        this.animate();
    }

    animate() {
        

        setInterval(() => {
            let i = this.currentImage % this.imgWalking.length;
            let path = this.imgWalking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
          }, 2000 / 10);
        }
    }

  

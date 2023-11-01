class Cloud extends MoveableObject {
    height = 250;
    width = 400;


        constructor() {
            super().loadImage("img/5_background/layers/4_clouds/2.png");
            this.y = 30;;
            this.x = 0 + Math.random() * 400; 
            this.animate();


    }

    animate() {
       this.moveLeft();
    }

    moveLeft() {
        setInterval( () => {
            this.x -= 0.15; 
        },1000 / 120);  
    } 
    
}

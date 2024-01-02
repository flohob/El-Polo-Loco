class Bottles extends MoveableObject {
  
    width = 60;
    height = 60;
    speedy = 0;
   
    IMAGES_BOTTLE =
    [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];
  
    constructor() {
      super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
      this.x = 400 + Math.random() * 2200;
      this.y = 20 + Math.random() * 280;
    }

    
  }
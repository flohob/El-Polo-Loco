class chicken extends MoveableObject {
  y = 340;
  height = 90;
  width = 90;
  energy = 5;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ]; 

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); 

    this.x = 250 + Math.random() * 500; 
    this.speed = 0.15 + Math.random() * 0.35; 
    this.loadImages(this.IMAGES_WALKING); 
    this.loadImages(this.IMAGES_DEAD);
    this.animate(); 
  }

  animate() {
    setInterval(() => { 
    this.moveLeft(); 
  },1000/60);

    setInterval(() => { 
      if(this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
      this.playAnimation(this.IMAGES_WALKING); 
    }}, 2000 / 10);
  }
}

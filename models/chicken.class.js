class chicken extends MoveableObject {
  y = 330;
  height = 90;
  width = 60;
  energy = 5;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ]; 

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
];

sound_chicken = new Audio('https://cdn.freesound.org/previews/316/316920_4921277-lq.mp3')

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

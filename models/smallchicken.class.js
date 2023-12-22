class SmallChicken extends MoveableObject {
    /**
     * different variables for the small chicken
     */
  height = 90;
  width = 90;
  y = 330;
  energy = 20;

  /**
   * Image Sources
   */

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];


  sound_chicken = new Audio(
    "https://cdn.freesound.org/previews/316/316920_4921277-lq.mp3"
  );

  /**
   * constructor , rndom x and speed variables for showing the chicken in every game in a other startposition
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.x = 200 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * animates the chickens in different cases
   */

  animate() {

    setInterval(() => { 
      this.moveLeft(); 
    },1000/60);
    
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 10);
  }
}


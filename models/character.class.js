class Character extends MoveableObject {
  height = 300;
  width = 125;
  y = 30;
  speed = 5;
  energy = 100;
  offset = {
    top: 130,
    bottom: 5,
    left: 20,
    right: 35
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ]; 

  world; 
  walking_sound = new Audio("audio/518585_10201334-lq.mp3");
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); 
    this.loadImages(this.IMAGES_WALKING); 
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravitiy();
  }

  showEndscreenCharacter() {
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('canvas').classList.add('hidden');
  } 

  showEndscreenCharacterFullscreen() {
    document.getElementById('end-screen-fullscreen').classList.remove('hidden');
    document.getElementById('canvas').classList.add('hidden');
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
  
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.walking_sound.play();
        this.moveRight();
      }
  
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }
  
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
  
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
  
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
  
        if (window.innerWidth > 720) {
          // Rufe die Funktion mit Klammern auf
          this.showEndscreenCharacterFullscreen();
        } else {
          this.showEndscreenCharacter();
        }
  
        this.walking_sound.muted = true;
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      }
  
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 50);
  }
}  
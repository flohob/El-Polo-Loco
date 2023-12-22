class Character extends MoveableObject {
  height = 300;
  width = 120;
  y = 10;
  speed = 15;
  energy = 100;
  offset = {
    top: 0,
    left: 10,
    right: 10,
    bottom: -10,
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
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IDLE_ANIMATION = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/518585_10201334-lq.mp3");
  lastKeyPressTime = 0;
  idleTimeout = 5000; // Timer für IDLE Animation

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IDLE_ANIMATION);
    this.applyGravitiy();
  }

  /**
   * checks they Keypress
   */

  handleKeyPress() {
    this.lastKeyPressTime = Date.now();
  }

  /**
   * 
   * checks if the IDLE is ready to play
   */
  isIdle() {
    return Date.now() - this.lastKeyPressTime >= this.idleTimeout;
  }

  /**
   * shows Endscreen
   */

  showEndscreenCharacter() {
    document.getElementById("end-screen").classList.remove("hidden");
    document.getElementById("canvas").classList.add("hidden");
  }

  /**
   * shows Endscreen in Fullscreen
   */

  showEndscreenCharacterFullscreen() {
    document.getElementById("end-screen-fullscreen").classList.remove("hidden");
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("mobile-container").classList.add("hidden");
  }

  /**
   * calls Function which explained lower
   */
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      this.handleKeyboardInput();
      this.handleMovement();
      this.updateCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimations();
    }, 50);
  }

  /**
   * handles the Actions for the keypresses
   */
  handleKeyboardInput() {
    if (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.D
    ) {
      if (this.isIdle()) {
        this.playAnimation(this.IDLE_ANIMATION);
      }
    } else {
      this.handleKeyPress();
    }
  }

  /**
   * handles Actions for Movements
   */

  handleMovement() {
    if (this.world.keyboard.RIGHT) {
      this.handleRightKeyPress();
    }

    if (this.world.keyboard.LEFT) {
      this.handleLeftKeyPress();
    }

    if (this.world.keyboard.SPACE) {
      this.handleSpaceKeyPress();
    }
  }

  /**
   * Function for moving right
   */

  handleRightKeyPress() {
    if (this.x < this.world.level.level_end_x) {
      this.walking_sound.play();
      this.moveRight();
    }
  }

  /**
   * Function for moving left
   */

  handleLeftKeyPress() {
    if (this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
    }
  }

  /**
   * Funion for press Space
   */

  handleSpaceKeyPress() {
    if (!this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Function for different kind of animations and in which cases they should be shown
   */

  updateAnimations() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playWalkingAnimation();
    }

    if (this.isDead()) {
      this.playDeadAnimation();
    } else if (this.isHurt()) {
      this.playHurtAnimation();
    }

    if (this.isAboveGround()) {
      this.playJumpingAnimation();
    }
  }

  /**
   * updates the View for the Player
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * plays ILDE Animation
   */

  playIdleAnimation() {
    this.playAnimation(this.IDLE_ANIMATION);
  }

  /**
   * Walking Animation
   */

  playWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Jumping Animation
   */

  playJumpingAnimation() {
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
   * Dead Animation
   */

  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    if (document.getElementById("canvas").classList.contains("fullscreen")) {
      this.showEndscreenCharacterFullscreen();
    } else {
      this.showEndscreenCharacter();
    }
  }

  /**
   * Dead Animation
   */

  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }
}

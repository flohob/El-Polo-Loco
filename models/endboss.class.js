class Endboss extends MoveableObject {
  height = 300;
  width = 200;
  y = 360;
  x = 70;
  energy = 15;
  world; // Instance for the Class World

  /**
   * for Collision detection
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Image Sources
   */

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Checks if the Charater is near the Endboss
   */
  hasFirstContact = false;

  /**
   * constructor, loadImages, changes values of x y speed
   */

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png");
    this.y = 120;
    this.x = 2500;
    this.speed = 1.5 + Math.random() * 2;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Function if the Endboss is hit
   */
  bottleHitBoss() {
    this.world.bossHitted = true;
    setTimeout(() => {
      this.world.bossHitted = false;
    }, 3000);
    if (this.energy > 0) {
      this.energy -= 5;
    }
  }

  /**
   * Function for display the Endscreen
   */
  showEndScreen() {
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("end-screen-won").classList.remove("hidden");
    document
      .getElementById("end-screen-fullscreen-won")
      .classList.add("hidden");
  }

  /**
   * Function for showing the Endscreen in Fullscreen Mode
   */

  showEndScreenFullscreen() {
    document.getElementById("canvas").classList.add("hidden");
    document
      .getElementById("end-screen-fullscreen-won")
      .classList.remove("hidden");
    document.getElementById("mobile-container").classList.add("hidden");
  }

  /**
   * checks if the is on a certain x position and turns the boolean hasFirstContact into true
   */

  hadFirstContact() {
    // Überprüfe, ob der Endboss bereits den Punkt erreicht hat
    if (!this.hasFirstContact && this.world.character.x > 1550) {
      this.hasFirstContact = true;
    }
    if (this.hasFirstContact) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * plays animation in certain cases
   */
  animate() {
    setInterval(() => {
      this.hadFirstContact();
      if (this.world.bossHitted === true) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);

          setTimeout(() => {
            if (
              document.getElementById("canvas").classList.contains("fullscreen")
            ) {
              this.showEndScreenFullscreen();
            } else {
              this.showEndScreen();
            }
            this.world.character.walking_sound.muted = true;
          }, 2000);
        }
      }
    }, 200);
  }
}

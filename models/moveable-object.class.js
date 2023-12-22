class MoveableObject extends DrawableObject {
  //different variables for objects which has the ability to move
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  /**
   * offsets ist used for the detection of collisions 
   */
  offset = { 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};
  

 
/**
 * implement Gravity for Jumping an throwing 
 */
  applyGravitiy() { 
    setInterval(() => {
      if(this.isAboveGround() || this.speedY >= 20) { 
      this.y -= this.speedY; 
      this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * 
   * @returns checks if the object is above a certain y position
   */

  isAboveGround() {
    if(this instanceof ThrowAbleObjects) {
      return true;
    } else {
    return this.y < 130;
  }};


  /**
   * Function for moving to right
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

/**
 * Function for moving left
 */
  moveLeft() {
      this.x -= this.speed;
      this.otherDirection = false;
  }

  /**
   * 
   * @param {images} images 
   * Plays an Animation with different sources where the image is used as a variable for the img-src 
   */

  playAnimation(images){
    let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
  }

  /**
   * function for objects to jump
   */

  jump() {
    this.speedY = 30;
  }


/**
 * 
 * @param {object} obj 
 * @returns Function for checking if objects are colliding
 */
  isColliding(obj) {
    return this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
           this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
           this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
           this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom 
}

/**
 * Function for the case if an object gets hit
 */
hit() {
  this.energy -= 20;
  if (this.energy < 0) {
    this.energy = 0
  } else {
this.lastHit = new Date().getTime();
  }
}

/**
 * 
 * @returns function for an object who is hit
 */

isHurt() {
let timepassed = new Date().getTime() - this.lastHit;
timepassed = timepassed / 1000;
return timepassed < 1;
}


/**
 * object has no energy anymore - is dead
 */
isDead() {
  return this.energy == 0;
}


}




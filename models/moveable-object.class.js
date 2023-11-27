class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offset = { 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};
  

 

  applyGravitiy() { 
    setInterval(() => {
      if(this.isAboveGround() || this.speedY >= 20) { // If Abfrage wenn der Spieler über dem Boden ist und die Variable this.speed größer gleich 20 ist
      this.y -= this.speedY; 
      this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if(this instanceof ThrowAbleObjects) {
      return true;
    } else {
    return this.y < 130; // Gibt an ob das Objekt über den Boden ist, wird in der Apply Gravitiy benutzt
  }};

  
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }


  moveLeft() {
      this.x -= this.speed;
      this.otherDirection = false;
  }

  playAnimation(images){
    let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(obj) {
    return this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
           this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
           this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
           this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom  // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
}


hit() {
  this.energy -= 20;
  if (this.energy < 0) {
    this.energy = 0
  } else {
this.lastHit = new Date().getTime();
  }
}

isHurt() {
let timepassed = new Date().getTime() - this.lastHit;
timepassed = timepassed / 1000;
return timepassed < 1;
}

isDead() {
  return this.energy == 0;
}


}




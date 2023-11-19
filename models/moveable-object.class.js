class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  

  // Erstellung einer neuen Klasse Moveable Objects (Alle Objekte die sich bewegen sollen)

  applyGravitiy() { // Funktion zur Implementierung der Erdanziehung für das Springen
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


  drawFrame(ctx) {
    if(this instanceof Character || this instanceof chicken || this instanceof SmallChicken || this instanceof Endboss ) { 

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }}

  
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
    this.speedY = 20;
  }

    isColliding (mo) {
      return  this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y+ mo.height;
}

hit() {
  this.energy -= 5;
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




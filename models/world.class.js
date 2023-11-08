class World {
  character = new Character();

  level = level1;

  ctx;
  StatusBarHealth = new StatusBarHealth();
  tabasco = new Tabasco();
  coin = new StatusCoin();

  canvas;
  keyboard;
  camera_x = 0;
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if(this.character.isColliding(enemy))
        this.character.hit();
        this.StatusBarHealth.setPercentage(this.character.energy);
        console.log(this.character.energy)

      });
    }, 200);
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.cloud);
    
    this.addtoMap(this.character);
    this.addObjectstoMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0);
    this.addtoMap(this.StatusBarHealth);
    this.addtoMap(this.tabasco);
    this.addtoMap(this.coin);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectstoMap(objects) {
    objects.forEach((o) => {
      this.addtoMap(o);
    });
  }

  addtoMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageback(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageback(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

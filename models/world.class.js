class World {
  
  character = new Character();
  level = level1; 
  endboss = level1.enemies[6];
  ctx;
  enemy = this.level.enemies;
  bossHitted = false;
  StatusBarHealth = new StatusBarHealth(); 
  tabasco = new Tabasco(); 
  coinbar = new StatusCoin(); 
  canvas; 
  keyboard; 
  throwAbleObjects = [];
  coin = this.level.coins;
  bottle = this.level.bottles;
  camera_x = 0; 
  lostGame = false;

  
  constructor(canvas, keyboard) {
    
    this.ctx = canvas.getContext("2d"); 
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.setWorldEnemies();
    this.run();
  }

 
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionswithThings();
      this.checkCollisionswithTabasco();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.tabasco.collectedBottles > 0) {
        let bottle = new ThrowAbleObjects(this.character.x + 100, this.character.y + 100);
        this.throwAbleObjects.push(bottle);
        this.tabasco.collectedBottles--;
  
        
        this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
      }
    }
  }

  checkCollisionswithTabasco() {
    this.throwAbleObjects.forEach((bottle) => {
      if (bottle.isColliding(this.endboss)) {
        this.endboss.bottleHitBoss();
      }
    });
  }

  

  checkCollisionswithThings() {
    
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
            this.collectCoin(coin);
        }
    });

    
    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
            this.collectBottle(bottle);
        }
    });
}

collectCoin(coin) {
    this.coinbar.collectedCoins++;
    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
        this.level.coins.splice(index, 1);
    }
    this.coinbar.setAmountOfCoins(this.coinbar.collectedCoins);
}

collectBottle(bottle) {
  this.tabasco.collectedBottles++;
    
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
        this.level.bottles.splice(index, 1);
    }
  this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isHurt() && !enemy.isDead() && this.character.isColliding(enemy)) {
        if (this.character.isAboveGround()) {
          this.handleAirCollision(enemy);
        } else {
          this.character.hit();
          this.StatusBarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }
  

  handleAirCollision(enemy) {
    this.character.jump();
    enemy.energy = 0;
    setTimeout(() => {
        const index = this.level.enemies.indexOf(enemy);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
    }, 1000); 
}

  
  setWorld() {
    this.character.world = this;
  }


  setWorldEnemies() {
    this.enemy.forEach((enemy) => {
      enemy.world = this;
    }
    )
  }

  
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    
    this.ctx.translate(this.camera_x, 0);

   
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.throwAbleObjects);
    this.addObjectstoMap(this.coin);
    this.addObjectstoMap(this.bottle);
    
  

    this.addObjectstoMap(this.level.cloud);

   
    this.addtoMap(this.character);

    
    this.addObjectstoMap(this.level.enemies);
    

    
    this.ctx.translate(-this.camera_x, 0);

    
    this.addtoMap(this.StatusBarHealth);
    this.addtoMap(this.tabasco);
    this.addtoMap(this.coinbar);
    

    
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
      endGame();
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

class World {
  character = new Character(); // creats a instance for using data in the character class
  level = level1; // instance for level1
  endboss = level1.enemies[6]; //instanes for the endboss
  ctx;
  enemy = level1.enemies; // all enemys 
  StatusBarHealth = new StatusBarHealth(); // for instance of StatusBarHealth
  tabasco = new Tabasco(); // for instance of StatusBarTabasco
  coinbar = new StatusCoin(); // for instance of StatusBarCoin
  canvas; 
  keyboard; // keyboard instance
  throwAbleObjects = []; // array in which the collected bottles are pushed
  coin = this.level.coins; // instance of coins
  bottle = this.level.bottles; // instance of bottles
  camera_x = 0; // camera x position 
  sound_coin = new Audio("https://cdn.freesound.org/previews/443/443258_6142149-lq.mp3"); // sound for collecting coins and tabasco
  soundplay = true;


  /**
   * 
   * constructor for the world class // class different functions and setting the variables canvas ctx and keyboard
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.setWorldEnemies();
    this.run();
  }

  /**
   * calls different functions for the game which are described in the following code
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionswithThings();
      this.checkCollisionswithTabasco();
    }, 200);
  }

  /**
   * This Function is for Throwing Tabasco Bottles - checks if the Player has collected any of them to throw - and splices the bottles after they are thrown 
   */
  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.tabasco.collectedBottles > 0) {
        let bottle = new ThrowAbleObjects(
          this.character.x + 100,
          this.character.y + 100
        );
        this.throwAbleObjects.push(bottle);
        this.tabasco.collectedBottles--;
        this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
      }
    }
  }

  /**
   * The following function checks if the bottle collides with the Endboss, plays a animation after its colliding and splices the bottle out of the game (array)
   */

  checkCollisionswithTabasco() {
    this.throwAbleObjects.forEach((bottle) => {
      if (bottle.isColliding(this.endboss) || bottle.y < 20) {
        bottle.bottleSplash = true;
        const index = this.throwAbleObjects.indexOf(bottle);
        this.endboss.bottleHitBoss();
        if (index !== -1) {
          setTimeout(() => {
            this.throwAbleObjects.splice(index, 1);
          }, 100);
        }
      }
    });
  }

  /**
   * checks if the character is colliding with collectable Itmes like Coins and bottles + plays sounds when thex collide
   */

  checkCollisionswithThings() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
       this.soundCollection();
      }
    });
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle);
       this.soundCollection();
      }
    });
  }

  /**
   * Creats the right Process for playing the Sounds with no issues
   */

  soundCollection() {
    const newSound = this.sound_coin.cloneNode();
    newSound.play();

    setTimeout(() => {
      newSound.pause();
      newSound.currentTime = 0;
    }, 1000);
  }

  
  
/**
 * Function for collecting the Coins after Collison and splices them out of the array for the game
 * 
 */
  collectCoin(coin) {
    this.coinbar.collectedCoins++;
    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
    this.coinbar.setAmountOfCoins(this.coinbar.collectedCoins);
  }

  /**
   * 
   * @param {Array} bottle // stands for the Amount of the bottles in the game
   * Function for collecting the Bottles in the Game - splices them right after the Collision
   * */

  collectBottle(bottle) {
    this.tabasco.collectedBottles++;
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
      this.level.bottles.splice(index, 1);
    }
    this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
  }

  /**
   * checks various Collisions and what is to do right after they collding
   */

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        !this.character.isHurt() &&
        !enemy.isDead() &&
        this.character.isColliding(enemy)
      ) {
        if (this.character.isAboveGround()) {
          this.handleAirCollision(enemy);
        } else {
          this.character.hit();
          this.StatusBarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * 
   * handles the Collision when the Character is above the Enemys
   * @param {Array} enemy // Array which represents the Enemies in the Game (chicken + Endboss)
   */

  handleAirCollision(enemy) {
    enemy.energy = 0;
    setTimeout(() => {
      const index = this.level.enemies.indexOf(enemy);
      if (index !== -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 1000);
    this.character.jump();
  }

  /**
   * sets the World // animates the Character
   */
  setWorld() {
    this.character.world = this;
    this.character.animate();
  }

  /**
   * sets the Enemys for the Game
   */
  setWorldEnemies() {
    this.enemy.forEach((enemy) => {
      enemy.world = this;
      this.endboss.animate();
    });
  }

  /**
   * draws different Objetcs which are important for the look and function of the game
   */
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
    });
  }

  /**
   * 
   * @param {Array} objects // Array for the objetcs which are added to the Map of the Game
   */
  addObjectstoMap(objects) {
    objects.forEach((o) => {
      this.addtoMap(o);
    });
  }
/**
 * adds diffrent elements to the map
 */
  addtoMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageback(mo);
    }
  }

  /**
   * 
   * Function for flipping Images for the character if he moves to the other Direction 
   */

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * 
   * flips the Image back to normal
   */

  flipImageback(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

class Endboss extends MoveableObject {
  height = 300; //Höhe
  width = 200; // Breite
  y = 360; // Y Koordinate
  x = 70; // X Koordinate
  energy = 20;
  world;
  

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
   
  ];
  
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
];

IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
];

IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
];

  constructor() {
    super().loadImage("img/4_enemie_boss_chicken/2_alert/G5.png"); 
    this.y = 120; 
    this.x = 2500; 
    this.speed = 7.5 + Math.random() * 2;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD); 
  }

  bottleHitBoss() {
    this.world.bossHitted = true;
    setTimeout(() => {
      this.world.bossHitted = false;
    }, 3000);
    if (this.energy > 0) {
        this.energy -= 5;
    }
    console.log(this.energy);
}


animate() {
  setInterval(() => {
    if (this.world.character.x > 1550) {
      console.log('Moving');
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
    }
    if (this.world.bossHitted === true) {
      console.log('Endboss hit');
      this.playAnimation(this.IMAGES_HURT);
    } else {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('end-screen-won').style.display = 'block';
        document.getElementById('endscreen').style.display = 'none';
      }
    }
  }, (2000 / 10, 200)); 
}



}  



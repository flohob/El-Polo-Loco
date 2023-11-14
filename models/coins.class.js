class Coins extends DrawableObject {
   
    x = 100;
    y = 100;
    width = 150;
    height = 150;

   
    constructor() {
      super().loadImage("img/8_coin/coin_1.png"); // loadImg wird hier von der SuperKlasse aufgerufen
      this.x = 800 + Math.random() * 2500;
      this.y = 20 + Math.random() * 280;
    }
  
  }
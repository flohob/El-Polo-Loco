class chicken extends MoveableObject {
  y = 360;
  height = 70;
  width = 70;
  energy = 5;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ]; // Array mit Bildern für die Animation und Standbild

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"); // Laden des Startbildes

    this.x = 250 + Math.random() * 500; // Generiert ein immer veränderten X Wert um das Huhn nach links laufen zu lassen
    this.speed = 0.15 + Math.random() * 0.35; // Bestimmt wir schnell das Huhn die X Koordinate ändert
    this.loadImages(this.IMAGES_WALKING); // Funktion für das Laden der Bilder für die Animation
    this.loadImages(this.IMAGES_DEAD);
    this.animate(); //Animations Funktion
  }

  animate() {
    setInterval(() => { // Setzt ein Intervall von 1000/60 p.S.
    this.moveLeft(); //Ruft die Funtion moveleft immer wieder im Intervall auf (ändern der X Koordinate nach links)
  },1000/60);

    setInterval(() => { // Setzt ein Intervall von 2000/ 10 p.S.
      if(this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
      this.playAnimation(this.IMAGES_WALKING); // Ruft die Funktion playAnimation auf um die Bilder des Arrays nacheinander zu rendern(Animation)
    }}, 2000 / 10);
  }
}

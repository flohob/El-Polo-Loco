class Character extends MoveableObject {
  height = 300;
  width = 125;
  y = 50;
  speed = 5;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png"
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png"
  ]; // Verschiedene Arrays für verschiedene Szenarien des Characters

  world; // Definieren der World Variable um auf einen Wert oder Funktion der Js Datei zuzugreifen (this.world.keyboard)
  walking_sound = new Audio("audio/518585_10201334-lq.mp3"); // Sound für das Laufen des Characters

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); // Laden der Bilder mit der Superklasse
    this.loadImages(this.IMAGES_WALKING); 
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravitiy(); // Hinzufügen der Gravitation (Erdanziehungskraft) für das Springend des Characters
    this.animate(); // Animations Funktion
  }

  animate() {
    setInterval(() => { // Setzt ein Intervall
      this.walking_sound.pause(); 
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { // If Abfrage mit der Variable world = wenn der Spieler die Taste nach rechts drückt und der X wert des Characters kleiner als der Endpunkt ist
        this.walking_sound.play();
        this.moveRight(); // Funktion um den Character nach rechts zu bewegen
        console.log(this.x);
      }

      if (this.world.keyboard.LEFT && this.x > 0) { // If Abfrage wenn der Spieler die Taste nach links drückt und der x Wert größer 0 ist
        this.moveLeft(); // Funtktion um den Character nach links zu bewegen
        this.otherDirection = true; //setzt den Operator otherDirection auf true da der Character nach links laufen soll
        this.walking_sound.play(); // Spielt einen gewissen Sound wenn der Spieler läuft welcher unter der Variable Walking_sound gespeichert ist
       
      }

      if(this.world.keyboard.SPACE && !this.isAboveGround()) { // If Abfrage  wennd er Spieler die Space Taste drückt und der Spieler nicht in der Luft ist und bereits springt
        this.jump(); // Funtkion um zu Springen
      }

      this.world.camera_x = -this.x + 100; //Befehl das die Kamera mit dem Character durch die Welt geht um 100px versetzt (x = this.x von oben +100px)
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // If Abfrage wenn der Spieler die Tasten rechts oder links drückt
        this.playAnimation(this.IMAGES_WALKING);
      }
      if (this.isDead()) { // Wenn der Character tot ist
        this.playAnimation(this.IMAGES_DEAD);
        
      } else if (this.isHurt()) { //Wenn der Character verletzt wurde durch eine Kollision der x Werte von Chicken und Character
        this.playAnimation(this.IMAGES_HURT);
      }
      if (this.isAboveGround()) { // Wenn der Spieler in der Luft ist bzw gerade springt
        this.playAnimation(this.IMAGES_JUMPING);
      } 
    }, 50);
  }
}

class Endboss extends MoveableObject {

    height = 300; //Höhe
    width = 200; // Breite
    y = 360; // Y Koordinate
    x = 70; // X Koordinate

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',

    ]; // Verschiedne Grafiken für die Aniamtion des Endboss

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png'); // Funktion für das Laden der Bilder für die Animaton (zurzeit nur ein Standbild)
        this.y = 120; // Zugriff zur oberen Koordinate und Änderung
        this.x = 2500;  // Ebenfalls Zugrifff der Koordinate von Oben welche dann ebenfalls geändert wird
        this.loadImages(this.IMAGES_WALKING); // Aufruf der Grafiken zur Animation bzw laden
        this.animate(); // Animate Funktion
    }

    animate() {
        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
          }, 2000 / 10);
        }
    }

  

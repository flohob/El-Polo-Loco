class StatusCoin extends DrawableObject {

    collectedCoins = 0;
    IMG = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]; // Array (Bilder) für die Animation der Coinbar

    constructor() {
        super(); // Ausführung der Super Klasse
        this.loadImages(this.IMG);
        this.setAmountOfCoins(this.collectedCoins); // Lädt ein bestimmtes Bild für die Anzeige wird später auf loadImages geändert
        this.x = 40; // x koordinate
        this.y = 80; // y Koordinate 
        this.width = 200; // Breite
        this.height = 50; // Höhe 
        
    }

  
    setAmountOfCoins(coins){
        let path = this.IMG[coins]
        this.img = this.imageCache[path];
    }
}

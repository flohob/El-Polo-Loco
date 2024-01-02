class Tabasco extends DrawableObject {

    collectedBottles = 0;

    IMG = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    constructor() {
        super().loadImages(this.IMG);
        this.setAmountOfBottles(this.collectedBottles);
        this.x = 40;
        this.y = 40;
        this.width = 200;
        this.height = 50;
    }

    setAmountOfBottles(bottles){
        // Stellt sicher, dass die Anzahl der Flaschen nicht größer als 5 ist
        if (bottles > 5) {
            bottles = 5;
        }
        this.collectedBottles = bottles;

        let path = this.IMG[bottles];
        this.img = this.imageCache[path];
    }
}



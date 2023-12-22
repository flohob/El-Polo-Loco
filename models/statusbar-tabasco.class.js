class Tabasco extends DrawableObject {

    /**
     * Number of Bottles which are used in the function setAmountofBottles
     */
    collectedBottles = 0;

    /**
     * different sources for displaying the amounts of bottles which are collected
     */
    IMG = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]

    /**
     * constructor loads Images, calls setAmountofBottles, changes values of y x height width
     */
    constructor() {
        super().loadImages(this.IMG);
        this.setAmountOfBottles(this.collectedBottles);
        this.x = 40;
        this.y = 40;
        this.width = 200;
        this.height = 50;
    }

    /**
     * 
     * @param {number} bottles 
     * uses the amount of the bottles for showing the right picture 
     */
    setAmountOfBottles(bottles){
        let path = this.IMG[bottles];
        this.img = this.imageCache[path];
    }
}


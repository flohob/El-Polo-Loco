class StatusCoin extends DrawableObject {

    /**
     * amount of collected coins
     */
    collectedCoins = 0;

    /**
     * Image Sources for the Coinbar
     */

    IMG = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]; 

    constructor() {
        super(); 
        this.loadImages(this.IMG);
        this.setAmountOfCoins(this.collectedCoins); 
        this.x = 40; 
        this.y = 80; 
        this.width = 200; 
        this.height = 50; 
        
    }

  /**
   * 
   * @param {number} coins 
   * coins used as a parameter to choose the right picture for the right amount
   */
    setAmountOfCoins(coins){
        let path = this.IMG[coins]
        this.img = this.imageCache[path];
    }
}

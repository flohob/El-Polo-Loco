class StatusBarHealth extends DrawableObject {
    IMAGES = [
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ];
  
    /**
     * percentage of health for the characters health
     */
    percentage = 100;

    
  /**
     * constructor loads Images, calls setAmountofBottles, changes values of y x height width
     */
    
    constructor() {
        super();
      this.loadImages(this.IMAGES);
      this.x = 40;
      this.y = 0;
      this.width = 200;
      this.height = 50;
      this.setPercentage(100);
      ;
    }

    /**
     * 
     * @param {number} percentage // used in the resolveImageIndex for displaying the right picture like the tabascobar
     */
  
    setPercentage(percentage) {
      this.percentage = percentage;
      let imagePath = this.IMAGES [this.resolveImageIndex()];
      this.img = this.imageCache[imagePath];
    }
  /**
   * 
   * @returns depending on which percent the character is the right picture is shown
   */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage >= 80) {
        return 4;
      } else if (this.percentage >= 60) {
        return 3;
      } else if (this.percentage >= 40) {
        return 2;
      } else if (this.percentage >= 20) {
        return 1;
      } else if (this.percentage === 0) {
        return 0;
      }
    }
  }
  
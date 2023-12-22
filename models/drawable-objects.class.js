class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {}; 
  currentImage = 0;

/**
 * 
 * @param {Image src} path // Image Source
 */

  loadImage(path) { 
    this.img = new Image(); 
    this.img.src = path; 
  }

  /**
   * 
   * Function for drawing 
   */
  draw(ctx) {
    if (this.img instanceof Image) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  
/**
 * 
 * LoadImages from the Array which is used in function
 * @param {Array} arr // Array with image src
 */
  loadImages(arr) { 
    arr.forEach((path) => { 
      let img = new Image(); 
      img.src = path; 
      this.imageCache[path] = img; 
    });
  }


  

}

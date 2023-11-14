class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {}; // Zwischenspeicher der Bilder
  currentImage = 0; //Gibt wieder bei welchem der Bilder sich der COm gerade befindet



  loadImage(path) { 
    this.img = new Image(); //die Variable this.img beschreibt ein neues Bild (wie document.getElem....)
    this.img.src = path; //Die src des Bildes wird vom der Variable "path" beschrieben und die Funktion übergeben (um die Funktion immer wieder verwenden zu können)
  }

  draw(ctx) { // Draw Methode um gewisse Bilder an gewissen Koordinaten mit einer gewissen Höhe und Breite zu zeichnen
    ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
  }

  loadImages(arr) { // beschreibt das Laden von mehreren Bilder aus dem Arrays // der Wert Arr bseschreibt das zu ladende Array
    arr.forEach((path) => { //Hier wird eine Foreach Schleife verwendet mit der Variable path 
      let img = new Image(); //Variable img beschreibt ein neues Bild (Image)
      img.src = path; // die src wird an die Variable path übergeben
      this.imageCache[path] = img; //der Path des Image Cache wird an die Variable img übergeben
    });
  }

  drawFrame(ctx) {
    if(this instanceof Character || this instanceof chicken) { // Um auchauf Werte aus Character und Chicken zuzugreifen

    ctx.beginPath(); // Zeichnet Rechtecke umd die ausgewählten Objekte um Kollisionen zu entdecken
    ctx.lineWidth = "2"; // Line Width
    ctx.strokeStyle = "blue"; // Farbe
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }}

  

}

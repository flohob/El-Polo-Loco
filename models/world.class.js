class World {
  // Ein Objekt für den Charakter in der Welt erstellen
  character = new Character(); // In der Welt soll es einen Character geben und dieser wird aus unserer Datei Character erstellt, deshalb new Character

  // Das aktuelle Level auf level1 setzen
  level = level1; // Gibt an, dass das Level die Datei Level1 ist

  // Kontextvariable für das Zeichnen
  ctx;

  enemy = this.level.enemies;

  // Eine Statusleiste für die Gesundheit erstellen
  StatusBarHealth = new StatusBarHealth(); // Erstellen der Statusbar Health

  // Eine Tabasco-Leiste erstellen
  tabasco = new Tabasco(); // Erstellen der Tabasco Bar

  // Eine Statusleiste für Münzen erstellen
  coinbar = new StatusCoin(); // Erstellen der StatusBar für Coins

  // Canvas- und Tastaturvariablen für den Zugriff darauf
  canvas; // Variable Canvas um darauf zuzugreifen
  keyboard; // Selbiges mit Keyboard
  throwAbleObjects = [];
  coin = this.level.coins;
  bottle = this.level.bottles;

  // Die x-Koordinate der Kamera auf 0 setzen
  camera_x = 0; // Kamerasicht wird standardmäßig auf Null gesetzt

  // Konstruktor für die Weltklasse
  constructor(canvas, keyboard) {
    // Den Kontext für das Canvas festlegen
    this.ctx = canvas.getContext("2d"); // Welcher Kontext für das Canvas

    // Canvas und Tastaturvariablen initialisieren
    this.canvas = canvas;
    this.keyboard = keyboard;

    // Die Zeichenmethode aufrufen
    this.draw();

    // Die Welt einrichten, insbesondere die Kollisionsüberprüfung
    this.setWorld();
    this.run();
  }

  // Überprüfung von Kollisionen in regelmäßigen Intervallen
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkCollisionswithThings();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.tabasco.collectedBottles > 0) {
        let bottle = new ThrowAbleObjects(this.character.x + 100, this.character.y + 100);
        this.throwAbleObjects.push(bottle);
        this.tabasco.collectedBottles--;
  
        // Aktualisiere die Anzeige der Tabasco Bar
        this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
      }
    }
  }
  

  checkCollisionswithThings() {
    // Überprüfe Kollisionen mit Münzen
    this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
            this.collectCoin(coin);
        }
    });

    // Überprüfe Kollisionen mit Tabasco-Flaschen
    this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
            this.collectBottle(bottle);
        }
    });
}

collectCoin(coin) {
    // Erhöhe die Anzahl der gesammelten Münzen
    this.coinbar.collectedCoins++;

    // Entferne die kollidierte Münze aus der Liste
    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
        this.level.coins.splice(index, 1);
    }

    // Aktualisiere die Anzeige der Coinbar
    this.coinbar.setAmountOfCoins(this.coinbar.collectedCoins);
}

collectBottle(bottle) {
  this.tabasco.collectedBottles++;
    // Entferne die kollidierte Flasche aus der Liste
    const index = this.level.bottles.indexOf(bottle);
    if (index !== -1) {
        this.level.bottles.splice(index, 1);
    }
  this.tabasco.setAmountOfBottles(this.tabasco.collectedBottles);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!this.character.isHurt() && !enemy.isDead() && this.character.isColliding(enemy)) {
        if (this.character.isAboveGround()) {
          this.handleAirCollision(enemy);
        } else {
        this.character.hit();
        this.StatusBarHealth.setPercentage(this.character.energy)
        if (this.character.isAboveGround()) {
          this.handleAirCollision();
        }
      }
    }});
  }

  handleAirCollision(enemy) {
    this.character.jump();
    enemy.energy = 0;
    console.log(this.enemy.energy);
    setTimeout(() => {
        const index = this.level.enemies.indexOf(enemy);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
    }, 1000); 
}

  // Die Welt für den Charakter festlegen
  setWorld() {
    this.character.world = this;
  }

  // Die Zeichenmethode für die gesamte Spielwelt aufrufen
  draw() {
    // Alles auf dem Canvas löschen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Kamera entsprechend verschieben
    this.ctx.translate(this.camera_x, 0);

    // Hintergrundobjekte zum Spiel hinzufügen
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.throwAbleObjects);
    this.addObjectstoMap(this.coin);
    this.addObjectstoMap(this.bottle);
    
  

    // Wolken zum Spiel hinzufügen
    this.addObjectstoMap(this.level.cloud);

    // Charakter zum Spiel hinzufügen
    this.addtoMap(this.character);

    // Feinde zum Spiel hinzufügen
    this.addObjectstoMap(this.level.enemies);
    

    // Kamera zurückverschieben
    this.ctx.translate(-this.camera_x, 0);

    // Statusleisten und Symbole zum Spiel hinzufügen
    this.addtoMap(this.StatusBarHealth);
    this.addtoMap(this.tabasco);
    this.addtoMap(this.coinbar);
    

    // Die draw-Methode rekursiv aufrufen, um eine Animation zu erstellen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  // Hinzufügen von Objekten zum Zeichenbereich der Karte
  addObjectstoMap(objects) {
    objects.forEach((o) => {
      this.addtoMap(o);
    });
  }

  // Einzelnes Objekt zum Zeichenbereich der Karte hinzufügen
  addtoMap(mo) {
    // Objekt spiegeln, wenn die andere Richtung erforderlich ist
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    // Objekt zeichnen und Rahmen zeichnen
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    // Objekt zurückspiegeln, wenn die andere Richtung erforderlich ist
    if (mo.otherDirection) {
      this.flipImageback(mo);
    }
  }

  // Methode zum Spiegeln eines Bildes
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  // Methode zum Zurückspiegeln eines Bildes
  flipImageback(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

class Level {
    enemies;
    cloud;
    backgroundObjects;
    Endboss;
    coins;
    bottles;

    // ERstelleung eine neuen Klasse LEVEL diese gibt an was in den Levels vorkommen soll , spezifischer in Level 1 da zurzeit nur eins exestiert
    
    level_end_x = 2200; // Ende der Welt in den Levels

    constructor(enemies,cloud,backgroundObjects,coins,bottles) { // Sagt nur dass auf die oberen Variablen zugegriffen wird
        this.cloud = cloud;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins
        this.bottles = bottles;
    }
}
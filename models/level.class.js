class Level {
    enemies;
    cloud;
    backgroundObjects;
    Endboss;
    coins;
    bottles;

    
    level_end_x = 2200;

    constructor(enemies,cloud,backgroundObjects,coins,bottles) { 
        this.cloud = cloud;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins
        this.bottles = bottles;
    }
}
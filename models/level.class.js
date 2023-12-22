class Level {
    enemies;
    cloud;
    backgroundObjects;
    Endboss;
    coins;
    bottles;

    /**
     * end of the World
     */
    level_end_x = 2200; 

    /**
     * 
     * @param {Array} enemies 
     * @param {Array} cloud 
     * @param {Array} backgroundObjects 
     * @param {Array} coins 
     * @param {Array} bottles 
     */

    constructor(enemies,cloud,backgroundObjects,coins,bottles) { 
        this.cloud = cloud;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins
        this.bottles = bottles;
    }
}
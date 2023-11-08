class Level {
    enemies;
    cloud;
    backgroundObjects;
    Endboss;

    
    level_end_x = 2200;

    constructor(enemies,cloud,backgroundObjects) {
        this.cloud = cloud;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}
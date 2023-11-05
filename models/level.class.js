class Level {
    enemies;
    cloud;
    backgroundObjects;
    Enboss;
    level_end_x = 2200;

    constructor(enemies,cloud,backgroundObjects) {
        this.cloud = cloud;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}
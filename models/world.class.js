class World {

     character = new Character();

     enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];

cloud = [
    new Cloud(),
];

ctx;

backgroundObjects = [
    new BackgroundObjects('img/5_background/layers/air.png', 0),
    new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 0)
];

canvas;
keyboard;
camera_x = 0;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
       this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

       this.ctx.translate(this.camera_x, 0);
       this.addObjectstoMap(this.backgroundObjects);
       this.addObjectstoMap(this.cloud);
       this.addtoMap(this.character);
       this.addObjectstoMap(this.enemies);
       this.ctx.translate(-this.camera_x, 0);
       
       



        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectstoMap(objects) {
        objects.forEach(o => {
            this.addtoMap(o);
        });

    }

    addtoMap(mo) {
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x*-1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection) {
            mo.x = mo.x*-1;
            this.ctx.restore();
        }
    }
}
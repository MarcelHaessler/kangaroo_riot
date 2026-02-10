class World {
    character = new Character();
    backgroundObjects = [
        new BackgroundObject('img/kangaroo/background/Gemini_Generated_Image_47inhj47inhj47in.png', 0)
    ];
    ctx;
    canvas;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this.world;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.backgroundObjects.forEach(bg => {
            this.addToMap(bg);
        });

        this.character.draw(this.ctx);

        requestAnimationFrame(() => this.draw());
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
} 
class Endboss extends MoveableObject {
    height = 300; // Increased size (approx 1.5x of normal enemy height if normal is ~130-150)
    width = 200;
    y = 150; // Positioned on ground

    IMAGES_WALK = [
        'img/fascist/Endboss/walk/1.png',
        'img/fascist/Endboss/walk/2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 4000; // Further back
        this.speed = 0.2; // Significantly slower
        this.otherDirection = true;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world && this.world.gameStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 200);
    }
}

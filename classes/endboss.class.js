class Endboss extends MoveableObject {
    height = 300; // Increased size (approx 1.5x of normal enemy height if normal is ~130-150)
    width = 200;
    y = 150; // Positioned on ground
    energy = 3;
    autoWidth = true;

    IMAGES_WALK = [
        'img/fascist/Endboss/walk/1.png',
        'img/fascist/Endboss/walk/2.png'
    ];

    IMAGES_LOSE = [
        'img/fascist/Endboss/lose/1.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_LOSE);
        this.x = 4000; // Further back
        this.speed = 0.2; // Significantly slower
        this.otherDirection = true;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world && this.world.gameStarted && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.height = 100; // Defeat height
                this.y = 360; // Positioned lower on ground
                this.playAnimation(this.IMAGES_LOSE);
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 200);
    }
}

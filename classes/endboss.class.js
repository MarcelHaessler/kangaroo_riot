class Endboss extends MoveableObject {
    height = 300; // Increased size (approx 1.5x of normal enemy height if normal is ~130-150)
    width = 200;
    y = 150; // Positioned on ground
    energy = 100;
    autoWidth = true;
    hitsToDefeat = 3;

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
        this.speed = 0.4; // Significantly slower
        this.otherDirection = true;
        this.hitsToDefeat = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
        this.animate();
    }

    hit() {
        this.energy -= (100 / this.hitsToDefeat);
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    animate() {
        this.moveEnemy();
        this.animateEnemy();
    }

    moveEnemy() {
        setInterval(() => {
            if (this.world && this.world.gameStarted && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    animateEnemy() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 200);
    }

    handleDeath() {
        this.height = 100;
        this.y = 360;
        this.playAnimation(this.IMAGES_LOSE);
    }
}

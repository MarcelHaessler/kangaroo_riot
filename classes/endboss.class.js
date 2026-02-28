class Endboss extends MoveableObject {
    height = 300;
    width = 200;
    y = 150;
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

    IMAGES_HIT = [
        'img/fascist/Endboss/inYoureFace/1.png'
    ];

    isHitReacting = false;

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_LOSE);
        this.loadImages(this.IMAGES_HIT);
        this.x = 4000;
        this.speed = 0.6;
        this.otherDirection = true;
        this.hitsToDefeat = Math.floor(Math.random() * 3) + 3;
        this.animate();
    }

    hit() {
        this.energy -= (100 / this.hitsToDefeat);
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.showHitReaction();
        }
    }

    showHitReaction() {
        this.isHitReacting = true;
        setTimeout(() => {
            this.isHitReacting = false;
        }, 500);
    }

    animate() {
        this.moveEnemy();
        this.animateEnemy();
    }

    moveEnemy() {
        setInterval(() => {
            if (this.world && this.world.gameStarted && !this.isDead() && !this.isHitReacting) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    animateEnemy() {
        setInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else if (this.isHitReacting) {
                this.playAnimation(this.IMAGES_HIT);
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

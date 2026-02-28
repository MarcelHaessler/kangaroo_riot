class Enemy extends MoveableObject {
    y = 350;
    height = 100;
    width = 100;
    imagesWalk = [
        'img/fascist/player_one/walk/1.png',
        'img/fascist/player_one/walk/2.png'
    ];
    imagesLose = [
        'img/fascist/player_one/lose/1.png'
    ];

    /**
     * Initializes a basic enemy with a random speed.
     * @param {number} x - The initial x-position
     */
    constructor(x) {
        super();
        this.loadImage('img/fascist/player_one/walk/1.png');
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesLose);
        this.x = x;
        this.speed = 0.15 + Math.random() * 1.5;
        this.otherDirection = true;
        this.animate();
    }

    /**
     * Starts the enemy's logic loops for movement and animation.
     */
    animate() {
        this.moveEnemy();
        this.animateEnemy();
    }

    /**
     * Manages the enemy's horizontal movement logic (always moving left if alive).
     */
    moveEnemy() {
        setInterval(() => {
            if (this.world && this.world.gameStarted && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
     * Manages switching between walk and lose (defeated) animations.
     */
    animateEnemy() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesLose);
            } else {
                this.playAnimation(this.imagesWalk);
            }
        }, 200);
    }
}

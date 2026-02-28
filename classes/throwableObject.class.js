class ThrowableObject extends MoveableObject {
    IMAGES = [
        'img/items/book/1.png',
        'img/items/book/2.png',
        'img/items/book/3.png',
        'img/items/book/4.png'
    ];

    /**
     * Initializes a thrown book object.
     * @param {number} x - Initial x-position
     * @param {number} y - Initial y-position
     * @param {boolean} direction - True if facing/moving left
     */
    constructor(x, y, direction) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = direction;
        this.throw();
        this.animate();
    }

    /**
     * Initiates the throwing physics: applies vertical speed and horizontal movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 15;
            } else {
                this.x += 15;
            }
        }, 25);
    }

    /**
     * Starts the cycling animation for the flying book.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 50);
    }

    /**
     * Always returns true as the thrown book is essentially a projectile in the air.
     * @returns {boolean} True
     */
    isAboveGround() {
        return true;
    }
}

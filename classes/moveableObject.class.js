/**
 * Represents an object that can move and interact with the physical world.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
    speed = 0.05;
    speedY = 0;
    acceleration = 2.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object, causing it to fall if above ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is currently above the ground level.
     * @returns {boolean} True if the object is in the air
     */
    isAboveGround() {
        return this.y < 310;
    }

    /**
     * Detects collision between this object and another moveable object.
     * @param {MoveableObject} mo - The other object to check collision with
     * @returns {boolean} True if the objects are colliding
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    /**
     * Reduces the object's energy by the specified damage amount.
     * Prevents energy from dropping below 0 and updates the last hit timestamp.
     * @param {number} damage - The amount of damage to deal (default 12)
     */
    hit(damage = 12) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object has been hit within the last 1 second.
     * Used mainly to trigger hurt/crash animations and invulnerability frames.
     * @returns {boolean} True if hurt recently
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object's energy has reached zero.
     * @returns {boolean} True if the object is dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Cycles through an array of images to play an animation.
     * @param {string[]} images - An array of image paths
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation once and stays on the last frame.
     * @param {string[]} images - An array of image paths
     */
    playAnimationOnce(images) {
        let i = this.currentImage;
        if (i >= images.length) {
            i = images.length - 1;
        }
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
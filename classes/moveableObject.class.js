class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }
}
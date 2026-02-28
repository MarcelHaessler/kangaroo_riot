class ThrowableObject extends MoveableObject {
    IMAGES = [
        'img/items/book/1.png',
        'img/items/book/2.png',
        'img/items/book/3.png',
        'img/items/book/4.png'
    ];

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

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 50);
    }

    isAboveGround() {
        return true;
    }
}

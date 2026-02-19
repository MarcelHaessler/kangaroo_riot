class Character extends MoveableObject {
    y = 310;
    speed = 6;
    imagesThrow = [
        'img/kangaroo/throw/1.png',
        'img/kangaroo/throw/2.png',
        'img/kangaroo/throw/3.png',
        'img/kangaroo/throw/4.png',
        'img/kangaroo/throw/5.png',
        'img/kangaroo/throw/6.png',
        'img/kangaroo/throw/7.png',
        'img/kangaroo/throw/8.png',
        'img/kangaroo/throw/9.png'
    ];
    imagesWalk = [
        'img/kangaroo/walk/1.png',
        'img/kangaroo/walk/2.png',
        'img/kangaroo/walk/3.png',
        'img/kangaroo/walk/4.png',
        'img/kangaroo/walk/5.png',
    ];

    imagesJump = [
        'img/kangaroo/jump/1.png',
        'img/kangaroo/jump/2.png',
        'img/kangaroo/jump/3.png',
        'img/kangaroo/jump/4.png',
        'img/kangaroo/jump/5.png',
        'img/kangaroo/jump/6.png',
        'img/kangaroo/jump/7.png'
    ];
    imagesRun = [];

    constructor() {
        super();
        this.loadImage('img/kangaroo/walk/1.png');
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.applyGravity();
        this.animate();
    }

    animate() {
        // Logik für die Bewegung (60 FPS)
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 1000 / 60);

        // Logik für die Animation (Bilderwechsel) - Nur bei Tastendruck
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.imagesJump);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalk);
                }
            }
        }, 100);
    }
}
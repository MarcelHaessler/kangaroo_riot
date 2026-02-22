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
                this.playAnimation(this.imagesLose);
            } else {
                this.playAnimation(this.imagesWalk);
            }
        }, 200);
    }
}

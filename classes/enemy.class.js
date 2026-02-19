class Enemy extends MoveableObject {
    y = 330;
    height = 100;
    width = 100;
    imagesWalk = [
        'img/fascist/player_one/walk/1.png',
        'img/fascist/player_one/walk/2.png'
    ];

    constructor() {
        super();
        this.loadImage('img/fascist/player_one/walk/1.png');
        this.loadImages(this.imagesWalk);
        this.x = 200 + Math.random() * 500; // Random spawn position to the right
        this.speed = 0.15 + Math.random() * 2.0;
        this.otherDirection = true;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.imagesWalk);
        }, 200);
    }
}

class Character extends MoveableObject {
    y = 310;
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
    imagesJump = [];
    imagesRun = [];

    constructor() {
        super();
        this.loadImage('img/kangaroo/throw/1.png');
        this.loadImages(this.imagesThrow);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.animateThrow(this.imagesThrow);
        }, 100);
    }

    jump() {

    }
}
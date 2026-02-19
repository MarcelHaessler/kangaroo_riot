class StatusBar extends DrawableObject {
    x = 20;
    y = 0;
    width = 200;
    height = 60;

    IMAGES = [
        'img/statusbar/health/0.png',
        'img/statusbar/health/20.png',
        'img/statusbar/health/40.png',
        'img/statusbar/health/60.png',
        'img/statusbar/health/80.png',
        'img/statusbar/health/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}

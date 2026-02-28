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

    /**
     * Initializes the status bar, loading its images and setting initial state.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    /**
     * Updates the percentage and selects the corresponding image to display.
     * @param {number} percentage - The new percentage value (0 to 100)
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines which image index to use based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 5;
        if (this.percentage > 60) return 4;
        if (this.percentage > 40) return 3;
        if (this.percentage > 20) return 2;
        if (this.percentage > 0) return 1;
        return 0;
    }
}

class EndbossStatusBar extends StatusBar {
    x = 560; // 780 (canvas width) - 200 (width) - 20 (padding)
    y = 0;
    width = 200;
    height = 60;
    otherDirection = true; // Flips the health bar

    constructor() {
        super();
        this.setPercentage(100);
    }
}

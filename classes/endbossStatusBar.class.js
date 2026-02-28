/**
 * Represents the health bar of the Endboss.
 * @extends StatusBar
 */
class EndbossStatusBar extends StatusBar {
    x = 560;
    y = 0;
    width = 200;
    height = 60;
    otherDirection = true;

    /**
     * Creates an instance of EndbossStatusBar and sets initial percentage.
     */
    constructor() {
        super();
        this.setPercentage(100);
    }
}

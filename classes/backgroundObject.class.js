/**
 * Represents a background object that can be drawn on the canvas.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
    width = 840;
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath - The path to the background image
     * @param {number} x - The initial x-position
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
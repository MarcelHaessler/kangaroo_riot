/**
 * Represents a collectible item (book) in the game world.
 * @extends DrawableObject
 */
class CollectibleObject extends DrawableObject {
    width = 50;
    height = 50;

    /**
     * Initializes a collectible book at a specific position.
     * @param {number} x - The x-coordinate
     * @param {number} y - The y-coordinate
     */
    constructor(x, y) {
        super();
        this.loadImage('img/items/book/1.png');
        this.x = x;
        this.y = y;
    }
}

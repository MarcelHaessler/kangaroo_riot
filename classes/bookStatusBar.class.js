/**
 * Represents the horizontal status bar for the character's book count.
 * @extends DrawableObject
 */
class BookStatusBar extends DrawableObject {
    x = 20;
    y = 50;
    width = 60;
    height = 60;
    books = 3;

    /**
     * Initializes the book status bar and loads the book icon image.
     */
    constructor() {
        super();
        this.loadImage('img/items/book/1.png');
    }

    /**
     * Updates the number of books to display.
     * @param {number} count - The current number of books
     */
    setBooks(count) {
        this.books = count;
    }

    /**
     * Specialized draw method to render the book icon followed by the book count as text.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(this.books, this.x + 60, this.y + 40);
        }
    }
}

class BookStatusBar extends DrawableObject {
    x = 20;
    y = 50; // Positioned below health bar (which is at y=0)
    width = 60;
    height = 60;
    books = 3;

    constructor() {
        super();
        this.loadImage('img/items/book/1.png');
    }

    setBooks(count) {
        this.books = count;
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(this.books, this.x + 60, this.y + 40);
        }
    }
}

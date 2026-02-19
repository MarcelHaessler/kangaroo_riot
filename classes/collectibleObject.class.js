class CollectibleObject extends DrawableObject {
    width = 50;
    height = 50;

    constructor(x, y) {
        super();
        this.loadImage('img/items/book/1.png');
        this.x = x;
        this.y = y;
    }
}

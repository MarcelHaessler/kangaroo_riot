/**
 * Data class representing the state of various keyboard inputs.
 */
class Keyboard {
    LEFT;
    RIGHT;
    UP;
    DOWN;
    SPACE;
    D;

    /**
     * Initializes all key states to false.
     */
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.DOWN = false;
        this.SPACE = false;
        this.D = false;
    }
}   
class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image file into an HTMLImageElement.
     * @param {string} path - The path to the image asset
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Native draw method for objects with a single static image.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        if (this.img) {
            this.updateAutoWidth();
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Dynamically calculates and sets the width of the object based on its configured height
     * and the natural aspect ratio of the loaded image file.
     */
    updateAutoWidth() {
        if (this.autoWidth && this.img.complete && this.img.naturalHeight > 0) {
            this.width = this.height * (this.img.naturalWidth / this.img.naturalHeight);
        }
    }

    /**
     * Optional debugging tool to draw a colored rectangle frame around the object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof StatusBar) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Iterates through an array of image paths and caches them as Image elements.
     * @param {string[]} arr - An array of image paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}
class World {
    character = new Character();
    backgroundObjects = [
        new BackgroundObject('img/background/background1.png', -840),
        new BackgroundObject('img/background/background2.png', 0),
        new BackgroundObject('img/background/background1.png', 840),
        new BackgroundObject('img/background/background2.png', 840 * 2),
        new BackgroundObject('img/background/background1.png', 840 * 3),
        new BackgroundObject('img/background/background2.png', 840 * 4),
        new BackgroundObject('img/background/background1.png', 840 * 5)
    ];
    enemies = [
        new Enemy(800),
        new Enemy(1300),
        new Enemy(1800),
        new Enemy(2500),
        new Enemy(3000),
        new Enemy(3500),
        new Enemy(4000),
        new Enemy(4500),
        new Endboss()
    ];
    statusBar = new StatusBar();
    endbossStatusBar = new EndbossStatusBar();
    bookStatusBar = new BookStatusBar();
    throwableObjects = [];
    collectibleObjects = [
        new CollectibleObject(500, 150 + Math.random() * 270),
        new CollectibleObject(800, 150 + Math.random() * 270),
        new CollectibleObject(1200, 150 + Math.random() * 270),
        new CollectibleObject(1600, 150 + Math.random() * 270),
        new CollectibleObject(2000, 150 + Math.random() * 270),
        new CollectibleObject(2400, 150 + Math.random() * 270),
        new CollectibleObject(2800, 150 + Math.random() * 270),
        new CollectibleObject(3200, 150 + Math.random() * 270),
        new CollectibleObject(3600, 150 + Math.random() * 270),
        new CollectibleObject(4000, 150 + Math.random() * 270)
    ];
    camera_x = 0;
    lastThrow = 0;
    gameStarted = false;
    winScreenTriggered = false;

    throw_sound = new Audio('audio/throw.mp3');
    crash_sound = new Audio('audio/crash.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        setInterval(() => {
            if (!this.gameStarted && (this.keyboard.LEFT || this.keyboard.RIGHT)) {
                this.gameStarted = true;
            }
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkItemCollisions();
            this.checkThrowableCollisions();
            this.checkGameOver();
            this.checkWin();
            this.checkEndbossProximity();
        }, 50);
    }

    checkWin() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isDead() && !this.winScreenTriggered) {
                this.winScreenTriggered = true;
                setTimeout(() => {
                    document.getElementById('win-screen').classList.remove('d-none');
                    document.getElementById('mobile-controls').classList.add('d-none');
                    clearAllIntervals();
                }, 1000);
            }
        });
    }

    checkGameOver() {
        if (this.character.isDead()) {
            document.getElementById('game-over-screen').classList.remove('d-none');
            document.getElementById('mobile-controls').classList.add('d-none');
            clearAllIntervals();
        }
    }

    checkThrowObjects() {
        let now = new Date().getTime();
        if (this.canThrowBook(now)) {
            this.throwBook();
            this.lastThrow = now;
        }
    }

    /**
     * Checks if the throw cooldown has passed and the character has books left.
     * @param {number} now - The current timestamp in milliseconds
     * @returns {boolean} True if a book can be thrown
     */
    canThrowBook(now) {
        return this.keyboard.D && (now - this.lastThrow) > 1000 && this.character.books > 0;
    }

    throwBook() {
        let bookX = this.character.otherDirection ? this.character.x - 10 : this.character.x + 50;
        let book = new ThrowableObject(bookX, this.character.y + 50, this.character.otherDirection);
        this.throwableObjects.push(book);
        this.character.books--;
        this.bookStatusBar.setBooks(this.character.books);
        this.character.throwAnimation();
        this.playThrowSound();
    }

    playThrowSound() {
        if (!isMuted) {
            this.throw_sound.currentTime = 0;
            this.throw_sound.play();
        }
    }

    checkThrowableCollisions() {
        this.throwableObjects.forEach((throwable, tIndex) => {
            this.enemies.forEach((enemy) => {
                if (throwable.isColliding(enemy) && !enemy.isDead()) {
                    this.handleThrowableHit(enemy, tIndex);
                }
            });
        });
    }

    /**
     * Deals damage to the struck enemy and removes the projectile.
     * @param {MoveableObject} enemy - The enemy that was hit
     * @param {number} tIndex - The array index of the thrown object
     */
    handleThrowableHit(enemy, tIndex) {
        if (enemy instanceof Endboss) {
            enemy.hit();
            enemy.x += 40;
            this.endbossStatusBar.setPercentage(enemy.energy);
            if (enemy.isDead()) this.playCrash();
        } else {
            enemy.energy = 0;
            this.playCrash();
        }
        this.throwableObjects.splice(tIndex, 1);
    }

    checkItemCollisions() {
        this.collectibleObjects.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                this.character.books++;
                this.bookStatusBar.setBooks(this.character.books);
                this.collectibleObjects.splice(index, 1);
            }
        });
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    handleCharacterEnemyCollision(enemy) {
        if (enemy instanceof Endboss) {
            this.handleEndbossCollision(enemy);
        } else if (this.isCharacterStomping(enemy)) {
            this.handleEnemyStomp(enemy);
        } else if (!this.character.isHurt() && !enemy.isDead()) {
            this.character.hit(12);
        }
    }

    /**
     * Checks if the character has moved past the Endboss and inflicts damage.
     * Damage is 1 unit per 200ms (5 units per second).
     */
    checkEndbossProximity() {
        this.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && this.character.x > enemy.x && !enemy.isDead()) {
                this.character.hit(1);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    handleEndbossCollision(endboss) {
        if (!this.character.isHurt() && !endboss.isDead()) {
            this.character.hit(24);
        }
    }

    handleEnemyStomp(enemy) {
        enemy.energy = 0;
        enemy.y += 60;
        this.playCrash();
    }

    /**
     * Checks if the character is currently falling downwards, 
     * indicating a stomp attack onto a target.
     * @param {MoveableObject} enemy - The enemy to check against
     * @returns {boolean} True if the character is stomping the given enemy
     */
    isCharacterStomping(enemy) {
        return this.character.isAboveGround() &&
            this.character.speedY < 0 &&
            !enemy.isDead();
    }

    playCrash() {
        if (!isMuted) {
            this.crash_sound.currentTime = 0;
            this.crash_sound.play();
        }
    }

    /**
     * Passes a reference to this World object to all moveable entities,
     * allowing them to access keyboard states and trigger world events.
     */
    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.camera_x = -this.character.x + 100;
        this.drawWorldComponents();
        this.scheduleNextFrame();
    }

    drawWorldComponents() {
        this.ctx.translate(this.camera_x, 0);
        this.drawLevelObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.drawFixedObjects();
    }

    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawLevelObjects() {
        this.backgroundObjects.forEach(bg => this.addToMap(bg));
        this.enemies.forEach(enemy => this.addToMap(enemy));
        this.throwableObjects.forEach(obj => this.addToMap(obj));
        this.collectibleObjects.forEach(obj => this.addToMap(obj));
        this.addToMap(this.character);
    }

    drawFixedObjects() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bookStatusBar);

        let endboss = this.enemies.find(e => e instanceof Endboss);
        if (endboss && this.character.x > (endboss.x - 700)) {
            this.addToMap(this.endbossStatusBar);
        }
    }

    /**
     * Handles drawing a moveable object onto the canvas, including horizontally 
     * flipping the context if the object is facing the other direction.
     * @param {MoveableObject} mo - The object to draw
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
} 
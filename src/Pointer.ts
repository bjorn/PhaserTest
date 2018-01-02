module test {

    export class Pointer {

        game: Phaser.Game;
        level: test.TiledLevel;
        camera: test.Camera;

        constructor(game: Phaser.Game, level: test.TiledLevel) {

            this.game = game;
            this.level = level;
            this.camera = new Camera(this.game);
        }

        // Returns pointer location in screen adjusted to camera scale
        getLoc(): Phaser.Point {

            var x, y;
            x = this.game.input.activePointer.x / this.camera.scale;
            y = this.game.input.activePointer.y / this.camera.scale;

            return new Phaser.Point(x, y);
        }

        // Returns pointer location in world adjusted to camera scale
        getWorldLoc(): Phaser.Point {

            var x, y;
            x = this.camera.x + this.getLoc().x;
            y = this.camera.y + this.getLoc().y;

            return new Phaser.Point(x, y);
        }

        // Returns pointer location in world before scaling
        getTileLoc(): Phaser.Point {

            var x, y;
            x = this.getWorldLoc().x / this.level.tileScale;
            y = this.getWorldLoc().y / this.level.tileScale;

            return new Phaser.Point(x, y);
        }

        // Handles inputs in editor mode to move the screen
        editorScreenCheckInput() {

            if (this.game.input.activePointer.justPressed) {
                this.lastLoc = this.loc;
            }

            this.loc = this.getLoc();
            this.worldLoc = this.getWorldLoc();

            if (this.game.input.activePointer.leftButton.isDown) {
                // dx and dy are reversed to match mouse dragging
                var dx = this.lastLoc.x - this.loc.x;
                var dy = this.lastLoc.y - this.loc.y;
                this.camera.move(dx, dy);

                this.lastLoc = this.loc;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

                // this.camera.y -= 4;
                this.camera.zoomIn(0.05);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

                // this.camera.y += 4;
                this.camera.zoomOut(0.05);
            }
        }

        lastLoc: Phaser.Point = new Phaser.Point();
        loc: Phaser.Point = new Phaser.Point();

        worldLoc: Phaser.Point = new Phaser.Point();
        tileLoc: Phaser.Point = new Phaser.Point();

        update() {
            
            this.editorScreenCheckInput();

            // The update function has to be called manually
            this.camera.update();

            this.loc = this.getLoc();
            this.worldLoc = this.getWorldLoc();
            this.tileLoc = this.getTileLoc();
        }
    }
}
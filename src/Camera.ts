module test {

    export class Camera {

        game: Phaser.Game;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        scale: number = 1;
        x: number;
        y: number;

        zoomIn(scaleDiff: number) {

            this.scale += scaleDiff;

            this.adjustCameraZoom(this.scale);
        }

        zoomOut(scaleDiff: number) {

            this.scale -= scaleDiff;
            if (this.scale < 1) {
                this.scale = 1;
            }

            this.adjustCameraZoom(this.scale);
        }

        adjustCameraZoom(scale: number) {

            var newWidth = this.game.width / scale;
            var newHeight = this.game.height / scale;

            this.game.camera.setSize(newWidth, newHeight);
            this.game.camera.scale.setTo(scale, scale);
        }

        // Move camera based on increments
        move(dx: number, dy: number) {

            this.game.camera.x += dx;
            this.game.camera.y += dy;
        }

        // Move camera to selected x and y coordinates
        setPos(x: number, y: number) {

            this.game.camera.x = x;
            this.game.camera.y = y;
        }

        // A function to replace check bounds from the default camera
        // Default function doesn't works well with scaling
        checkCameraBounds() {

            if (this.game.camera.x > this.game.camera.bounds.width - this.game.camera.width) {
                this.game.camera.x = this.game.camera.bounds.width - this.game.camera.width;
            }
            if (this.game.camera.y > this.game.camera.bounds.height - this.game.camera.height) {
                this.game.camera.y = this.game.camera.bounds.height - this.game.camera.height;
            }
        }

        update() {

            this.checkCameraBounds();
            this.x = this.game.camera.x;
            this.y = this.game.camera.y;
        }
    }
}
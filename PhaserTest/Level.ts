module test {
    export class Level extends Phaser.State {

        cameraScale: number;

        // Returns max scale that doesn't go out of bounds
        getFitScale(map: Phaser.Tilemap): number {

            var scale;

            if (map.heightInPixels / this.game.height <= map.widthInPixels / this.game.width) {
                scale = this.game.height / map.heightInPixels;
            } else {
                scale = this.game.width / map.widthInPixels;
            }

            return scale;
        }

        // Set camera zoom to fit map
        setCameraFit() {

            this.cameraScale = this.getFitScale(this.map);

            this.adjustCameraZoom(this.cameraScale);
        }

        zoomIn(scaleDiff: number) {

            this.cameraScale += scaleDiff;

            this.adjustCameraZoom(this.cameraScale);
        }

        zoomOut(scaleDiff: number) {

            this.cameraScale -= scaleDiff;
            if (this.cameraScale < this.getFitScale(this.map)) {
                this.cameraScale = this.getFitScale(this.map);
            }

            this.adjustCameraZoom(this.cameraScale);
        }

        adjustCameraZoom(scale: number) {

            var newWidth = this.game.width / scale;
            var newHeight = this.game.height / scale;

            //this.camera.setSize(newWidth, newHeight);
            this.camera.scale.setTo(scale, scale);
        }

        // A function to replace check bounds from the default camera
        // Default function doesn't works well with scaling
        checkBounds(camera: Phaser.Camera) {
            
            if (camera.x > camera.bounds.width - camera.width) {
                camera.x = camera.bounds.width - camera.width;
            }
            if (camera.y > camera.bounds.height - camera.height) {
                camera.y = camera.bounds.height - camera.height;
            }
        }

        // Returns adjusted pointer location with respect to the world location
        adjustPointerWorld(activePointer: Phaser.Pointer): Phaser.Point {

            var x = this.camera.x + activePointer.x / this.cameraScale;
            var y = this.camera.y + activePointer.y / this.cameraScale;

            var point = new Phaser.Point(x, y);
            return point;
        }

        // Returns adjusted pointer location based on the screen
        adjustPointerScreen(activePointer: Phaser.Pointer): Phaser.Point {

            var x = activePointer.x / this.cameraScale;
            var y = activePointer.y / this.cameraScale;

            var point = new Phaser.Point(x, y);
            return point;
        }

        // Move camera based on increments
        moveCamera(dx, dy: number) {

            this.camera.x += dx;
            this.camera.y += dy;
        }

        // Move camera to selected x and y coordinates
        setCameraPos(x, y: number) {

            this.camera.x = x;
            this.camera.y = y;
        }

        lastPointer: Phaser.Point = new Phaser.Point();
        pointer: Phaser.Point = new Phaser.Point();

        pointerWorld: Phaser.Point = new Phaser.Point();

        cursors: Phaser.CursorKeys;

        // Handles inputs in editor mode to move the screen
        editorScreenCheckInput() {

            if (this.game.input.activePointer.justPressed) {
                this.lastPointer = this.pointer;
            }

            this.pointer = this.adjustPointerScreen(this.input.activePointer);
            this.pointerWorld = this.adjustPointerWorld(this.input.activePointer);

            if (this.game.input.activePointer.isDown) {
                // dx and dy are reversed to match mouse dragging
                var dx = this.lastPointer.x - this.pointer.x;
                var dy = this.lastPointer.y - this.pointer.y;
                this.moveCamera(dx, dy);

                this.lastPointer = this.pointer;
            }

            if (this.cursors.up.isDown) {
                // this.camera.y -= 4;
                this.zoomIn(0.1);
            }
            else if (this.cursors.down.isDown) {
                // this.camera.y += 4;
                this.zoomOut(0.1);
            }

            if (this.cursors.left.isDown) {
                this.camera.x -= 4;
            }
            else if (this.cursors.right.isDown) {
                this.camera.x += 4;
            }
        }

        map: Phaser.Tilemap;
        ground: Phaser.TilemapLayer;

        marker: Phaser.Graphics;

        create() {

            this.map = this.game.add.tilemap('world1');

            this.map.addTilesetImage('SuperMarioBros');

            this.ground = this.map.createLayer('World1', this.map.widthInPixels, this.map.heightInPixels);

            this.ground.resizeWorld();
            this.ground.debug = true;

            this.camera.bounds.setTo(0, 0, this.map.widthInPixels, this.map.heightInPixels);

            this.setCameraFit();

            this.cursors = this.input.keyboard.createCursorKeys();

            this.marker = this.add.graphics();
            this.marker.lineStyle(2, 0x00bff3, 1);
            this.marker.drawRect(0, 0, 16, 16);

        }

        update() {

            this.editorScreenCheckInput();

            this.checkBounds(this.camera);
        }

        render() {
            // this.game.debug.text(this.pointer.x.toString(), 400, 400);
            this.game.debug.pointer(this.game.input.activePointer);
            this.game.debug.cameraInfo(this.camera, 32, 32);

            this.game.debug.text('Tile X: ' + this.ground.getTileX(this.pointerWorld.x), 32, 48, 'rgb(0,0,0)');
            this.game.debug.text('Tile Y: ' + this.ground.getTileY(this.pointerWorld.y), 32, 64, 'rgb(0,0,0)');
        }
    }
}
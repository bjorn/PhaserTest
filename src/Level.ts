﻿module test {
    export class Level extends Phaser.State {

        tileScale: number;
        tileSize: number;
        cameraScale: number = 1;

        resizeLayer(layer: Phaser.TilemapLayer) {
            layer.scale.setTo(this.tileScale, this.tileScale);
            layer.resizeWorld();
        }

        // Returns min scale
        getFitScale(map: Phaser.Tilemap): number {

            var scale;

            if (map.heightInPixels / this.game.height <= map.widthInPixels / this.game.width) {
                scale = this.game.height / map.heightInPixels;
            } else {
                scale = this.game.width / map.widthInPixels;
            }

            return scale;
        }

        zoomIn(scaleDiff: number) {

            this.cameraScale += scaleDiff;

            this.adjustCameraZoom(this.cameraScale);
        }

        zoomOut(scaleDiff: number) {

            this.cameraScale -= scaleDiff;
            if (this.cameraScale < 1) {
                this.cameraScale = 1;
            }

            this.adjustCameraZoom(this.cameraScale);
        }

        adjustCameraZoom(scale: number) {

            var newWidth = this.game.width / scale;
            var newHeight = this.game.height / scale;

            this.camera.setSize(newWidth, newHeight);
            this.camera.scale.setTo(scale, scale);
        }

        // Move camera based on increments
        moveCamera(dx: number, dy: number) {

            this.camera.x += dx;
            this.camera.y += dy;
        }

        // Move camera to selected x and y coordinates
        setCameraPos(x: number, y: number) {

            this.camera.x = x;
            this.camera.y = y;
        }

        // A function to replace check bounds from the default camera
        // Default function doesn't works well with scaling
        checkCameraBounds(camera: Phaser.Camera) {

            if (camera.x > camera.bounds.width - camera.width) {
                camera.x = camera.bounds.width - camera.width;
            }
            if (camera.y > camera.bounds.height - camera.height) {
                camera.y = camera.bounds.height - camera.height;
            }
        }

        // Returns pointer location in screen adjusted to camera scale
        getPointerLoc(): Phaser.Point {

            var x, y;
            x = this.input.activePointer.x / this.cameraScale;
            y = this.input.activePointer.y / this.cameraScale;

            return new Phaser.Point(x, y);
        }

        // Returns pointer location in world adjusted to camera scale
        getPointerWorldLoc(): Phaser.Point {

            var x, y;
            x = this.camera.x + this.getPointerLoc().x;
            y = this.camera.y + this.getPointerLoc().y;

            return new Phaser.Point(x, y);
        }

        // Returns pointer location in world before scaling
        getPointerTileLoc(): Phaser.Point {

            var x, y;
            x = this.getPointerWorldLoc().x / this.tileScale;
            y = this.getPointerWorldLoc().y / this.tileScale;

            return new Phaser.Point(x, y);
        }

        lastPointer: Phaser.Point = new Phaser.Point();
        pointer: Phaser.Point = new Phaser.Point();

        pointerWorld: Phaser.Point = new Phaser.Point();

        // Handles inputs in editor mode to move the screen
        editorScreenCheckInput() {

            if (this.game.input.activePointer.justPressed) {
                this.lastPointer = this.pointer;
            }

            this.pointer = this.getPointerLoc();
            this.pointerWorld = this.getPointerWorldLoc();

            if (this.game.input.activePointer.isDown) {
                // dx and dy are reversed to match mouse dragging
                var dx = this.lastPointer.x - this.pointer.x;
                var dy = this.lastPointer.y - this.pointer.y;
                this.moveCamera(dx, dy);

                this.lastPointer = this.pointer;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.EQUALS)) {
                // this.camera.y -= 4;
                this.zoomIn(0.05);
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.MINUS)) {
                // this.camera.y += 4;
                this.zoomOut(0.05);
            }
        }

        map: Phaser.Tilemap;
        background: Phaser.TilemapLayer;
        ground: Phaser.TilemapLayer;
        platform: Phaser.TilemapLayer;
        misc: Phaser.TilemapLayer;

        player: test.Player;

        marker: Phaser.Graphics;

        create() {

            // Set up the Tile map
            this.map = this.game.add.tilemap('world1');
            this.map.addTilesetImage('SuperMarioBros');

            // Get the scale to fit screen
            this.tileScale = this.getFitScale(this.map);
            this.tileSize = this.map.tileHeight * this.tileScale;

            // Adding the layers
            this.background = this.map.createLayer('Background');
            this.resizeLayer(this.background);
            this.ground = this.map.createLayer('Ground');
            this.resizeLayer(this.ground);
            this.platform = this.map.createLayer('Platform');
            this.resizeLayer(this.platform);
            this.misc = this.map.createLayer('Misc');
            this.resizeLayer(this.misc);

            // Add player
            this.player = new Player(this.game, 200, 200);

            // Create the box cursor
            this.marker = this.add.graphics();
            this.marker.lineStyle(2, 0x00bff3, 1);
            this.marker.drawRect(0, 0, this.tileSize, this.tileSize);
        }

        update() {

            this.editorScreenCheckInput();

            this.marker.x = this.ground.getTileX(this.getPointerTileLoc().x) * this.tileSize;
            this.marker.y = this.ground.getTileY(this.getPointerTileLoc().y) * this.tileSize;

            this.checkCameraBounds(this.camera);
        }

        render() {

            var x, y;
            x = this.ground.getTileX(this.getPointerTileLoc().x);
            y = this.ground.getTileX(this.getPointerTileLoc().y);
            this.game.debug.text('Tile X: ' + x, 32, 48, 'rgb(0,0,0)');
            this.game.debug.text('Tile Y: ' + y, 32, 64, 'rgb(0,0,0)');
        }
    }
}
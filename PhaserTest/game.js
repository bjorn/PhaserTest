window.onload = function () {
    var game = new test.main();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test;
(function (test) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.image('loading_bar', 'assets/loading_bar.png');
        };
        Boot.prototype.create = function () {
            this.stage.setBackgroundColor('#000000');
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.pageAlignHorizontally = true;
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preload', true, false);
        };
        return Boot;
    }(Phaser.State));
    test.Boot = Boot;
})(test || (test = {}));
var test;
(function (test) {
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lastPointer = new Phaser.Point();
            _this.pointer = new Phaser.Point();
            _this.pointerWorld = new Phaser.Point();
            return _this;
        }
        // Returns max scale that doesn't go out of bounds
        Level.prototype.getFitScale = function (map) {
            var scale;
            if (map.heightInPixels / this.game.height <= map.widthInPixels / this.game.width) {
                scale = this.game.height / map.heightInPixels;
            }
            else {
                scale = this.game.width / map.widthInPixels;
            }
            return scale;
        };
        // Set camera zoom to fit map
        Level.prototype.setCameraFit = function () {
            this.cameraScale = this.getFitScale(this.map);
            this.adjustCameraZoom(this.cameraScale);
        };
        Level.prototype.zoomIn = function (scaleDiff) {
            this.cameraScale += scaleDiff;
            this.adjustCameraZoom(this.cameraScale);
        };
        Level.prototype.zoomOut = function (scaleDiff) {
            this.cameraScale -= scaleDiff;
            if (this.cameraScale < this.getFitScale(this.map)) {
                this.cameraScale = this.getFitScale(this.map);
            }
            this.adjustCameraZoom(this.cameraScale);
        };
        Level.prototype.adjustCameraZoom = function (scale) {
            var newWidth = this.game.width / scale;
            var newHeight = this.game.height / scale;
            //this.camera.setSize(newWidth, newHeight);
            this.camera.scale.setTo(scale, scale);
        };
        // A function to replace check bounds from the default camera
        // Default function doesn't works well with scaling
        Level.prototype.checkBounds = function (camera) {
            if (camera.x > camera.bounds.width - camera.width) {
                camera.x = camera.bounds.width - camera.width;
            }
            if (camera.y > camera.bounds.height - camera.height) {
                camera.y = camera.bounds.height - camera.height;
            }
        };
        // Returns adjusted pointer location with respect to the world location
        Level.prototype.adjustPointerWorld = function (activePointer) {
            var x = this.camera.x + activePointer.x / this.cameraScale;
            var y = this.camera.y + activePointer.y / this.cameraScale;
            var point = new Phaser.Point(x, y);
            return point;
        };
        // Returns adjusted pointer location based on the screen
        Level.prototype.adjustPointerScreen = function (activePointer) {
            var x = activePointer.x / this.cameraScale;
            var y = activePointer.y / this.cameraScale;
            var point = new Phaser.Point(x, y);
            return point;
        };
        // Move camera based on increments
        Level.prototype.moveCamera = function (dx, dy) {
            this.camera.x += dx;
            this.camera.y += dy;
        };
        // Move camera to selected x and y coordinates
        Level.prototype.setCameraPos = function (x, y) {
            this.camera.x = x;
            this.camera.y = y;
        };
        // Handles inputs in editor mode to move the screen
        Level.prototype.editorScreenCheckInput = function () {
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
        };
        Level.prototype.create = function () {
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
        };
        Level.prototype.update = function () {
            this.editorScreenCheckInput();
            this.checkBounds(this.camera);
        };
        Level.prototype.render = function () {
            // this.game.debug.text(this.pointer.x.toString(), 400, 400);
            this.game.debug.pointer(this.game.input.activePointer);
            this.game.debug.cameraInfo(this.camera, 32, 32);
            this.game.debug.text('Tile X: ' + this.ground.getTileX(this.pointerWorld.x), 32, 48, 'rgb(0,0,0)');
            this.game.debug.text('Tile Y: ' + this.ground.getTileY(this.pointerWorld.y), 32, 64, 'rgb(0,0,0)');
        };
        return Level;
    }(Phaser.State));
    test.Level = Level;
})(test || (test = {}));
var test;
(function (test) {
    var main = /** @class */ (function (_super) {
        __extends(main, _super);
        function main() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', test.Boot, false);
            _this.state.add('Preload', test.Preload, false);
            _this.state.add('Menu', test.Menu, false);
            _this.state.add('Level', test.Level, false);
            _this.state.start('Boot');
            return _this;
        }
        return main;
    }(Phaser.Game));
    test.main = main;
})(test || (test = {}));
var test;
(function (test) {
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Menu.prototype.create = function () {
        };
        return Menu;
    }(Phaser.State));
    test.Menu = Menu;
})(test || (test = {}));
var test;
(function (test) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preload.prototype.preload = function () {
            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loading_bar');
            this.game.load.setPreloadSprite(this.preloadBar);
            this.load.tilemap('world1', 'assets/mario.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('SuperMarioBros', 'assets/super_mario.png');
        };
        Preload.prototype.create = function () {
            this.game.state.start('Level', true, false);
        };
        return Preload;
    }(Phaser.State));
    test.Preload = Preload;
})(test || (test = {}));
//# sourceMappingURL=game.js.map
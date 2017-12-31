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
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            }
            else {
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.setMinMax(480, 260, 1024, 768);
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.image('loading_bar', 'assets/loading_bar.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preload');
        };
        return Boot;
    }(Phaser.State));
    test.Boot = Boot;
})(test || (test = {}));
var test;
(function (test) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cameraScale = 1;
            _this.lastPointer = new Phaser.Point();
            _this.pointer = new Phaser.Point();
            _this.pointerWorld = new Phaser.Point();
            return _this;
        }
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
        Level.prototype.zoomIn = function (scaleDiff) {
            this.cameraScale += scaleDiff;
            this.adjustCameraZoom(this.cameraScale);
        };
        Level.prototype.zoomOut = function (scaleDiff) {
            this.cameraScale -= scaleDiff;
            if (this.cameraScale < 1) {
                this.cameraScale = 1;
            }
            this.adjustCameraZoom(this.cameraScale);
        };
        Level.prototype.adjustCameraZoom = function (scale) {
            var newWidth = this.game.width / scale;
            var newHeight = this.game.height / scale;
            this.camera.setSize(newWidth, newHeight);
            this.camera.scale.setTo(scale, scale);
        };
        Level.prototype.moveCamera = function (dx, dy) {
            this.camera.x += dx;
            this.camera.y += dy;
        };
        Level.prototype.setCameraPos = function (x, y) {
            this.camera.x = x;
            this.camera.y = y;
        };
        Level.prototype.checkCameraBounds = function (camera) {
            if (camera.x > camera.bounds.width - camera.width) {
                camera.x = camera.bounds.width - camera.width;
            }
            if (camera.y > camera.bounds.height - camera.height) {
                camera.y = camera.bounds.height - camera.height;
            }
        };
        Level.prototype.getPointerLoc = function () {
            var x, y;
            x = this.input.activePointer.x / this.cameraScale;
            y = this.input.activePointer.y / this.cameraScale;
            return new Phaser.Point(x, y);
        };
        Level.prototype.getPointerWorldLoc = function () {
            var x, y;
            x = this.camera.x + this.getPointerLoc().x;
            y = this.camera.y + this.getPointerLoc().y;
            return new Phaser.Point(x, y);
        };
        Level.prototype.getPointerTileLoc = function () {
            var x, y;
            x = this.getPointerWorldLoc().x / this.tileScale;
            y = this.getPointerWorldLoc().y / this.tileScale;
            return new Phaser.Point(x, y);
        };
        Level.prototype.editorScreenCheckInput = function () {
            if (this.game.input.activePointer.justPressed) {
                this.lastPointer = this.pointer;
            }
            this.pointer = this.getPointerLoc();
            this.pointerWorld = this.getPointerWorldLoc();
            if (this.game.input.activePointer.isDown) {
                var dx = this.lastPointer.x - this.pointer.x;
                var dy = this.lastPointer.y - this.pointer.y;
                this.moveCamera(dx, dy);
                this.lastPointer = this.pointer;
            }
            if (this.cursors.up.isDown) {
                this.zoomIn(0.05);
            }
            else if (this.cursors.down.isDown) {
                this.zoomOut(0.05);
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
            this.tileScale = this.getFitScale(this.map);
            this.tileSize = this.map.tileHeight * this.tileScale;
            this.ground.scale.setTo(this.tileScale, this.tileScale);
            this.ground.resizeWorld();
            this.ground.debug = true;
            this.cursors = this.input.keyboard.createCursorKeys();
            this.marker = this.add.graphics();
            this.marker.lineStyle(2, 0x00bff3, 1);
            this.marker.drawRect(0, 0, this.tileSize, this.tileSize);
        };
        Level.prototype.update = function () {
            this.editorScreenCheckInput();
            this.marker.x = this.ground.getTileX(this.getPointerTileLoc().x) * this.tileSize;
            this.marker.y = this.ground.getTileY(this.getPointerTileLoc().y) * this.tileSize;
            this.checkCameraBounds(this.camera);
        };
        Level.prototype.render = function () {
            var x, y;
            x = this.ground.getTileX(this.getPointerTileLoc().x);
            y = this.ground.getTileX(this.getPointerTileLoc().y);
            this.game.debug.text('Tile X: ' + x, 32, 48, 'rgb(0,0,0)');
            this.game.debug.text('Tile Y: ' + y, 32, 64, 'rgb(0,0,0)');
        };
        return Level;
    }(Phaser.State));
    test.Level = Level;
})(test || (test = {}));
var test;
(function (test) {
    var main = (function (_super) {
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
    var Menu = (function (_super) {
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
var MyGame;
(function (MyGame) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.game.physics.arcade.enableBody(_this);
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(_this);
            return _this;
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    }(Phaser.Sprite));
    MyGame.Player = Player;
})(MyGame || (MyGame = {}));
var test;
(function (test) {
    var Preload = (function (_super) {
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
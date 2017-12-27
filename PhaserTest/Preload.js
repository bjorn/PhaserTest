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
//# sourceMappingURL=Preload.js.map
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
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level.prototype.create = function () {
            this.map = this.game.add.tilemap('world1');
            this.map.addTilesetImage('SuperMarioBros');
            this.ground = this.map.createLayer('World1');
            this.ground.resizeWorld();
            this.ground.debug = true;
            this.game.camera.scale.setTo(2, 2);
        };
        return Level;
    }(Phaser.State));
    test.Level = Level;
})(test || (test = {}));
//# sourceMappingURL=Level.js.map
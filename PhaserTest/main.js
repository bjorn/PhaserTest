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
//# sourceMappingURL=main.js.map
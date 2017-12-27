module test {
    export class main extends Phaser.Game {

        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preload', Preload, false);
            this.state.add('Menu', Menu, false);
            this.state.add('Level', Level, false);

            this.state.start('Boot');
        }
    }
}
module test {
    export class Boot extends Phaser.State {

        preload() {
            this.load.image('loading_bar', 'assets/loading_bar.png')
        }

        create() {
            this.stage.setBackgroundColor('#000000');

            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.pageAlignHorizontally = true;

            this.input.maxPointers = 1;

            this.stage.disableVisibilityChange = true;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.game.state.start('Preload', true, false);
        }
    }
}
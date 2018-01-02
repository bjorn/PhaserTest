module test {
    export class Preload extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loading_bar');
            this.game.load.setPreloadSprite(this.preloadBar);

            this.load.tilemap('world1', 'assets/mario.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('SuperMarioBros', 'assets/super_mario.png');
            this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        }

        create() {

            this.game.state.start('Level1', true, false);
        }
    }
}
module test {

	export class Boot extends Phaser.State {

		init() {

			this.input.maxPointers = 1;

			//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
			this.stage.disableVisibilityChange = true;

			// Enable physics
			this.physics.startSystem(Phaser.Physics.ARCADE);
			this.physics.arcade.gravity.y = 400;

			if (this.game.device.desktop) {
				this.scale.pageAlignHorizontally = true;
			}
			else {
				this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				this.scale.setMinMax(480, 260, 1024, 768);
				this.scale.forceLandscape = true;
				this.scale.pageAlignHorizontally = true;
			}

		}

		preload() {

			this.load.image('loading_bar', 'assets/loading_bar.png');
		}

		create() {
			
			this.game.state.start('Preload');
		}
	}
}

module test {

	export class Boot extends Phaser.State {

		init() {
			//  Unless you specifically need to support multitouch I would recommend setting this to 1
			this.input.maxPointers = 1;

			//  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
			this.stage.disableVisibilityChange = true;

			// Enable physics
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

		}

		preload() {
			this.load.image('loading_bar', 'assets/loading_bar.png');
		}

		create() {
			this.game.state.start('Preload');
		}
	}
}

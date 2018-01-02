module test {

	export class Player extends Phaser.Sprite {

		constructor(game: Phaser.Game, x: number, y: number) {

			super(game, x, y, 'dude', 0);

			game.physics.enable(this);

			this.scale.setTo(2, 2);

			this.animations.add('left', [0, 1, 2, 3], 10, true);
			this.animations.add('right', [5, 6, 7, 8], 10, true);

			this.body.collideWorldBounds = true;
			this.body.setSize(20, 32, 5, 16);

			game.add.existing(this);
		}

		update() {

			this.body.velocity.x = 0;

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

				this.body.velocity.x = -300;
				this.animations.play('left');
			}
			else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

				this.body.velocity.x = 300;
				this.animations.play('right');
			}
			else {
				this.animations.stop();
				this.frame = 4;
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				this.body.velocity.y = -300;
			}

		}

	}

}
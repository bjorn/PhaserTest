module test {
    export class Level1 extends Phaser.State {

        level: test.TiledLevel;

        pointer: test.Pointer;

        background: Phaser.TilemapLayer
        ground: Phaser.TilemapLayer;
        platform: Phaser.TilemapLayer;
        misc: Phaser.TilemapLayer;

        player: test.Player;

        marker: Phaser.Graphics;

        create() {

            // Add and set up the map
            this.level = new TiledLevel(this.game, 'world1', 'SuperMarioBros');
            // this.map.setCollision([13, 14, 15, 20, 21, 26, 27, 39]);

            // Create the pointer for controls
            this.pointer = new Pointer(this.game, this.level);

            // Adding the layers
            this.background = this.level.addLayer('Background');
            this.ground = this.level.addLayer('Ground');
            this.platform = this.level.addLayer('Platform');
            this.misc = this.level.addLayer('Misc');

            // Add player
            this.player = new Player(this.game, 200, 200);

            // Create the box cursor
            this.marker = this.add.graphics();
            this.marker.lineStyle(2, 0x00bff3, 1);
            this.marker.drawRect(0, 0, this.level.tileSize, this.level.tileSize);
            
        }

        update() {

            // The update function has to be called manually
            this.pointer.update();

            this.game.physics.arcade.collide(this.player, this.ground);
            // this.game.physics.arcade.collide(this.player, this.platform);

            // Update the marker location based on pointer location
            this.marker.x = this.ground.getTileX(this.pointer.tileLoc.x) * this.level.tileSize;
            this.marker.y = this.ground.getTileY(this.pointer.tileLoc.y) * this.level.tileSize;
        }

        render() {

            // Draw the tile location
            var x, y;
            x = this.ground.getTileX(this.pointer.tileLoc.x);
            y = this.ground.getTileX(this.pointer.tileLoc.y);
            this.game.debug.text('Tile X: ' + x, 32, 48, 'rgb(0,0,0)');
            this.game.debug.text('Tile Y: ' + y, 32, 64, 'rgb(0,0,0)');
        }
    }
}
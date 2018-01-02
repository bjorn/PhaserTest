module test {

    export class TiledLevel {
        
        game: Phaser.Game;
        map: Phaser.Tilemap;
        tileScale: number;
        tileSize: number;

        constructor(game: Phaser.Game, mapKey: string, tileKey: string) {

            this.game = game;
            this.map = this.game.add.tilemap(mapKey);
            this.map.addTilesetImage(tileKey);
            this.tileScale = this.getFitScale();
            this.tileSize = this.map.tileHeight * this.tileScale;
        }

        // Returns min scale
        getFitScale(): number {

            var scale;

            if (this.map.heightInPixels / this.game.height <= this.map.widthInPixels / this.game.width) {
                scale = this.game.height / this.map.heightInPixels;
            } else {
                scale = this.game.width / this.map.widthInPixels;
            }

            return scale;
        }

        // Resize layer according to scale
        resizeLayer(layer: Phaser.TilemapLayer, scale: number = this.tileScale) {

            layer.setScale(scale, scale);
            layer.resizeWorld();
        }

        // Used to return a resized TilemapLayer
        addLayer(layerKey: string): Phaser.TilemapLayer {

            var layer = this.map.createLayer(layerKey);
            this.resizeLayer(layer);

            return layer;
        }
    }
}
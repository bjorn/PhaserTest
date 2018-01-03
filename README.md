# PhaserTest

A simple project to demonstrate Tiled maps running on Phaser, a HTML5 game framework.
This demo features a controllable character which can collide with selected tiles in the map, it also supports moving the camera by dragging the mouse, and zooming the camera (although a bit buggy).
This project also has an example on how to put and remove tiles after loading a layer in the map.

## Controls

Left and right arrow keys to control the character, spacebar to jump.

Up arrow key to zoom in, down arrow key to zoom out.

Esc to toggle between camera modes, one will follow the player automatically, the other for controlling manually by dragging the mouse.

When the camera is set to follow the player, press the left button to put new coin tiles, moving the character towards any coin tile will remove them from the map.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* typescript
* http-server

### Installing

Assuming you have cloned the project and had the prerequisites installed globally, go to the project root and run the following commands:

```
tsc --project .
http-server
```

In your web browser, go to `http:\\localhost:8080`, to check that the web server is running the game locally.

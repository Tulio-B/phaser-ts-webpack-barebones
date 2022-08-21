import "phaser";
import { MainScene } from "./scenes/mainScene";

class Game {
  private game: Phaser.Game;
  private config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    banner: {
      //hidePhaser: true
    },
    render: {
      antialias: false,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
  };

  create = () => {
    this.game = new Phaser.Game(this.config);
    this.game.scene.add("MainScene", new MainScene());
    this.game.scene.start("MainScene");
  };
}

window.addEventListener("load", () => {
  const game = new Game();
  game.create();
});
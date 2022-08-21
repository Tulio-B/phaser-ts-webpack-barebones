export class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload(): void {
    this.load.spritesheet("sprites", "assets/sprites.png", { frameWidth: 16, frameHeight: 16 });
    this.load.bitmapFont("Upheaval", "assets/Upheaval.png", "assets/Upheaval.fnt");
  }

  create(): void {
    const particleEmitter = this.add.particles("sprites");
    particleEmitter.createEmitter({
      frame: [0, 1, 2, 3],
      x: 0,
      y: this.game.renderer.height + 30,
      lifespan: 9000,
      speed: { min: 400, max: 900 },
      angle: { min: 230, max: 310 },
      gravityY: 400,
      scale: { start: 1, end: 2 },
      quantity: 1,
      blendMode: Phaser.BlendModes.NORMAL,
    });

    this.add.tween({
      targets: particleEmitter,
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 4000,
      x: this.game.config.width,
      yoyo: true,
      loop: -1,
    });

    const hello = this.add.bitmapText(300, 200, "Upheaval", "Hello World!", 64);
    hello.setAngle(-2);

    this.add.tween({
      targets: hello,
      angle: 4,
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 2000,
      yoyo: true,
      loop: -1,
    });
  }
}

//PostFX pipeline - used in the Hello World! text
export default class HueRotatePipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  public static readonly KEY = "HueRotate";

  constructor(game: Phaser.Game) {
    super({
      game,
      fragShader: `
        precision mediump float;
              
        varying vec2 outTexCoord;
        uniform sampler2D uMainSampler;
        uniform float time;

        void main(void) {
          vec2 uv = outTexCoord;
          vec4 texColor = texture2D(uMainSampler, uv);
          
          float c = cos(time / 500.0);
          float s = sin(time / 500.0);
          mat4 r = mat4(0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.299, 0.587, 0.114, 0.0, 0.0,  0.0, 0.0, 1.0);
          mat4 g = mat4(0.701, -0.587, -0.114, 0.0, -0.299, 0.413, -0.114, 0.0, -0.300, -0.588, 0.886, 0.0, 0.0, 0.0, 0.0, 0.0);
          mat4 b = mat4(0.168, 0.330, -0.497, 0.0, -0.328, 0.035, 0.292, 0.0, 1.250, -1.050, -0.203, 0.0, 0.0, 0.0, 0.0, 0.0);
          mat4 hueRotation = r + g * c + b * s;
          
          gl_FragColor = texColor * hueRotation;
        }
      `,
    });
  }
}

export class MainScene extends Phaser.Scene {
  private helloWorld: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: "MainScene",
    });
  }

  preload(): void {
    this.load.spritesheet("sprites", "assets/sprites.png", { frameWidth: 16, frameHeight: 16 });
    this.load.bitmapFont("Upheaval", "assets/Upheaval.png", "assets/Upheaval.fnt");
    this.load.glsl("stars", "assets/shaders/stars.frag");
  }

  create(): void {
    this.add.shader("stars", 0, 0, 800, 600).setOrigin(0);
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

    this.helloWorld = this.add.bitmapText(300, 200, "Upheaval", "Hello World!", 64);
    this.helloWorld.setAngle(-2);

    const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    renderer.pipelines.addPostPipeline(HueRotatePipeline.KEY, HueRotatePipeline);
    this.helloWorld.setPostPipeline(HueRotatePipeline);

    this.add.tween({
      targets: this.helloWorld,
      angle: 4,
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 2000,
      yoyo: true,
      loop: -1,
    });
  }

  update(time: number): void {
    const pipeline = this.helloWorld.getPostPipeline(HueRotatePipeline) as HueRotatePipeline;
    pipeline.set1f("time", time);
  }
}

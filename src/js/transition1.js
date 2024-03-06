export default class transition1 extends Phaser.Scene {
  constructor() {
    super({ key: "transition1" });
  }
  //on charge les images
  preload() {
    this.load.image("transition1", "src/assets/transition1.png");
  }

  create() {
    // on place les éléments de fond
    this.add.image(400, 300, "transition1");
  }

  update() {
    this.time.addEvent({
      delay: 6000,
      callback: function () {
        this.scene.start("niveau2");
      },
      callbackScope: this
    });
  }
}
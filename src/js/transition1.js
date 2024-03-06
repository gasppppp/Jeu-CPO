import Phaser from "phaser";

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
    this.add.image(0, 0, "transition1").setOrigin(0).setDepth(0);
  }

  update() {
    this.time.addEvent({
      delay: 2000,
      callback: function () {
        this.scene.start("niveau2");
      },
      callbackScope: this
    });
  }
}
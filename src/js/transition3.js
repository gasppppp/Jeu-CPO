export default class transition3 extends Phaser.Scene {
    constructor() {
      super({ key: "transition3" });
    }
    //on charge les images
    preload() {
      
    }
  
    create() {
       // Créez une nouvelle scène pour les règles du jeu
var reglesScene = new Phaser.Scene('fin');

reglesScene.create = function () {

    // Fond bleu foncé
    var fond = this.add.rectangle(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        this.cameras.main.width,
        this.cameras.main.height,
        0x000033
    );
    fond.setOrigin(0.5);

    // Texte des règles
    var reglesTexte = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        "Félicitations !!! T'as fini le jeu comme NI !",
        {
            font: "bold 24px Arial",
            fill: "#ffffff",
            stroke: "null",
            align: 'center'
        }
    );
    reglesTexte.setOrigin(0.5);
    }
  
    // Ajoutez la nouvelle scène au gestionnaire de scènes de Phaser
    this.scene.add('fin', reglesScene);
    }
  
    update() {
      
    }
  }
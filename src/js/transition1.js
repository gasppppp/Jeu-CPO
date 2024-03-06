//import Phaser from "phaser";



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
    this.add.image(400, 300, "transition1"); //.setOrigin(0).setDepth(0)
      // Ajout du bouton "Règles du jeu"
  var reglesBouton = this.add.text(
    this.cameras.main.width / 2,
    100,
    "Règles du Niveau 2",
    {
        font: "bold 24px Arial",
        fill: "#ffffff",
        stroke: "#ffA500",
        strokeThickness: 4
    }
  );
  reglesBouton.setOrigin(0.5, 0.8);
  reglesBouton.setInteractive();

  // Ajouter un événement de survol au bouton "Règles du jeu"
  reglesBouton.on('pointerover', function () {
    reglesBouton.setScale(1.2);  // Grossir le texte lors du survol
  });

  // Ajouter un événement de survol au bouton "Règles du jeu"
  reglesBouton.on('pointerout', function () {
    reglesBouton.setScale(1);  // Rétablir la taille normale lorsque la souris quitte
  });

  // Ajouter un événement de clic au bouton
  reglesBouton.on('pointerdown', function () {
    this.scene.launch('reglesNiv2'); // 'reglesScene' est le nom de la nouvelle scène
  }, this);

    // Créez une nouvelle scène pour les règles du jeu
  var reglesScene = new Phaser.Scene('reglesNiv2');

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
          "Pour le niveau 2, tu as 4 armes contenant 8 balles chacune.\nBonne chance !",
          {
              font: "bold 24px Arial",
              fill: "#ffffff",
              stroke: "null",
              align: 'center'
          }
      );
      reglesTexte.setOrigin(0.5);


  // Ajouter un bouton "Fermer" pour revenir à la scène principale
  var fermerBouton = this.add.text(
    this.cameras.main.width / 2,
    this.cameras.main.height - 50,
    "Fermer",
    {
        font: "bold 20px Arial",
        fill: "#ffffff",
        stroke: "#ffA500",
        strokeThickness: 3
    }
  );
  fermerBouton.setOrigin(0.5);
  fermerBouton.setInteractive();


    // Ajouter un événement de survol au bouton "Fermer"
  fermerBouton.on('pointerover', function () {
    fermerBouton.setScale(1.2);  // Grossir le texte lors du survol
  });

  // Ajouter un événement de survol au bouton "Fermer"
  fermerBouton.on('pointerout', function () {
    fermerBouton.setScale(1);  // Rétablir la taille normale lorsque la souris quitte
  });

  // Ajouter un événement de clic au bouton "Fermer"
  fermerBouton.on('pointerdown', function () {
  this.scene.stop('reglesNiv2');  // Ferme la scène des règles
  }, this);  
}

  // Ajoutez la nouvelle scène au gestionnaire de scènes de Phaser
  this.scene.add('reglesNiv2', reglesScene);
  }

  update() {
    this.time.addEvent({
      delay: 8000,
      callback: function () {
        this.scene.start("niveau2");
      },
      callbackScope: this
    });
  }
}
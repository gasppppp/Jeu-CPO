export default class transition2 extends Phaser.Scene {
    constructor() {
      super({ key: "transition2" });
    }
    //on charge les images
    preload() {
      this.load.image("transition2", "src/assets/transition2.png");
    }
  
    create() {
      // on place les éléments de fond
      this.add.image(625, 468.75, "transition2");
        // Ajout du bouton "Règles du jeu"
    var reglesBouton = this.add.text(
      this.cameras.main.width / 2,
      100,
      "Règles du Niveau 3",
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
      this.scene.launch('reglesNiv3'); // 'reglesScene' est le nom de la nouvelle scène
    }, this);
  
      // Créez une nouvelle scène pour les règles du jeu
    var reglesScene = new Phaser.Scene('reglesNiv3');
  
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
            "Bravo tu as réussi le niveau 2 !\nPour le niveau 3, tu as 5 armes contenant 14 balles chacune.\nAttention, les monstres sont maintenant au nombre\nde 12 et possèdent 4 vies...\nUn dernier effort et tu trouveras l'étoile !\nPS : Oui le dernier saut est faisable ;)",
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
    this.scene.stop('reglesNiv3');  // Ferme la scène des règles
    }, this);  
  }
  
    // Ajoutez la nouvelle scène au gestionnaire de scènes de Phaser
    this.scene.add('reglesNiv3', reglesScene);
    }
  
    update() {
      this.time.addEvent({
        delay: 8000,
        callback: function () {
          this.scene.start("niveau3");
        },
        callbackScope: this
      });
    }
  }
import * as fct from "/src/js/fonctions.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
var groupe_plateformes;
var bienvenueTexte;

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_paysage", "src/assets/assets_bienvenue/image_ecran_bienvenue.png");
    
    this.load.image("img_plateforme", "src/assets/assets_bienvenue/platform.png");
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.image("img_porte1", "src/assets/assets_bienvenue/door1.png");
    this.load.image("img_porte2", "src/assets/assets_bienvenue/door2.png");
    this.load.image("img_porte3", "src/assets/assets_bienvenue/door3.png");
  }

  
  create() {
      fct.doNothing();
      fct.doAlsoNothing();

    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/

    // On ajoute une simple image de fond, le ciel, au centre de la zone affichée (400, 300)
    // Par défaut le point d'ancrage d'une image est le centre de cette derniere
    this.add.image(400, 300, "img_paysage");

    // la création d'un groupes permet de gérer simultanément les éléments d'une meme famille
    //  Le groupe groupe_plateformes contiendra le sol et deux platesformes sur lesquelles sauter
    // notez le mot clé "staticGroup" : le static indique que ces élements sont fixes : pas de gravite,
    // ni de possibilité de les pousser.
    groupe_plateformes = this.physics.add.staticGroup();
    // une fois le groupe créé, on va créer les platesformes , le sol, et les ajouter au groupe groupe_plateformes

    // l'image img_plateforme fait 400x32. On en met 2 à coté pour faire le sol
    // la méthode create permet de créer et d'ajouter automatiquement des objets à un groupe
    // on précise 2 parametres : chaque coordonnées et la texture de l'objet, et "voila!"
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");

    //  on ajoute 3 platesformes flottantes
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");

    /****************************
     *  Ajout des portes   *
     ****************************/
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(775, 234, "img_porte3");


    player = this.physics.add.sprite(100, 450, "img_perso");
    player.direction = 'right';  
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
    player.setSize(20,48);
    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 3,
        end: 5
      }), // on prend toutes les frames de img perso numerotées de 3 à 5
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 1 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", {
        start: 6,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();

    //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(player, groupe_plateformes);

    // Ajout du texte de bienvenue personnalisé
    bienvenueTexte = this.add.text(
      this.cameras.main.width / 2,
      50,
      "Bienvenue dans l'épopée de Dorelys !",
      {
          font: "bold 36px Arial",
          fill: "#ffffff",
          stroke: "#ffA500",
          strokeThickness: 6
      }
  );
  bienvenueTexte.setOrigin(0.5, 0);

  // Ajout du bouton "Règles du jeu"
var reglesBouton = this.add.text(
  this.cameras.main.width / 2,
  100,
  "Règles du jeu",
  {
      font: "bold 24px Arial",
      fill: "#ffffff",
      stroke: "#ffA500",
      strokeThickness: 4
  }
);
reglesBouton.setOrigin(0.5, -0.8);
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
  this.scene.launch('reglesScene'); // 'reglesScene' est le nom de la nouvelle scène
}, this);

  // Créez une nouvelle scène pour les règles du jeu
var reglesScene = new Phaser.Scene('reglesScene');

reglesScene.create = function () {
    // Ajoutez ici le code pour afficher les règles du jeu dans la nouvelle scène

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
        "Règles du jeu\n\nVous êtes Dorelys, une petite fille née hier.\nVous avez perdu vos parents, dommage pour vous !\nIl vous faut donc traverser les trois niveaux pour\nespérer les revoir. Attention, des monstres sont là\npour vous bouffer donc équipez-vous d'une\narme dès que vous le pouvez !",
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
  this.scene.stop('reglesScene');  // Ferme la scène des règles
}, this);  
}

// Ajoutez la nouvelle scène au gestionnaire de scènes de Phaser
this.scene.add('reglesScene', reglesScene);

  
};









  update() {
    
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }
    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
      if (this.physics.overlap(player, this.porte1))
        this.scene.switch("niveau1");
      if (this.physics.overlap(player, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(player, this.porte3))
        this.scene.switch("niveau3");
    }
  }
}

/***********************************************************************/
/** CONFIGURATION GLOBALE DU JEU ET LANCEMENT 
/***********************************************************************/

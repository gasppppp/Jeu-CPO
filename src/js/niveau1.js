var clavier;
var player;
var boutonFeu;
var arme;
var crabes;
var calque_plateformes;

export default class niveau1 extends Phaser.Scene {

  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }


  preload() {
    this.load.image("tuiles_de_jeu", "src/assets/assets_map1/tileset_grotte.png");
    this.load.tilemapTiledJSON("map1", "src/assets/assets_map1/map1.tmj");
    this.load.image("img_crabe", "src/assets/assets_map1/sprite_crabe.png");
  }



  create() {
    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A');
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 3, end: 5 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    }); 4
    this.anims.create({
      key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 6, end: 9 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 1 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_crabe_gauche",
      frames: this.anims.generateFrameNumbers("img_crabe", {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "anim_crabe_droite",
      frames: this.anims.generateFrameNumbers("img_crabe", {
        start: 9,
        end: 11
      }),
      frameRate: 4,
      repeat: -1
    });

    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("map1");
    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage(
      "map1",
      "tuiles_de_jeu"
    );
    // chargement du calque calque_background
    const calque_background = carteDuNiveau.createLayer(
      "Calque_background",
      tileset
    );
    // chargement du calque calque_background_2
    const calque_decor = carteDuNiveau.createLayer(
      "Calque_décor",
      tileset
    );
    // chargement du calque calque_plateformes
    calque_plateformes = carteDuNiveau.createLayer(
      "Calque_plateforme",
      tileset
    );
    // chargement du calque calque_objets
    const calque_objets = carteDuNiveau.createLayer(
      "Calque_Objets",
      tileset
    );
    player = this.physics.add.sprite(200, 500, 'img_perso');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    player.direction = 'right';
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    calque_plateformes.setCollisionByProperty({ estSolide: true });
    // utilisation de la propriété estSolide
    this.physics.add.collider(player, calque_plateformes);

    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 800);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 800);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    // Création d'un groupe pour les crabes
    crabes = this.physics.add.group();

    // Appel de la fonction pour générer un crabe
    this.genererCrabe();
  }

  // Fonction pour générer un crabe aux coordonnées spécifiées
  genererCrabe() {
    const crabe = crabes.create(500, 100, 'img_crabe');
    crabe.setFrame(Phaser.Math.RND.between(0, 2)); // Utilisez un indice aléatoire entre 0 et 2
    crabe.setCollideWorldBounds(true);
    crabe.setBounce(0.2);
    this.physics.add.collider(crabe, calque_plateformes);

    crabe.setVelocityX(120);
    crabe.anims.play("anim_crabe_droite"); // ou "anim_crabe_gauche" selon le besoin

    // Ajoutez le tween pour les mouvements aller-retour
    this.tweens.add({
      targets: crabe,
      x: "+=100", // Déplacez le crabe de 100 pixels vers la droite (ajustez selon vos besoins)
      ease: 'Linear', // Vous pouvez ajuster cela selon vos préférences
      duration: 1000, // Durée d'un aller-retour
      yoyo: true, // Faites le mouvement en sens inverse (retour)
      repeat: -1, // Répétez indéfiniment
    });

    
  }



  update() {
    if (clavier.left.isDown) {
      player.direction = 'left';
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.direction = 'right';
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }
    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
  }
}

/**tirer(player, arme) {
  alert("joueur en position" + player.x + "," + player.y + ", direction du tir: "
    + player.direction);
}*/


/**TWEEN QUI PERMET DE FAIRE BOUGER UN MONSTRE SUR UNE PLATEFORME
 * monstre11_slide = this.tweens.add({
    targets: [monstre11], // on applique le tween sur plateforme_mobile
    paused: true, // de base le tween est en pause
    ease: "Linear", // concerne la vitesse de mouvement : linéaire ici
    duration: 1500, // durée de l'animation pour monter
    yoyo: true, // mode yoyo : une fois terminé on "rembobine" le déplacement
    x: "-=220", // on va déplacer la plateforme de 300 pixel vers le haut par rapport a sa position
    delay: 0, // délai avant le début du tween une fois ce dernier activé
    hold: 100, // délai avant le yoyo : temps que la plate-forme reste en haut
    repeatDelay: 100, // délai avant la répétition : temps que la plate-forme reste en bas
    repeat: -1 // répétition infinity
  });
*/
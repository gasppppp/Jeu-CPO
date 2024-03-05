var enemymove
var clavier;
var player;
var boutonFeu;
var arme;
var cible;

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
    this.load.image("img_gorille", "src/assets/assets_map1/sprite_gorille.png");
    this.load.image("img_lezard", "src/assets/assets_map1/sprite_lezard.png");
     //enemy
     this.load.spritesheet("cible", "src/assets/sprite_gorille.png", {
      frameWidth: 32,
      frameHeight: 64
    });
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
    const calque_plateformes = carteDuNiveau.createLayer(
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
    // Exemple : placer un monstre à la position (300, 200) avec la feuille de sprites "monstre_sprite"
    const monstre1 = this.createMonstre(300, 200, 'img_crabe');
    // Exemple : placer un autre monstre à la position (500, 300) avec une autre feuille de sprites "autre_monstre_sprite"
    const monstre2 = this.createMonstre(500, 300, 'img_gorille');
    // Exemple : placer un autre monstre à la position (500, 300) avec une autre feuille de sprites "autre_monstre_sprite"
    const monstre3 = this.createMonstre(500, 300, 'img_lezard');
     

    
  }

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
    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
    if (cursors.left.isDown) {
      // enregistrement de la direction : gauche
      player.direction = 'left';
      player.setVelocityX(-160);
      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      // enregistrement de la direction : droite
      player.direction = 'right';
      player.setVelocityX(160);
      player.anims.play('right', true);
    }
  }

  tirer(player, arme) {
    alert("joueur en position" + player.x + "," + player.y + ", direction du tir: "
      + player.direction);
  }

  creerMonstre(x, y, spriteKey) {
    const monstre = this.physics.add.sprite(x, y, spriteKey);
    monstre.setCollideWorldBounds(true);
    this.physics.add.collider(monstre, calque_plateformes);
    return monstre;
  } 


}
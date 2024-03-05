var clavier;
var player;
var boutonFeu;
var arme;
var demon;
var enemymove;

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  this.load.image("tuiles_de_jeu1", "src/assets/assets_map3/tileset_ships.png");
  this.load.image("tuiles_de_jeu2", "src/assets/assets_map3/tileset_space.png");
  this.load.image("tuiles_de_jeu3", "src/assets/assets_map3/étoiles.png");
  this.load.tilemapTiledJSON("map3", "src/assets/assets_map3/map3.tmj");
  //enemy
  this.load.spritesheet("demon", "src/assets/assets_map3/sprite_demon.png", {
    frameWidth: 32,
    frameHeight: 64
  });
}

  create() {
    clavier = this.input.keyboard.createCursorKeys();
    //boutonFeu = this.input.keyboard.addKey('A');
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
    const carteDuNiveau = this.add.tilemap("map3");
    // chargement du jeu de tuiles
    const tileset1 = carteDuNiveau.addTilesetImage(
      "tileset_ships",
      "tuiles_de_jeu1",
    );
    const tileset2 = carteDuNiveau.addTilesetImage(
      "tileset_space",
      "tuiles_de_jeu2"
    );
    const tileset3 = carteDuNiveau.addTilesetImage(
      "étoiles",
      "tuiles_de_jeu3"
    );
    // chargement du calque calque_background
    const calque_background = carteDuNiveau.createLayer(
      "Calque_background",
      [tileset1,
      tileset2,
      tileset3],
      0,
      0);

    // chargement du calque calque_background_2
    const calque_decor = carteDuNiveau.createLayer(
      "Calque_Décor",
      [tileset1,
        tileset2,
        tileset3],
        0,
        0);
    // chargement du calque calque_plateformes
    const calque_plateformes = carteDuNiveau.createLayer(
      "Calque_plateformes",
      [tileset1,
        tileset2,
        tileset3],
        0,
        0);
    // chargement du calque calque_objets
    const calque_objets = carteDuNiveau.createLayer(
      "Calque_objet",
      [tileset1,
        tileset2,
        tileset3],
        0,
        0);
    
    player = this.physics.add.sprite(400, 4550, 'img_perso');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    calque_plateformes.setCollisionByProperty({ estSolide: true });
    // utilisation de la propriété estSolide
    this.physics.add.collider(player, calque_plateformes);
    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 800, 4800);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 800, 4800);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    demon = this.physics.add.group();
    var e1 = demon.create(300, 448, "demon");
    var e2 = demon.create(25, 864, "demon");
    var e3 = demon.create(500, 1056, "demon");
    var e4 = demon.create(500, 1376, "demon");
    var e5 = demon.create(40, 1312, "demon");
    var e6 = demon.create(160, 1888, "demon");
    var e7 = demon.create(128, 3040, "demon");
    var e8 = demon.create(400, 4700, "demon");
    var e9 = demon.create(128, 3040, "demon");
    var e10 = demon.create(400, 4700, "demon");
    var e11 = demon.create(128, 3040, "demon");
    var e12 = demon.create(224, 4416, "demon");

    //this.physics.add.collider(demon, player);
    this.physics.add.collider(demon, calque_plateformes);
    
    
    

    //enemy animation
     this.anims.create({
      key: "enemyMoves",
      frames: this.anims.generateFrameNumbers("demon", {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    });

    enemymove = this.tweens.add({
      targets: demon.getChildren(),
      ease: "Linear",
      duration: 3000,
      yoyo: true,
      x: "+=100",
      delay: 0,
      hold: 0,
      repeatDelay: 0,
      repeat: -1
    });
    e1.anims.play("enemyMoves", true);
    e2.anims.play("enemyMoves", true);
    e3.anims.play("enemyMoves", true);
    e4.anims.play("enemyMoves", true);
    e5.anims.play("enemyMoves", true);
    e6.anims.play("enemyMoves", true);
    e7.anims.play("enemyMoves", true);
    e8.anims.play("enemyMoves", true);
    e9.anims.play("enemyMoves", true);
    e10.anims.play("enemyMoves", true);
    e11.anims.play("enemyMoves", true);
    e12.anims.play("enemyMoves", true);
    
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

    /**if (cursors.left.isDown) {
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
    }*/
  }

  /**tirer(player, arme) {
    alert("joueur en position" + player.x + "," + player.y + ", direction du tir: "
      + player.direction);
  }*/
}

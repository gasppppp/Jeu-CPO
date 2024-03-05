var clavier;
var player;
var boutonFeu;
var arme;
var enemymove;
var cible;

export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.image("tuiles_de_jeu", "src/assets/assets_map2/tileset_foret.png");
    this.load.tilemapTiledJSON("map2", "src/assets/assets_map2/map2.tmj");

    //enemy
    this.load.spritesheet("cible", "src/assets/assets_map2/sprite_lezard.png", {
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
    const carteDuNiveau = this.add.tilemap("map2");
    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage(
      "map2",
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
    // chargement du calque calque_plateformes
    const calque_arbre = carteDuNiveau.createLayer(
      "Calque_arbre",
      tileset
    );
    // chargement du calque calque_objets
    const calque_objets = carteDuNiveau.createLayer(
      "Calque_Objets",
      tileset
    );
    player = this.physics.add.sprite(50, 350, 'img_perso');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    // définition des tuiles de plateformes qui sont solides
    // utilisation de la propriété estSolide
    calque_plateformes.setCollisionByProperty({ estsolide: true });
    // utilisation de la propriété estSolide
    this.physics.add.collider(player, calque_plateformes);
    // redimentionnement du monde avec les dimensions calculées via tiled
    this.physics.world.setBounds(0, 0, 3200, 800);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 3200, 800);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    cible = this.physics.add.group();
    var e1 = cible.create(448, 300, "cible");
    var e2 = cible.create(864, 25, "cible");
    var e3 = cible.create(1056, 500, "cible");
    var e4 = cible.create(1376, 500, "cible");
    var e5 = cible.create(1312, 40, "cible");
    var e6 = cible.create(1888, 160, "cible");
    var e7 = cible.create(3040, 128, "cible");
    var e8 = cible.create(2368, 500, "cible");

    //this.physics.add.collider(cible, player);
    this.physics.add.collider(cible, calque_plateformes);
    
    

    //enemy animation
     this.anims.create({
      key: "enemyMoves",
      frames: this.anims.generateFrameNumbers("cible", {
        start: 0,
        end: 3
      }),
      frameRate: 4,
      repeat: -1
    });

    enemymove = this.tweens.add({
      targets: cible.getChildren(),
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


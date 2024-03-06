

var clavier;
var player;
var boutonFeu;
var pistolets;
var demon;
var enemymove;
var ballesRestantes = 14;
var aUnPistolet = false;
var joueurVivant = true;
var compteurMonstres;
var sceneFermee = false;
var groupe_bullets;

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  this.load.image("tuiles_de_jeua", "src/assets/assets_map3/tileset_ships.png");
  this.load.image("tuiles_de_jeub", "src/assets/assets_map3/tileset_space.png");
  this.load.image("tuiles_de_jeuc", "src/assets/assets_map3/étoiles.png");
  this.load.image("img_pistolet", "src/assets/Armes/sprite_pistolet.png");
  this.load.image("img_bullet", "src/assets/Armes/balle_pistolet.png");
  this.load.tilemapTiledJSON("map3", "src/assets/assets_map3/map3.tmj");
  this.load.image("img_porte_finale", "src/assets/assets_bienvenue/door2.png");
  //enemy
  this.load.spritesheet("demon", "src/assets/assets_map3/sprite_demon.png", {
    frameWidth: 48,
    frameHeight: 48
  });
}

  create() {
    ballesRestantes = 14;
    aUnPistolet = false;
    joueurVivant = true;
    compteurMonstres = 12;
    sceneFermee = false;
    clavier = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A');
    //boutonFeu = this.input.keyboard.addKey('A');

    this.portefinale = this.physics.add.sprite(725, 32, "img_porte_finale");
    

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
      "tuiles_de_jeua",
    );
    const tileset2 = carteDuNiveau.addTilesetImage(
      "tileset_space",
      "tuiles_de_jeub"
    );
    const tileset3 = carteDuNiveau.addTilesetImage(
      "étoiles",
      "tuiles_de_jeuc"
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
        tileset3,
      ],
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
    player.setSize(27,48);
    player.direction = 'right';
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
    var e1 = demon.create(175, 4416, "demon");
    var e2 = demon.create(128, 4192, "demon");
    var e3 = demon.create(64, 3328, "demon");
    var e4 = demon.create(416, 3072, "demon");
    var e5 = demon.create(64, 2752, "demon");
    var e6 = demon.create(640, 2432, "demon");
    var e7 = demon.create(64, 2112, "demon");
    var e8 = demon.create(390, 1408, "demon");
    var e9 = demon.create(420, 1120, "demon");
    var e10 = demon.create(422, 832, "demon");
    var e11 = demon.create(608, 512, "demon");
    var e12 = demon.create(64, 192, "demon");

    compteurMonstres = demon.getChildren().length;
    
    // Ajout de la propriété pointsDeVie à chaque demon
    demon.getChildren().forEach((demon) => {
      demon.pointsDeVie = 4;
    });
    demon.getChildren().forEach((demon) => {
      demon.setCollideWorldBounds(true);
    });

    //this.physics.add.collider(demon, player);
    this.physics.add.collider(demon, calque_plateformes);
    this.physics.add.collider(this.portefinale, calque_plateformes);
    groupe_bullets = this.physics.add.group();
    this.physics.add.overlap(demon, groupe_bullets);
    this.physics.add.overlap(groupe_bullets, demon, this.hit, null, this);
    this.physics.add.overlap(player, demon, this.joueurPerdu, null, this);  // Appelez la fonction joueurPerdu ici

    

    //enemy animation
     this.anims.create({
      key: "enemyMoves_demon",
      frames: this.anims.generateFrameNumbers("demon", {
        start: 6,
        end: 8
      }),
      frameRate: 4,
      repeat: -1
    });

    enemymove = this.tweens.add({
      targets: demon.getChildren().filter(c => !c.isDestroyed),
      ease: "Linear",
      duration: 2000,
      yoyo: true,
      x: "+=100",
      delay: 0,
      hold: 0,
      repeatDelay: 0,
      repeat: -1,
      onComplete: function (tween, targets) {
        // Réinitialiser le tween pour chaque crabe à la fin du tween
        targets.forEach(demon => {
            this.tweens.add({
                targets: demon,
                ease: "Linear",
                duration: 3000,
                yoyo: true,
                x: `+=100`,
                repeat: -1,
            });
        });
    },
    onCompleteScope: this,
    });


    e1.anims.play("enemyMoves_demon", true);
    e2.anims.play("enemyMoves_demon", true);
    e3.anims.play("enemyMoves_demon", true);
    e4.anims.play("enemyMoves_demon", true);
    e5.anims.play("enemyMoves_demon", true);
    e6.anims.play("enemyMoves_demon", true);
    e7.anims.play("enemyMoves_demon", true);
    e8.anims.play("enemyMoves_demon", true);
    e9.anims.play("enemyMoves_demon", true);
    e10.anims.play("enemyMoves_demon", true);
    e11.anims.play("enemyMoves_demon", true);
    e12.anims.play("enemyMoves_demon", true);


    // Création d'un groupe pour les pistolets
    pistolets = this.physics.add.group();

    // Ajout de cinq pistolets à des positions spécifiques sur la carte
    this.placerPistolet(672, 4416); //14 balles par pistolet
    this.placerPistolet(224, 3232);
    this.placerPistolet(416, 2464);
    this.placerPistolet(128, 1536);
    this.placerPistolet(224, 896);

    this.physics.add.collider(pistolets, calque_plateformes);
  }

  update() {
    if (sceneFermee) {
      return;
    }
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.direction = 'left';
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.direction = 'right';
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }
    if (clavier.up.isDown && player.body.blocked.down) {
      player.setVelocityY(-330);
    }
    if (Phaser.Input.Keyboard.JustDown(boutonFeu) && ballesRestantes > 0 && aUnPistolet == true) {
      this.tirer(player);
      ballesRestantes--;  // Décrémentez le nombre de balles restantes après le tir
    }
    // Si tous les monstres ont été tués
    if (compteurMonstres == 0) {
      if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
        if (this.physics.overlap(player, this.porte1)){
          this.scene.start("transition3");
        }
      }
       
    }
  }


  placerPistolet(x, y) {
    const pistolet = pistolets.create(x, y, 'img_pistolet');
    pistolet.setCollideWorldBounds(true);
    this.physics.add.overlap(player, pistolet, this.recupererPistolet, null, this);
  }

  recupererPistolet(player, pistolet) {
    pistolet.destroy();  // Ramasser le pistolet (à adapter selon votre logique)
    aUnPistolet = true;  // Activer le pistolet
    ballesRestantes = 14;  // Réinitialiser le nombre de balles restantes
  }

  tirer(player) {
    var coefDir;
    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
    // on crée la balle a coté du joueur
    var bullet = groupe_bullets.create(player.x + (25 * coefDir), player.y - 4, 'img_bullet');
    // parametres physiques de la balle.
    bullet.setCollideWorldBounds(false);
    bullet.body.allowGravity = false;
    bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
  }

  // fonction déclenchée lorsque uneBalle et unDemon se superposent
  hit(uneBalle, unDemon) {
    uneBalle.destroy(); // Destruction de la balle
  
    // Réduction des points de vie du demon touché
    unDemon.pointsDeVie--;
  
    // Si les points de vie atteignent zéro, détruire le demon
    if (unDemon.pointsDeVie <= 0) {
      // Marquer le demon comme détruit
      unDemon.isDestroyed = true;
  
      // Destruction du demon
      unDemon.destroy();
      compteurMonstres--;
    }
  }


 

  joueurPerdu() {
    joueurVivant = false;
    player.setTint(0xff0000);  // Colorer en rouge
    player.setVelocity(0, 0);  // Arrêter le mouvement
    sceneFermee = true;
    this.time.delayedCall(3000, this.recommencerNiveau, [], this);  // Recommencez après 3 secondes
  }

  recommencerNiveau() {
    player.clearTint();  // Réinitialisez la teinte du joueur
    player.setVelocity(0, 0);  // Réinitialisez la vélocité du joueur
    sceneFermee = false;
    joueurVivant = true;  // Réinitialisez le statut du joueur
    this.scene.restart();  // Redémarrez la scène
  }
}

var enemymove
var clavier;
var player;
var boutonFeu;
var groupe_bullets;
var arme;
var enemyMove;
var crabe;
var calque_plateformes;
var pistolets;
var groupe_crabes;
var ballesRestantes = 5;
var aUnPistolet = false;
var joueurVivant = true;
var nombreTotalMonstres;
var compteurMonstres;
var sceneFermee = false;

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
    this.load.spritesheet("img_dude_arme", "src/assets/dude_avec_pistolet.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("img_crabe", "src/assets/assets_map1/sprite_crabe.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.image("img_pistolet", "src/assets/Armes/sprite_pistolet.png");
    this.load.image("img_bullet", "src/assets/Armes/balle_pistolet.png");
  }



  create() {
    ballesRestantes = 5;
    aUnPistolet = false;
    joueurVivant = true;
    nombreTotalMonstres;
    compteurMonstres;
    sceneFermee = false;

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
    player.body.onWorldBounds = true;
    player.setBounce(0.2);
    player.body.world.on(
      "worldbounds", // evenement surveillé
      function (body, up, down, left, right) {
        // on verifie si la hitbox qui est rentrée en collision est celle du player,
        // et si la collision a eu lieu sur le bord inférieur du player
        if (body.gameObject === player && down == true) {
          // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
          this.physics.pause();
          player.setTint(0xff0000);
          this.joueurPerdu();
        }
      },
      this
    );
    player.direction = 'right';
    player.setSize(20, 48);
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



    crabe = this.physics.add.group();
    var e1 = crabe.create(498, 300, "img_crabe");
    var e2 = crabe.create(1625, 448, "img_crabe");
    var e3 = crabe.create(2233, 256, "img_crabe");
    var e4 = crabe.create(2944, 592, "img_crabe");

    nombreTotalMonstres = crabe.getChildren().length;
    compteurMonstres = nombreTotalMonstres;

    // Ajout de la propriété pointsDeVie à chaque crabe
    crabe.getChildren().forEach((crabe) => {
      crabe.pointsDeVie = 2;
    });
    crabe.getChildren().forEach((crabe) => {
      crabe.setCollideWorldBounds(true);
    });

    this.physics.add.collider(crabe, calque_plateformes);
    groupe_bullets = this.physics.add.group();
    this.physics.add.overlap(crabe, groupe_bullets);
    this.physics.add.overlap(groupe_bullets, crabe, this.hit, null, this);
    this.physics.add.overlap(player, crabe, this.joueurPerdu, null, this);  // Appelez la fonction joueurPerdu ici


    //enemy animation
    this.anims.create({
      key: "enemyMoves",
      frames: this.anims.generateFrameNumbers("img_crabe", {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    enemymove = this.tweens.add({
      targets: crabe.getChildren().filter(c => !c.isDestroyed), // Appliquer le tween uniquement aux crabes non détruits
      ease: "Linear",
      duration: 3000,
      yoyo: true,
      x: "+=100",
      delay: 0,
      hold: 0,
      repeatDelay: 0,
      repeat: -1,
      onComplete: function (tween, targets) {
          // Réinitialiser le tween pour chaque crabe à la fin du tween
          targets.forEach(crabe => {
              this.tweens.add({
                  targets: crabe,
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
    e1.anims.play("enemyMoves", true);
    e2.anims.play("enemyMoves", true);
    e3.anims.play("enemyMoves", true);
    e4.anims.play("enemyMoves", true);

    // Création d'un groupe pour les pistolets
    pistolets = this.physics.add.group();

    // Ajout de trois pistolets à des positions spécifiques sur la carte
    this.placerPistolet(295, 200); //5 balles par pistolet
    this.placerPistolet(820, 400);
    this.placerPistolet(3072, 224);

    this.physics.add.collider(pistolets, calque_plateformes);

    var bravoScene = new Phaser.Scene('bravoScene');

    bravoScene.create = function () {
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

      // Texte du bravo
      var bravoTexte = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        "Bravo ! Vous avez terminé le niveau 1.\nRendez-vous au niveau 2 !", {
        font: "bold 24px Arial",
        fill: "#ffffff",
        stroke: "null",
        align: 'center'
      }
      );
      reglesTexte.setOrigin(0.5);
    }
  }



  update() {
    // Si la scène est figée, ne permettez pas au joueur de faire des actions
    if (sceneFermee) {
      return;
    }
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
    if (Phaser.Input.Keyboard.JustDown(boutonFeu) && ballesRestantes > 0 && aUnPistolet == true) {
      this.tirer(player);
      ballesRestantes--;  // Décrémentez le nombre de balles restantes après le tir
    }
    // Si tous les monstres ont été tués
    if (compteurMonstres === 0) {
      this.joueurGagne();  // Appeler la fonction joueurGagne ici
    }
    // Si les hitbox du personnage et d'un crabe se touchent
    if (joueurVivant) {
      // Vérifier la collision avec les crabes
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
    ballesRestantes = 5;  // Réinitialiser le nombre de balles restantes
  }

  tirer(player) {
    var coefDir;
    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
    // on crée la balle a coté du joueur
    var bullet = groupe_bullets.create(player.x + (25 * coefDir), player.y - 4, 'img_bullet');
    // parametres physiques de la balle.
    bullet.setCollideWorldBounds(true);
    bullet.body.allowGravity = false;
    bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
  }


  // fonction déclenchée lorsque uneBalle et unCrabe se superposent
  hit(uneBalle, unCrabe) {
    uneBalle.destroy(); // Destruction de la balle

    // Réduction des points de vie du crabe touché
    unCrabe.pointsDeVie--;

    // Si les points de vie atteignent zéro, détruire le crabe
    if (unCrabe.pointsDeVie <= 0) {
        // Marquer le crabe comme détruit
        unCrabe.isDestroyed = true;
        // Supprimer le tween existant du crabe
        this.tweens.killTweensOf(unCrabe);

        // Destruction du crabe
        unCrabe.destroy();
    }
}


  joueurGagne() {
    this.scene.start('bravoScene');
    // Puis changez de scène pour revenir à l'écran d'accueil où le joueur peut choisir la deuxième porte pour aller dans le niveau 2
    this.scene.start("ecranAccueil");
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


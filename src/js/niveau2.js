var clavier;
var player;
var boutonFeu;
var arme;
var enemymove;
var lezard;
var groupe_bullets;
var calque_plateformes;
var pistolets;
var groupe_lezards;
var ballesRestantes = 8;
var aUnPistolet = false;
var joueurVivant = true;
var nombreTotalMonstres;
var compteurMonstres;


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
    this.load.spritesheet("lezard", "src/assets/assets_map2/sprite_lezard.png", {
      frameWidth: 48,
      frameHeight: 36
    });
    this.load.image("img_pistolet", "src/assets/Armes/sprite_pistolet.png");
    this.load.image("img_bullet", "src/assets/Armes/balle_pistolet.png");
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
      key: "anim_lezard_gauche",
      frames: this.anims.generateFrameNumbers("lezard", {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: "anim_lezard_droite",
      frames: this.anims.generateFrameNumbers("lezard", {
        start: 9,
        end: 11
      }),
      frameRate: 4,
      repeat: -1
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
   
    //on acvite l'écouteur sur les collisions avec le monde
    player.body.onWorldBounds = true; 
    
    // on met en place l'écouteur sur les bornes du monde
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
    player.setBounce(0.2);
    player.direction = 'right';
    player.setSize(20,48);
    
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

    lezard = this.physics.add.group();
    var e1 = lezard.create(448, 300, "lezard");
    var e2 = lezard.create(864, 25, "lezard");
    var e3 = lezard.create(1056, 500, "lezard");
    var e4 = lezard.create(1376, 500, "lezard");
    var e5 = lezard.create(1312, 40, "lezard");
    var e6 = lezard.create(1888, 160, "lezard");
    var e7 = lezard.create(3040, 128, "lezard");
    var e8 = lezard.create(2368, 500, "lezard");
   
   
    nombreTotalMonstres = lezard.getChildren().length;
    compteurMonstres = nombreTotalMonstres;

    // Ajout de la propriété pointsDeVie à chaque lezard
    lezard.getChildren().forEach((lezard) => {
      lezard.pointsDeVie = 3;
    });

    lezard.getChildren().forEach((lezard) => {
      lezard.setCollideWorldBounds(true);
    });
    //this.physics.add.collider(lezard, player);
    this.physics.add.collider(lezard, calque_plateformes);
    groupe_bullets = this.physics.add.group();
    this.physics.add.collider(lezard, groupe_bullets);
    this.physics.add.overlap(groupe_bullets, lezard, this.hit, null, this);
    

    //enemy animation
     this.anims.create({
      key: "enemyMoves",
      frames: this.anims.generateFrameNumbers("lezard", {
        start: 6,
        end: 8
      }),
      frameRate: 4,
      repeat: -1
    });

    enemymove = this.tweens.add({
      targets: lezard.getChildren(),
      ease: "Linear",
      duration: 2500,
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
    
     // Création d'un groupe pour les pistolets
     pistolets = this.physics.add.group();

     // Ajout de trois pistolets à des positions spécifiques sur la carte
     this.placerPistolet(295, 200); //8 balles par pistolet
     this.placerPistolet(1344, 96);
     this.placerPistolet(2016, 576);
     this.placerPistolet(3512, 192);
 
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
        "Bravo ! Vous avez terminé le niveau 1.\nRendez-vous au niveau 2 !",{
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
    if (joueurVivant) {
     
      // Si les hitbox du personnage et d'un lezard se touchent
      this.physics.world.overlap(player, lezard, this.joueurPerdu, null, this);

      // ...
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
    ballesRestantes = 8;  // Réinitialiser le nombre de balles restantes
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

   // fonction déclenchée lorsque uneBalle et unLezard se superposent
  hit(uneBalle, unLezard) {
    uneBalle.destroy(); // destruction de la balle

   // Réduction des points de vie du Lezard touché
   unLezard.pointsDeVie--;

   // Si les points de vie atteignent zéro, détruire le lezard
   if (unLezard.pointsDeVie <= 0) {
      // Arrêter le tween du lezard avant de le détruire
      enemymove.remove(TweenData => TweenData.targets[0] === unLezard);
      unLezard.destroy();
   } else {
      // Si le lezard est touché mais pas encore détruit, arrêtez sa vélocité
      if (unLezard.active) {
          unLezard.setVelocity(0, 0);
      }
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
    this.time.delayedCall(3000, this.recommencerNiveau, [], this);  // Recommencez après 3 secondes
  }

  recommencerNiveau() {
    joueurVivant = true;  // Réinitialisez le statut du joueur
    player.clearTint();  // Réinitialisez la teinte du joueur
    player.setVelocity(0, 0);  // Réinitialisez la vélocité du joueur
    player.aUnPistolet=false;
    player.ballesRestantes==0;
    this.scene.restart();  // Redémarrez la scène
  }

}


// Créez une nouvelle classe de scène pour la transition
export default class transition3 extends Phaser.Scene {
    constructor() {
        super({ key: 'transition3' });
    }

    create() {
        // Ajoutez un rectangle avec un fond bleu plus clair
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000033).setOrigin(0);

        // Ajoutez le texte "Félicitations" avec une police de style jeu vidéo
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Félicitations, vous avez atteint l'étoile\naprès avoir terrassé tous les monstres !", {
            font: 'bold 24px Arial', // Remplacez par la police de votre choix
            fill: '#ffffff',
            stroke: 'null',
            align: 'center'
        }).setOrigin(0.5);
    }
}
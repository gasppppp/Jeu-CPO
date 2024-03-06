// Créez une nouvelle classe de scène pour la transition
export default class transition3 extends Phaser.Scene {
    constructor() {
        super({ key: 'transition3' });
    }

    create() {
        // Ajoutez un rectangle avec un fond bleu plus clair
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0xadd8e6).setOrigin(0);

        // Ajoutez le texte "Félicitations" avec une police de style jeu vidéo
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Félicitations, vous avez atteint l"étoile après avoir terrassé tout les monstres !', {
            fontFamily: 'Arial, sans-serif', // Remplacez par la police de votre choix
            fontSize: '48px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
    }
}
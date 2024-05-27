import Game from './game.js';

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.canvas = document.getElementById('gameCanvas');
            this.ctx = this.canvas.getContext('2d');

            // ottiene il riferimento al messaggio e al punteggio
            this.message = document.querySelector('.message');
            this.scoreElement = document.querySelector('.score');

            this.resizeCanvas();
            this.game = new Game(this.canvas, this.ctx, this.message, this.scoreElement);
            window.addEventListener('resize', this.resizeCanvas.bind(this));
        });
    }

    // ridimensiona il canvas e altri elementi
    resizeCanvas() {
        const aspectRatio = 16 / 9; 
        let width = window.innerWidth * 0.8;
        let height = width / aspectRatio;

        // se l'altezza è maggiore dell'80% dell'altezza della finestra, regola le dimensioni
        if (height > window.innerHeight * 0.8) {
            height = window.innerHeight * 0.8;
            width = height * aspectRatio;
        }

        this.canvas.width = width;
        this.canvas.height = height;

        // ridimensiona il messaggio e il punteggio
        this.resizeMessage();
        this.resizeScore();
    }

    // ridimensiona il messaggio
    resizeMessage() {
        this.message.style.fontSize = (this.canvas.width * 0.05) + 'px'; 
        this.message.style.top = (this.canvas.height * 0.3) + 'px'; 
        this.message.style.left = '50%'; 
        this.message.style.transform = 'translateX(-50%)'; 
    }

    // ridimensiona il punteggio 
    resizeScore() {
        this.scoreElement.style.fontSize = (this.canvas.width * 0.05) + 'px'; 
        this.scoreElement.style.top = (this.canvas.height * 0.05) + 'px';
        this.scoreElement.style.left = (this.canvas.width * 0.05) + 'px'; 
    }
}

new App();

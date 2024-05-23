import Game from './game.js';

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.game = new Game();
        });
    }
}

new App();

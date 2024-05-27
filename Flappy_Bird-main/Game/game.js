import Bird from './bird.js';
import Pipe from './pipe.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas'); 
        this.ctx = this.canvas.getContext('2d'); 
        this.moveSpeed = 3; 
        this.gravity = 0.5; 
        this.bird = new Bird(this.canvas, this.gravity); 
        this.pipes = []; 
        this.pipeSeparation = 0; // contatore per la generazione dei tubi
        this.pipeGap = 150; // spazio tra i tubi
        this.score = 0; // Punteggio del giocatore
        this.message = document.querySelector('.message'); // visualizzare i messaggi di gioco applicando lo stle CSS
        this.scoreVal = document.querySelector('.score_val'); // visualizzare il punteggio applicando lo stle CSS
        this.soundPoint = new Audio('sounds effect/point.mp3'); // suono per il punto 
        this.soundDie = new Audio('sounds effect/die.mp3'); // suono per la fine del gioco
        this.init();
    }

    init() {
        this.message.classList.add('messageStyle'); 

        // gestisce l'evento di quando viene premuto il tasto per iniziare il gioco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isGamePlaying()) {
                this.startGame(); 
            }
        });
    }

    // verifica se il gioco è in corso
    isGamePlaying() {
        return this.message.innerHTML === ''; 
    }

    startGame() {
        this.message.innerHTML = ''; // rimuove il messaggio di gioco
        this.score = 0; 
        this.scoreVal.innerHTML = this.score; // aggiorna il punteggio 
        this.message.classList.remove('messageStyle'); 
        this.bird.reset(); 
        this.pipes = []; 
        this.pipeSeparation = 0; // resetta il contatore che separa i tubi
        this.play(); // avvia il loop di gioco
    }

    play() {
        const loop = () => {
            if (!this.isGamePlaying()) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
            this.bird.applyGravity(); // applica la gravità all'uccello
            this.bird.draw(this.ctx);

            // verifica se l'uccello ha toccato il terreno
            if (this.bird.y + this.bird.height >= this.canvas.height) {
                this.endGame(); // termina il gioco
                return;
            }

            // genera i tubi
            if (this.pipeSeparation > 115) {
                this.pipeSeparation = 0;
                const pipePos = Math.floor(Math.random() * (this.canvas.height - this.pipeGap - 20)) + 10; // posizione casuale del tubo
                
                // aggiunge due tubi (superiore e inferiore) all'array
                this.pipes.push(new Pipe(this.canvas, 'top', pipePos, this.moveSpeed));
                this.pipes.push(new Pipe(this.canvas, 'bottom', pipePos + this.pipeGap, this.moveSpeed));
            }
            this.pipeSeparation++;

            // muove e disegna i tubi
            this.pipes.forEach((pipe, index) => {
                pipe.move(); 
                pipe.draw(this.ctx); 

                // rimuove il tubo se è fuori dal canvas
                if (pipe.isOutOfCanvas()) {
                    this.pipes.splice(index, 1); // rimuove il tubo dall'array
                }

                // termina il gioco se l'uccello tocca un tubo
                if (this.bird.checkCollision(pipe)) {
                    this.endGame();
                }

                // incrementa il punteggio se l'uccello supera i tubi
                if (pipe.isPassed(this.bird) && !pipe.scored) {
                    pipe.scored = true; // imposta il tubo come passato
                    this.incrementScore(); 
                }
            });

            requestAnimationFrame(loop); // esegue il loop di gioco
        };

        loop(); 
    }

    // termina il gioco
    endGame() {
        this.message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Premi Enter per continuare'; // mostra il messaggio di fine gioco
        this.message.classList.add('messageStyle'); 
        this.bird.hide(); // nasconde l'uccello
        this.soundDie.play(); // riproduce il suono di fine gioco
        this.pipes = []; 
    }

    // incrementa il punteggio
    incrementScore() {
        this.score += 1 / 2; 
        this.scoreVal.innerHTML = this.score; // aggiorna il punteggio 
        this.soundPoint.play(); // riproduce il suono del punto segnato
    }
}

export default Game;import Bird from './bird.js';
import Pipe from './pipe.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas'); 
        this.ctx = this.canvas.getContext('2d'); 
        this.moveSpeed = 3; 
        this.gravity = 0.5; 
        this.bird = new Bird(this.canvas, this.gravity); 
        this.pipes = []; 
        this.pipeSeparation = 0; // contatore per la generazione dei tubi
        this.pipeGap = 150; // spazio tra i tubi
        this.score = 0; // Punteggio del giocatore
        this.message = document.querySelector('.message'); // visualizzare i messaggi di gioco applicando lo stle CSS
        this.scoreVal = document.querySelector('.score_val'); // visualizzare il punteggio applicando lo stle CSS
        this.soundPoint = new Audio('sounds effect/point.mp3'); // suono per il punto 
        this.soundDie = new Audio('sounds effect/die.mp3'); // suono per la fine del gioco
        this.init();
    }

    init() {
        this.message.classList.add('messageStyle'); 

        // gestisce l'evento di quando viene premuto il tasto per iniziare il gioco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isGamePlaying()) {
                this.startGame(); 
            }
        });
    }

    // verifica se il gioco è in corso
    isGamePlaying() {
        return this.message.innerHTML === ''; 
    }

    startGame() {
        this.message.innerHTML = ''; // rimuove il messaggio di gioco
        this.score = 0; 
        this.scoreVal.innerHTML = this.score; // aggiorna il punteggio 
        this.message.classList.remove('messageStyle'); 
        this.bird.reset(); 
        this.pipes = []; 
        this.pipeSeparation = 0; // resetta il contatore che separa i tubi
        this.play(); // avvia il loop di gioco
    }

    play() {
        const loop = () => {
            if (!this.isGamePlaying()) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
            this.bird.applyGravity(); // applica la gravità all'uccello
            this.bird.draw(this.ctx);

            // verifica se l'uccello ha toccato il terreno
            if (this.bird.y + this.bird.height >= this.canvas.height) {
                this.endGame(); // termina il gioco
                return;
            }

            // genera i tubi
            if (this.pipeSeparation > 115) {
                this.pipeSeparation = 0;
                const pipePos = Math.floor(Math.random() * (this.canvas.height - this.pipeGap - 20)) + 10; // posizione casuale del tubo
                
                // aggiunge due tubi (superiore e inferiore) all'array
                this.pipes.push(new Pipe(this.canvas, 'top', pipePos, this.moveSpeed));
                this.pipes.push(new Pipe(this.canvas, 'bottom', pipePos + this.pipeGap, this.moveSpeed));
            }
            this.pipeSeparation++;

            // muove e disegna i tubi
            this.pipes.forEach((pipe, index) => {
                pipe.move(); 
                pipe.draw(this.ctx); 

                // rimuove il tubo se è fuori dal canvas
                if (pipe.isOutOfCanvas()) {
                    this.pipes.splice(index, 1); // rimuove il tubo dall'array
                }

                // termina il gioco se l'uccello tocca un tubo
                if (this.bird.checkCollision(pipe)) {
                    this.endGame();
                }

                // incrementa il punteggio se l'uccello supera i tubi
                if (pipe.isPassed(this.bird) && !pipe.scored) {
                    pipe.scored = true; // imposta il tubo come passato
                    this.incrementScore(); 
                }
            });

            requestAnimationFrame(loop); // esegue il loop di gioco
        };

        loop(); 
    }

    // termina il gioco
    endGame() {
        this.message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Premi Enter per continuare'; // mostra il messaggio di fine gioco
        this.message.classList.add('messageStyle'); 
        this.bird.hide(); // nasconde l'uccello
        this.soundDie.play(); // riproduce il suono di fine gioco
        this.pipes = []; 
    }

    // incrementa il punteggio
    incrementScore() {
        this.score += 1 / 2; 
        this.scoreVal.innerHTML = this.score; // aggiorna il punteggio 
        this.soundPoint.play(); // riproduce il suono del punto segnato
    }
}

export default Game;

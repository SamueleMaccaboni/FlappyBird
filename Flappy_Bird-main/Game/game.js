import Background from './background.js';
import Bird from './bird.js';
import Pipe from './pipe.js';

class Game {
    constructor() {
        this.moveSpeed = 3;
        this.gravity = 0.5;
        this.birdElement = document.querySelector('.bird'); // seleziona l'elemento con la classe bird
        this.imgElement = document.getElementById('bird-1'); // Seleziona l'elemento con l'id bird-1
        this.soundPoint = new Audio('sounds effect/point.mp3'); // carica il suono dello score
        this.soundDie = new Audio('sounds effect/die.mp3'); // carica il suono della morte
        this.backgroundElement = document.querySelector('.background'); // seleziona l'elemento con la classe background
        this.scoreVal = document.querySelector('.score_val'); // seleziona l'elemento con la classe score_val
        this.message = document.querySelector('.message'); // seleziona l'elemento con la classe message
        this.scoreTitle = document.querySelector('.score_title'); // seleziona l'elemento con la classe score_title

        this.background = new Background(this.backgroundElement); 
        this.bird = new Bird(this.birdElement, this.imgElement, this.gravity); 

        this.pipes = []; // memorizza i tubi
        this.pipeSeparation = 0; // distanza tra i tubi
        this.pipeGap = 35; // distanza verticale tra i tubi

        this.init();
    }

    init() {
        this.message.classList.add('messageStyle'); // aggiunge lo stile al messaggio

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isGamePlaying()) {
                this.startGame(); // avvia il gioco quando viene premuto il tasto
            }
        });
    }

    isGamePlaying() {
        return this.message.innerHTML === '';
    }

    startGame() {
        this.message.innerHTML = ''; // Pulisce il messaggio
        this.scoreTitle.innerHTML = 'Score : '; // Imposta il punteggio
        this.scoreVal.innerHTML = '0'; // resetta il punteggio
        this.message.classList.remove('messageStyle'); // Rimuove lo stile dal messaggio
        this.bird.reset(); // resetta l'uccello
        this.play();
    }

    play() {
        this.movePipes(); // avvia il movimento dei tubi
        this.applyGravity(); // applica la gravità all'uccello
        this.createPipes(); // crea nuovi tubi
    }

    // gestisce il movimento dei tubi
    movePipes() {
        const move = () => {
            if (!this.isGamePlaying()) return; // ferma il movimento se il gioco non è in corso

            this.pipes.forEach((pipe, index) => {
                pipe.move(this.moveSpeed); // muove ogni tubo
                let birdRect = this.bird.getRect(); // ottiene le collisiooni dell'uccello
                let pipeRect = pipe.getRect(); // ottiene le collisioni del tubo

                if (pipeRect.right <= 0) {
                    pipe.remove(); // rimuove il tubo se è fuori dallo schermo
                    this.pipes.splice(index, 1);
                } else if (this.checkCollision(birdRect, pipeRect)) {
                    this.endGame(); // termina il gioco se c'è una collisione
                } else if (pipeRect.right < birdRect.left && pipeRect.right + this.moveSpeed >= birdRect.left && pipe.element.increase_score === '1') {
                    this.incrementScore(); // incrementa il punteggio se l'uccello passa il tubo
                    this.soundPoint.play(); // riproduce il suono del punto
                }
            });

            requestAnimationFrame(move); // ripete l'animazione
        };
        requestAnimationFrame(move); // inizia l'animazione
    }

    // applica la gravità all'uccello
    applyGravity() {
        const gravity = () => {
            if (!this.isGamePlaying()) return; // se il gioco non è in corso, la gravità non viene applicata

            this.bird.applyGravity();

            // termina il gioco se l'uccello tocca il bordo superiore o inferiore dello schermo
            if (this.birdElement.offsetTop <= 0 || this.birdElement.offsetTop + this.birdElement.offsetHeight >= this.background.getBottom()) {
                this.endGame();
                return;
            }
            requestAnimationFrame(gravity); 
        };
        requestAnimationFrame(gravity); 
    }

    // crea nuovi tubi a intervalli regolari
    createPipes() {
        const create = () => {
            if (!this.isGamePlaying()) return; // se il gioco non è in corso, ferma la creazione dei tubi

            if (this.pipeSeparation > 115) {
                this.pipeSeparation = 0; // resetta la separazione dei tubi

                let pipePos = Math.floor(Math.random() * 43) + 8; // genera una posizione casuale per il tubo
                let pipeTop = new Pipe('pipe_sprite pipe_top', pipePos - 70 + 'vh', '100vw'); // crea il tubo superiore
                let pipeBottom = new Pipe('pipe_sprite pipe_bottom', pipePos + this.pipeGap + 'vh', '100vw'); // crea il tubo inferiore

                document.body.appendChild(pipeTop.element); 
                document.body.appendChild(pipeBottom.element); 

                this.pipes.push(pipeTop, pipeBottom); // aggiunge i tubi all'array dei tubi
            }
            this.pipeSeparation++; // incrementa la separazione dei tubi
            
            requestAnimationFrame(create); 
        };
        requestAnimationFrame(create); 
    }

    // controlla se c'è una collisione tra l'uccello e un tubo
    checkCollision(birdRect, pipeRect) {
        return birdRect.left < pipeRect.left + pipeRect.width &&
               birdRect.left + birdRect.width > pipeRect.left &&
               birdRect.top < pipeRect.top + pipeRect.height &&
               birdRect.top + birdRect.height > pipeRect.top;
    }

    endGame() {
        this.message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Premi Enter per continuare'; // mostra il messaggio di game over
        this.message.classList.add('messageStyle'); // aggiunge lo stile al messaggio
        this.bird.hide(); // nasconde l'uccello
        this.soundDie.play(); // riproduce il suono della morte
        this.pipes.forEach(pipe => pipe.remove()); // rimuove tutti i tubi
        this.pipes = []; // svuota l'array dei tubi
    }

    // incrementa il punteggio
    incrementScore() {
        this.scoreVal.innerHTML = +this.scoreVal.innerHTML + 1; 
    }
}

export default Game;

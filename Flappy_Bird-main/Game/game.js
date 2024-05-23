import Background from './background.js';
import Bird from './bird.js';
import Pipe from './pipe.js';

class Game {
    constructor() {
        this.moveSpeed = 3;
        this.gravity = 0.5;
        this.birdElement = document.querySelector('.bird');
        this.imgElement = document.getElementById('bird-1');
        this.soundPoint = new Audio('sounds effect/point.mp3');
        this.soundDie = new Audio('sounds effect/die.mp3');
        this.backgroundElement = document.querySelector('.background');
        this.scoreVal = document.querySelector('.score_val');
        this.message = document.querySelector('.message');
        this.scoreTitle = document.querySelector('.score_title');

        this.background = new Background(this.backgroundElement);
        this.bird = new Bird(this.birdElement, this.imgElement, this.gravity);

        this.pipes = [];
        this.pipeSeparation = 0;
        this.pipeGap = 35;

        this.init();
    }

    init() {
        this.imgElement.style.display = 'none';
        this.message.classList.add('messageStyle');

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isGamePlaying()) {
                this.startGame();
            }
        });
    }

    isGamePlaying() {
        return this.message.innerHTML === '';
    }

    startGame() {
        this.message.innerHTML = '';
        this.scoreTitle.innerHTML = 'Score : ';
        this.scoreVal.innerHTML = '0';
        this.message.classList.remove('messageStyle');
        this.bird.reset();
        this.play();
    }

    play() {
        this.movePipes();
        this.applyGravity();
        this.createPipes();
    }

    movePipes() {
        const move = () => {
            if (!this.isGamePlaying()) return;

            this.pipes.forEach((pipe, index) => {
                pipe.move(this.moveSpeed);
                let birdRect = this.bird.getRect();
                let pipeRect = pipe.getRect();

                if (pipeRect.right <= 0) {
                    pipe.remove();
                    this.pipes.splice(index, 1);
                } else if (this.checkCollision(birdRect, pipeRect)) {
                    this.endGame();
                } else if (pipeRect.right < birdRect.left && pipeRect.right + this.moveSpeed >= birdRect.left && pipe.element.increase_score === '1') {
                    this.incrementScore();
                    this.soundPoint.play();
                }
            });

            requestAnimationFrame(move);
        };
        requestAnimationFrame(move);
    }

    applyGravity() {
        const gravity = () => {
            if (!this.isGamePlaying()) return;

            this.bird.applyGravity();

            if (this.birdElement.offsetTop <= 0 || this.birdElement.offsetTop + this.birdElement.offsetHeight >= this.background.getBottom()) {
                this.endGame();
                return;
            }
            requestAnimationFrame(gravity);
        };
        requestAnimationFrame(gravity);
    }

    createPipes() {
        const create = () => {
            if (!this.isGamePlaying()) return;

            if (this.pipeSeparation > 115) {
                this.pipeSeparation = 0;

                let pipePos = Math.floor(Math.random() * 43) + 8;
                let pipeTop = new Pipe('pipe_sprite pipe_top', pipePos - 70 + 'vh', '100vw');
                let pipeBottom = new Pipe('pipe_sprite pipe_bottom', pipePos + this.pipeGap + 'vh', '100vw');

                document.body.appendChild(pipeTop.element);
                document.body.appendChild(pipeBottom.element);

                this.pipes.push(pipeTop, pipeBottom);
            }
            this.pipeSeparation++;
            requestAnimationFrame(create);
        };
        requestAnimationFrame(create);
    }

    checkCollision(birdRect, pipeRect) {
        return birdRect.left < pipeRect.left + pipeRect.width &&
               birdRect.left + birdRect.width > pipeRect.left &&
               birdRect.top < pipeRect.top + pipeRect.height &&
               birdRect.top + birdRect.height > pipeRect.top;
    }

    endGame() {
        this.message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter to restart';
        this.message.classList.add('messageStyle');
        this.bird.hide();
        this.soundDie.play();
        this.pipes.forEach(pipe => pipe.remove());
        this.pipes = [];
    }

    incrementScore() {
        this.scoreVal.innerHTML = +this.scoreVal.innerHTML + 1;
    }
}

export default Game;

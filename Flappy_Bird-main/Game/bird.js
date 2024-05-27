class Bird {
    constructor(canvas, gravity) {
        this.canvas = canvas; 
        this.ctx = canvas.getContext('2d'); 
        this.img = new Image(); 
        this.img.src = 'images/Bird.png'; 
        this.x = 50; // posizione orizzontale dell'uccello
        this.y = canvas.height / 2; // posizione verticale dell'uccello
        this.gravity = gravity; // gravità dell'uccello
        this.dy = 0; // velocità verticale dell'uccello
        this.width = 34; 
        this.height = 24; 
        this.init(); 
    }

    init() {
        // nasconde l'immagine dell'uccello all'inizio
        //this.imgElement.style.display = 'none';

        // quando viene premuto il tasto, vienne aggiunto un evento
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                
                // cambia l'immagine dell'uccello e imposta la velocità verso l'alto
                //this.imgElement.src = 'images/Bird-2.png';
                this.dy = -7.6;
            }
        });

        // quando viene rilasciato il tasto, vienne aggiunto un evento
       // document.addEventListener('keyup', (e) => {
            //if (e.key === 'ArrowUp') {
                // ripristina l'immagine originale dell'uccello
                //this.imgElement.src = 'images/Bird.png';
            //}
        //});
    }

    // applica la gravità all'uccello e controlla se tocca il terreno
    applyGravity() {
        this.dy += this.gravity;
        this.y += this.dy;
    
        // verifica se l'uccello ha toccato il terreno
        if (this.y + this.height >= this.canvas.height) {
            this.endGame();
            return;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = this.canvas.height / 2; 
        this.dy = 0; 
    }

    // controlla la collisione dell'uccello con un tubo
    checkCollision(pipe) {
        // calcola ile collisioni dell'uccello e del tubo
        const birdRect = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };

        const pipeRect = pipe.getRect();

        // verifica se i poligoni che delimitano i tubi e l'uccello si sovrappongono
        return birdRect.left < pipeRect.right &&
               birdRect.right > pipeRect.left &&
               birdRect.top < pipeRect.bottom &&
               birdRect.bottom > pipeRect.top;
    }
}

export default Bird;

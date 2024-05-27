class Pipe {
    constructor(canvas, position, y, moveSpeed) {
        this.canvas = canvas; 
        this.ctx = canvas.getContext('2d'); 
        this.img = new Image(); 
        this.img.src = position === 'top' ? 'images/pipe2.png' : 'images/pipe1.png';
        this.x = canvas.width; // posizione orizzontale del tubo
        this.y = y; // posizione verticale del tubo
        this.moveSpeed = moveSpeed; // velocità del tubo
        this.width = 52; 
        this.height = 320; 
        this.position = position; // posizione del tubo (superiore o inferiore)
        this.scored = false; // indica se i tubi sono stati superati dall'uccello
    }

    // sposta il tubo verso sinistra
    move() {
        this.x -= this.moveSpeed; // sottrae la velocità dalla posizione orizzontale del tubo
    }

    draw(ctx) {
        // disegna l'immagine del tubo sulla posizione corretta del canvas 
        ctx.drawImage(this.img, this.x, this.position === 'top' ? this.y - this.height : this.y, this.width, this.height);
    }

    // verifica se il tubo è uscito dal canvas
    isOutOfCanvas() {
        return this.x + this.width < 0; // restituisce true se il tubo è completamente uscito dal canvas
    }

    // verifica se l'uccello ha superato i tubi
    isPassed(bird) {
        return this.x + this.width < bird.x; // restituisce true se l'uccello è oltre la posizione orizzontale del tubo
    }

    // ottiene i limiti della collisione del tubo
    getRect() {
        return {
            left: this.x, // x del lato sinistro della collisione
            right: this.x + this.width, // x del lato destro della collisione
            top: this.position === 'top' ? this.y - this.height : this.y, // y del lato superiore della collisione
            bottom: this.position === 'top' ? this.y : this.y + this.height // y del lato inferiore della collsione
        };
    }
}

export default Pipe;

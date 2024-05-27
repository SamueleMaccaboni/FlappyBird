class Bird {
    constructor(element, imgElement, gravity) {
        this.element = element;
        this.imgElement = imgElement;
        this.gravity = gravity;
        this.dy = 0; // velocità verticale
        this.init();
    }

    init() {
        // nasconde l'immagine dell'uccello all'inizio
        this.imgElement.style.display = 'none';

        // quando viene premuto il tasto, vienne aggiunto un evento
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                
                // cambia l'immagine dell'uccello e imposta la velocità verso l'alto
                this.imgElement.src = 'images/Bird-2.png';
                this.dy = -7.6;
            }
        });

        // quando viene rilasciato il tasto, vienne aggiunto un evento
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                // ripristina l'immagine originale dell'uccello
                this.imgElement.src = 'images/Bird.png';
            }
        });
    }

    applyGravity() {
        // aumenta la velocità verso il basso con la gravità
        this.dy += this.gravity;
        
        // aggiorna la posizione verticale dell'uccello
        this.element.style.top = this.element.offsetTop + this.dy + 'px';
    }

    reset() {
        // resetta la posizione dell'uccello e lo rende visibile
        this.element.style.top = '40vh';
        this.imgElement.style.display = 'block';
        this.dy = 0; 
    }

    hide() {
        // nasconde l'immagine dell'uccello quando serve
        this.imgElement.style.display = 'none';
    }

    getRect() {
        // restituisce il rettangolo di delimitazione dell'uccello per capire quando bisogna renderlo invisibile
        return this.element.getBoundingClientRect();
    }
}

export default Bird;
class Bird {
    constructor(element, imgElement, gravity) {
        this.element = element;
        this.imgElement = imgElement;
        this.gravity = gravity;
        this.dy = 0; // velocità verticale
        this.init();
    }

    init() {
        // nasconde l'immagine dell'uccello all'inizio
        this.imgElement.style.display = 'none';

        // quando viene premuto il tasto, vienne aggiunto un evento
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                
                // cambia l'immagine dell'uccello e imposta la velocità verso l'alto
                this.imgElement.src = 'images/Bird-2.png';
                this.dy = -7.6;
            }
        });

        // quando viene rilasciato il tasto, vienne aggiunto un evento
        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                // ripristina l'immagine originale dell'uccello
                this.imgElement.src = 'images/Bird.png';
            }
        });
    }

    applyGravity() {
        // aumenta la velocità verso il basso con la gravità
        this.dy += this.gravity;
        
        // aggiorna la posizione verticale dell'uccello
        this.element.style.top = this.element.offsetTop + this.dy + 'px';
    }

    reset() {
        // resetta la posizione dell'uccello e lo rende visibile
        this.element.style.top = '40vh';
        this.imgElement.style.display = 'block';
        this.dy = 0; 
    }

    hide() {
        // nasconde l'immagine dell'uccello quando serve
        this.imgElement.style.display = 'none';
    }

    getRect() {
        // restituisce il rettangolo di delimitazione dell'uccello per capire quando bisogna renderlo invisibile
        return this.element.getBoundingClientRect();
    }
}

export default Bird;

class Pipe {
    // inizializza un nuovo tubo con la classe CSS, la posizione top e left
    constructor(className, top, left) {
        this.element = document.createElement('div'); // crea un nuovo elemento div per rappresentare il tubo
        this.element.className = className; // applica lo stile CSS nell'elemento
        this.element.style.top = top; // imposta la posizione verticale
        this.element.style.left = left; // imposta la posizione orizzontale
        this.element.increase_score = '1'; // aumenta il punteggio quando l'uccello passa il tubo
    }

    // muove il tubo verso sinistra
    move(moveSpeed) {
        this.element.style.left = this.element.offsetLeft - moveSpeed + 'px'; // aggiorna la posizione orizzontale 
    }

    remove() {
        this.element.remove(); // rimuove l'elemento div del tubo 
    }

    // ottiene le collisioni del tubo
    getRect() {
        return this.element.getBoundingClientRect(); /* restituisce un oggetto che rappresenta le dimensioni e la posizione di un elemento 
                                                        rispetto alla finestra */
    }
}

export default Pipe;

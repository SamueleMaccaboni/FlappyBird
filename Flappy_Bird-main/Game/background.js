
class Background {
    constructor(element) {
        this.element = element; // rappresenta lo sfondo
        this.rect = this.element.getBoundingClientRect(); // Ottiene il poligono che delimita lo sfondo 
    }

    getBottom() {
        return this.rect.bottom; // restituisce la Y del bordo inferiore dell'elemento
    }
}

export default Background;

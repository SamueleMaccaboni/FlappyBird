class Background {
    constructor(element) {
        this.element = element;
        this.rect = this.element.getBoundingClientRect();
    }

    // serve per ottenere la distanza dal bordo inferiore dell'elemento al bordo superiore
    getBottom() {
        return this.rect.bottom;
    }
}

export default Background;

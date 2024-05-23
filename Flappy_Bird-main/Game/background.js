class Background {
    constructor(element) {
        this.element = element;
        this.rect = this.element.getBoundingClientRect();
    }

    getBottom() {
        return this.rect.bottom;
    }
}

export default Background;

class Pipe {
    constructor(className, top, left) {
        this.element = document.createElement('div');
        this.element.className = className;
        this.element.style.top = top;
        this.element.style.left = left;
        this.element.increase_score = '1';
    }

    move(moveSpeed) {
        this.element.style.left = this.element.offsetLeft - moveSpeed + 'px';
    }

    remove() {
        this.element.remove();
    }

    getRect() {
        return this.element.getBoundingClientRect();
    }
}

export default Pipe;

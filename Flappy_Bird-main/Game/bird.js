class Bird {
    constructor(element, imgElement, gravity) {
        this.element = element;
        this.imgElement = imgElement;
        this.gravity = gravity;
        this.dy = 0;
        this.init();
    }

    init() {
        this.imgElement.style.display = 'none';
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                this.imgElement.src = 'images/Bird-2.png';
                this.dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp') {
                this.imgElement.src = 'images/Bird.png';
            }
        });
    }

    applyGravity() {
        this.dy += this.gravity;
        this.element.style.top = this.element.offsetTop + this.dy + 'px';
    }

    reset() {
        this.element.style.top = '40vh';
        this.imgElement.style.display = 'block';
        this.dy = 0;
    }

    hide() {
        this.imgElement.style.display = 'none';
    }

    getRect() {
        return this.element.getBoundingClientRect();
    }
}

export default Bird;

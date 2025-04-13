export class Pipe {
    static width = 100; // ширина трубы одинакова для всех, потому сделана статической

    width = Pipe.width; // устанавливаем ширину текущей трубы

    gap = 220; // расстояние между верхней и нижней трубой (проход для птицы)

    constructor(canvas) {
        this.canvas = canvas; // сохраняем canvas
        this.ctx = canvas.getContext('2d'); // получаем 2d-контекст для рисования
        this.canvasHeight = canvas.height; // сохраняем высоту канваса

        // генерируем случайную высоту верхней трубы
        this.topHeight = this.canvasHeight / 10 + Math.round(Math.random() * this.canvasHeight / 3);

        // начинаем рисовать трубу справа за пределами экрана
        this.x = canvas.width;
    }

    draw() {
        const bottomY = this.topHeight + this.gap; // высота начала нижней трубы

        this.ctx.fillStyle = 'green'; // устанавливаем цвет труб

        // рисуем верхнюю трубу
        this.ctx.fillRect(this.x, 0, this.width, this.topHeight);

        // рисуем нижнюю трубу
        this.ctx.fillRect(this.x, bottomY, this.width, this.canvasHeight - bottomY);
    }

    update(speed = 3) {
        this.x -= speed; // смещаем трубу влево
        this.draw(); // рисуем трубу на новом месте
    }

    isOffScreen() {
        return this.x < -this.width; // если труба ушла за экран, возвращаем true
    }
}
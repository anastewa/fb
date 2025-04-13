import { loadImage } from './utils.js';

// класс птицы
export class Bird {
    static birdImg; // Статичное изображение — общее для всех объектов Bird

    // размеры птицы
    width = 66;
    height = 47;

    // размеры хитбокса (области столкновения)
    hitboxWidth = 55; 
    hitboxHeight = 35;

    // параметры физики
    flapPower = 4; // насколько высоко птица "взмахивает"
    gravity = 0.15; // сила притяжения, тянет птицу вниз

    // петод для загрузки изображения птицы
    static async preloadImage() {
        Bird.birdImg = new Image(); // создаем объект изображения
        await loadImage(Bird.birdImg, "./assets/bird.png"); // асинхронно загружаем картинку
    }

    constructor(canvas) {
        this.canvas = canvas; // сохраняем канвас
        this.ctx = canvas.getContext('2d'); // получаем контекст для рисования

        // начальные координаты птицы
        this.x = canvas.width / 10; // смещена немного влево
        this.y = canvas.height / 4; // смещена немного вниз от верха

        this.velocity = 0; // начальная скорость падения
    }

    // метод для отрисовки птицы
    draw() {
        if (Bird.birdImg) {
            // отрисовка изображения птицы с учетом размеров
            this.ctx.drawImage(
                Bird.birdImg,
                this.x - this.width / 2, // центрируем по X
                this.y - this.height / 2, // центрируем по Y
                this.width,
                this.height
            );
        }
    }

    // метод для "взмаха" — прыжка птицы вверх
    flap() {
        this.velocity = -this.flapPower; // отрицательное значение — вверх
    }

    // метод для обновления состояния птицы
    update() {
        this.velocity += this.gravity; // добавляем притяжение
        this.y += this.velocity; // изменяем положение по Y

        this.draw(); // отрисовываем новое положение
    }
}

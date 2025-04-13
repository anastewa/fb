import { Pipe } from "./pipe.js";
import { loadImage } from "./utils.js";
import { Bird } from "./birds.js";
import { checkCollision } from "./collission.js";
export class Game {
    SPEED = 3; //элементы будут двигаться три пикселя в один кадр
    DISTANCE_BETWEEN_PIPES = 450 //через каждые 450 пикселей трубы будут создаваться новая
    frameCount = 0;
    score = 0;  //счётчик очков
    
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        const width = window.visualViewport ? Math.min(window.visualViewport.width, height * 0.6) : Math.min(window.innerWidth, height * 0.6);
        this.canvas.height = 900;
        this.canvas.width = 900 * width / height;

        this.BG_IMG = new Image(); // фон
        this.pipes = [new Pipe(this.canvas)]; // трубы
        this.bird = new Bird(this.canvas); // птичка
    }

    async loadAssets() {
        this.BG_IMG = new Image();
        this.BG_IMG.src = "./assets/bg.png"; 
        console.log('Загружаю фон...');
        
        await Bird.preloadImage();   // загрузка птички
        return new Promise((resolve, reject) => {
            this.BG_IMG.onload = () => {
                console.log('Фон загружен');
                resolve();
            };
            this.BG_IMG.onerror = (err) => {
                console.log('Ошибка загрузки фона', err);
                reject("Не удалось загрузить фон");
            };
        });
    }

    start() {  
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                this.bird.flap(); // птичка прыгает
            }
        });
        this.intervalId = setInterval(() => this.draw(), 10); // рисовка начинается
    }

    stop() {
        clearInterval(this.intervalId); // останавливаем игру
    }

    draw() {
        this.ctx.drawImage(this.BG_IMG, 0 , 0 , this.canvas.width, this.canvas.height); // рисуем фон

        // добавляем новую трубу, если прошло нужное количество кадров
        if (this.frameCount * this.SPEED > this.DISTANCE_BETWEEN_PIPES) {
            this.pipes.push(new Pipe(this.canvas)); // новая труба
            this.frameCount = 0; // сбрасываем счетчик
        }

        this.updatePipes(); // обновляем трубы
        this.bird.update(); // обновляем птичку

        // проверка на столкновение
        if (checkCollision(this.bird, this.pipes)) this.stop();

        // увеличиваем счет, если птичка прошла трубу
        this.pipes.forEach(pipe => {
            if (pipe.x + pipe.width < this.bird.x && !pipe.passed) {
                this.score++; // увеличиваем счет
                pipe.passed = true; // помечаем трубу как пройденную
            }
        });

        // отображаем счет
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: " + this.score, 20, 40); // выводим счет

        this.frameCount++; // увеличиваем кадры для труб
    }

    updatePipes() {
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].update(this.SPEED); // двигаем трубы
        }

        // удаляем трубы, которые вышли за экран
        this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);
    }
}

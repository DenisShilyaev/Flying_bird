let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Звуки
let fly_audio = new Audio(); // Звук при прыжке
let score_audio = new Audio(); // Звук при увеличении очков

//Ниже создаем ссылки на нужные аудио файлы
fly_audio.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3"; 

// Изображения
let bird = new Image(); // Создание объекта птица
let background = new Image(); // Создание объекта фон
let pipeUp = new Image(); // Создание объекта верхняя труба
let pipeDown = new Image(); // Создание объекта нижняя труба
let land = new Image(); // Создание объекта земля 

//Ниже создаем ссылки на нужные изображения
bird.src = "img/bird.png";
background.src = "img/background.png";
pipeUp.src = "img/pipeUp.png";
pipeDown.src = "img/pipeDown.png";
land.src = "img/land.png.";


const moveUp = () => {
    yPos -= 25;
    if (yPos < 0) {//Не даем птичке улететь за верхний край игрового поля.
        yPos = 1
    }
    fly_audio.play();
}

document.addEventListener("keydown", moveUp); //При нажатии на любую клавишу поднимаем птицу

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

let gap = 90 //Ширина щели между трубами


let xPos = 10; // Начальная позиция птицы по оси Х
let yPos = 150; //Начальная позиция птицы по оси Y

let grav = 1; //Гравитация

let score = 0; //Количество очков

const draw = () => { //Отрисовываем изображения
    ctx.drawImage(background, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 75) {//Добавляем новую трубу если текущаяя отдалилась от правого края
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Ниже условие отслеживания столкновений
        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
            grav = 5; //После столкновения с трубой заставляем птичку падать
        }

        if (yPos + bird.height >= cvs.height - land.height){
            location.reload();//При столкновении с землей перезагружаем игру
        }

        if (pipe[i].x == xPos) {//Прибавляем счетчик на +1 после пролета птички между очередными трубами
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(land, 0, cvs.height - land.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;//Прибавляем гравитацию
    
    //Ниже отрисовываем поле для выведения текущего счета
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);


    requestAnimationFrame(draw);
};

land.onload = draw;
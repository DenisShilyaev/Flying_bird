let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

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
    yPos -= 20;
}

document.addEventListener("keydown", moveUp); //При нажатии на любую клавишу поднимаем птицу

let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

let gap = 90 //Ширина щели между трубами

//Позиция птицы
let xPos = 10;
let yPos = 150;

let grav = 1; //Гравитация

const draw = () => { //Отрисовываем изображения
    ctx.drawImage(background, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125){
        	pipe.push({
        		x: cvs.width,
        		y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        	});
        }
    }

    ctx.drawImage(land, 0, cvs.height - land.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;
    requestAnimationFrame(draw);
};

land.onload = draw;
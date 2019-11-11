
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

let gap = 90;

function draw() {//Отрисовываем изображения
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(pipeUp, 100, 0);
	ctx.drawImage(pipeDown, 100, 0 + pipeUp.height + gap);
	ctx.drawImage(land, 0, cvs.height - land.height);
	ctx.drawImage(bird, 20, 150);
};

land.onload = draw;


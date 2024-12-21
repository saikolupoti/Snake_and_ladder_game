
const cssColorsOriginal=["lightblue","lightgray","pink","red","yellow"];
let cssColors=cssColorsOriginal;
class Player {
	constructor(x, y, id) {
		this.x = x;
		this.y = y;
		this.id=id;
	}
	getDomElement(){
		if(!this.dom){
			this.dom = document.createElement("div");
			this.dom.classList.add("player");
			let idx=randIntv1(cssColors.length);
			this.dom.style["background"]=cssColors[idx];
			cssColors.splice(idx,1);
			this.dom.style["marginLeft"]=`${randIntv1(20)}px`;
			this.dom.style["marginTop"]=`${randIntv1(20)}px`;
			let text=document.createTextNode(this.id);
			this.dom.appendChild(text);
		}
		return this.dom;
	}
}

class Ladder {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	getAngle() {
		return Math.atan((this.endY - this.startY) / (this.endX - this.startX));
	}
	getLength() {
		return Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
	}
}

class Snake {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
	getAngle() {
		return Math.atan((this.endY - this.startY) / (this.endX - this.startX));
	}
	getLength() {
		return Math.sqrt(Math.pow(this.endY - this.startY, 2) + Math.pow(this.endX - this.startX, 2));
	}
}

const height = 10;
const width = 10;

let players =[];
let currentPlayer,playerIterator;
let ladders = [
    new Ladder(1, 0, 1, 3, 4),
    new Ladder(2, 4, 2, 8, 5),
    new Ladder(3, 7, 3, 8, 7),
    new Ladder(4, 3, 4, 5, 4),
    new Ladder(5, 1, 5, 7, 6),
    new Ladder(6, 4, 6, 8, 9),
    new Ladder(7, 1, 7, 3, 9),
    new Ladder(8, 2, 7, 6, 4),
];

let snakes = [
    new Snake(1, 7, 0, 3, 0),
    new Snake(2, 3, 2, 1, 4),
    new Snake(3, 9, 3, 8, 2),
    new Snake(4, 6, 6, 0, 9),
    new Snake(5, 8, 6, 5, 2),
    new Snake(6, 9, 8, 7, 6),
    new Snake(7, 5, 8, 4, 9),
];

function randIntv1(x){
	return Math.trunc((Math.random()*100000)%x);
}

function* cyclicIterator(v){
	let i=0;
	let j=v.length;
	while(true){
		yield {idx:i,value:v[i]};
		j=v.length;
		i=(i+1)%j;
	}
}

function startGame(){
	let selector=document.querySelector("#player-num");
	if(!selector.checkValidity()){
		alert("Please select a valid number from 2 to 4");
		selector.valueAsNumber=2;
		return;
	}
	let v=selector.valueAsNumber;
	for(let i=0;i<v;i++){
		players.push(new Player(0,0,i+1));
	}
	playerIterator=cyclicIterator(players);
	currentPlayer=playerIterator.next().value;
	document.querySelector("#gameboard").hidden=false;
	document.querySelector("#welcome").hidden=true;
	document.getElementById("dice-results").innerText=`Player ${currentPlayer.idx+1}'s turn`;
	document.getElementById("roll-dice").disabled = false;
	renderBoard();
}

function restart() {
	document.getElementById("win").hidden = true;
	document.querySelector("#gameboard").hidden=true;
	document.querySelector("#welcome").hidden=false;
	players=[]; 
	cssColors=cssColorsOriginal; 
	currentPlayer=undefined;
	playerIterator=undefined; 
}

function initializeBoard() {
	let board = [];
	for (let y = 0; y < height; y++) {
		let array = [];
		for (let x = 0; x < width; x++) {
			array.push(new Tile(x, y));
		}
		board.push(array);
	}
	return board;
}

function initializeLadders() {}

function renderBoard() {
	let output = document.getElementById("board");
	output.innerHTML = "";
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let tile = document.createElement("div");
			tile.classList.add("tile");

			players.forEach((player) => {
				if(player.x == x && player.y == y){
					tile.appendChild(player.getDomElement());
				}
			});
			output.append(tile);
		}
	}
}

async function rollDice() {
	let result = randIntv1(6)+1;

	document.getElementById("dice-results").innerText = `dice: ${result}`;
	document.getElementById("roll-dice").disabled = true;
	for (let i = 0; i < result; i++) {
		await new Promise(resolve => setTimeout(resolve, 200));
		movePlayer(currentPlayer.value);
		if(checkWin(currentPlayer))return i+1;
	}
	document.getElementById("roll-dice").disabled = false;
	await new Promise(resolve => setTimeout(resolve, 200));
	checkLadder(currentPlayer.value);
	checksnakes(currentPlayer.value);
	currentPlayer=playerIterator.next().value;
	document.getElementById("dice-results").innerText=`Player ${currentPlayer.idx+1}'s turn`;
	return result;
}

function movePlayer(player) {
	if (player.y % 2 == 0) {

		if (player.x >= width - 1) {
			player.y++;
		} else {
			player.x++;
		}
	} else {
		if (player.x <= 0) {
			player.y++;
		} else {
			player.x--;
		}
	}
	renderBoard();
}

function checkLadder(player) {
	ladders.forEach(ladder => {
		if (ladder.startX == player.x && ladder.startY == player.y) {
			player.x = ladder.endX;
			player.y = ladder.endY;
			renderBoard();
		}
	});
}

function checksnakes(player) {
	snakes.forEach(Snake => {
		if (Snake.startX == player.x && Snake.startY == player.y) {
			player.x = Snake.endX;
			player.y = Snake.endY;
			renderBoard();
		}
	});
}

function checkWin(data) {
	let player=data.value;
	let idx=data.idx;
	if (height % 2 == 0) {
		if (player.y >= height - 1 && player.x <= 0) {
			console.log("WIN");
			document.getElementById("win").hidden = false;
			document.getElementById("win-text").innerHTML=`Player ${idx+1} wins`;
			return true;
		}
	} else {
		if (player.y >= height - 1 && player.x >= width - 1) {
			console.log("WIN");
			document.getElementById("win").hidden = false;
			document.getElementById("win-text").innerHTML=`Player ${idx+1} wins`;
			return true;
		}
	}
}

function openDrawer() {
	document.getElementById("drawer").style.width = "400px";
  }

  function closeDrawer() {
	document.getElementById("drawer").style.width = "0";
  }
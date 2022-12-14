// walls // 
// there are better ways of doing this but oh well
const wallsWidth = 600;
const wallsHeight = 600;
const wallWidth = 15;
const wallHeight = 15;
let wallsWidth1 = [];
let wallsWidth2 = [];
let wallsHeight1 = [];
let wallsHeight2 = [];

let walls = [];
let gameManager = null;

function GameManager() {
	this.player = null;
	this.score = 0;
	this.highscore = 0;
	this.highscoreDiv = null;
	this.pause = false;
	this.tmpBox = null;
	this.pauseMenuDiv = null;
	this.id = 0;
	this.walls = [];
	this.AIs = [];
	this.pauseMenu = null;
	this.classMenu = new Menu();
	this.mainMenu = new Menu();
	this.paladinInfo = new Menu();
	this.bouncerInfo = new Menu();
	this.angelInfo = new Menu();
	this.hudDivs = []; // 0 is class points remaining
	
	this.swarmMode = false;
	
	this.updateClassPts = function() {
		if(this.hudDivs[0] != null) {
			document.body.removeChild(this.hudDivs[0]);
			this.hudDivs.splice(0, 1);
		}
		if(this.score%300 == 0) {
			this.getPlayer().increaseClassPts();
		}
		const el = document.createElement("h1");
		el.style.left = 650 + "px";
		el.style.top =  75 + "px";
		el.style.color = "black";
		el.style.fontSize = "16px";
		el.style.display = "inline-block";
		el.style.position = "fixed"
		el.innerText = "Power : " + this.getPlayer().getClassPts() + "/" + this.getPlayer().getMaxClassPts();
		el.style.zIndex = 3;
		document.body.appendChild(el);
		this.hudDivs.push(el);
		console.log("updating power...");
	}
	
	this.setMainMenu = function(main) {
		this.mainMenu = main;
	}
	
	this.getPaladinInfo = function() {
		return this.paladinInfo;
	}
	
	this.getBouncerInfo = function() {
		return this.bouncerInfo;
	}
	
	this.getAngelInfo = function() {
		return this.angelInfo;
	}
	
	this.getClassMenu = function() {
		return this.classMenu;
	}
	
	this.getMainMenu = function() {
		return this.mainMenu;
	}
	
	this.getPauseMenu = function() {
		return this.pauseMenu;
	}	
	
	this.setPauseMenu = function(pause) {
		this.pauseMenu = pause;
	}
	
	this.getId = function() {
		return this.id;
	}
	
	this.getAI = function(i) {
		return this.AIs[i];
	}
	
	this.setId = function(id) {
		this.id = id;
	}
	
	this.updatePlayerDirection = function(direction) {
		this.player.setDirection(direction);
	}
	
	this.setPlayer = function(player) {
		this.player = player;
	}
	
	this.getPlayer = function() {
		return this.player;
	}
	
	this.setPauseMenuDiv = function(pmDiv) {
		this.pauseMenuDiv = pmDiv;
	}
	
	this.getPauseMenuDiv = function() {
		return this.pauseMenuDiv;
	}
	
	this.togglePause = function() {
		if(this.pause) {
			this.pause = false;
		} else {
			this.pause = true;
		}
	}
	
	this.getPause = function() {
		return this.pause;
	}
	
	this.setHighscore = function(hscore) {
		this.highscore = hscore;
	}
	
	this.getHighscore = function() {
		return this.highscore;
	}
	
	this.setTmpBox = function(tBox) {
		this.tmpBox = tBox;
	}
	
	this.getTmpBox = function(tBox) {
		return this.tmpBox;
	}
	
	this.setScore = function(score) {
		this.score = score;
	}
	
	this.getScore = function() {
		return this.score;
	}
	
	this.showPauseMenu = function() {
		const el = document.createElement("h1");
		el.style.left = "50%";
		el.style.top =  "50%";
		el.style.color = "black";
		el.style.display = "inline-block";
		el.style.position = "fixed"
		el.innerText = "Paused";
		el.style.zIndex = 55; // just a really high number
		document.body.appendChild(el);
		this.pauseMenuDiv = el;
	}
	
	this.updateScore = function() {
		this.score++;
		if(this.score%50 == 0) {
			let rand = Math.floor((Math.random() * 4));
			let x = 0;
			let y = 0;
			if(rand == 0) {
				x = -30;
				y = -30;
			} else if(rand == 1) {
				x = 615;
				y = -30;
			} else if(rand == 2) {
				x = -30;
				y = 615;
			} else if(rand == 3) {
				x = 615;
				y = 615;
			}
			if(this.swarmMode == true) {
				for(let i = 0; i < 10; i++) {
					this.tmpBox = new BoxAI(x, y);	
					this.AIs.push(this.tmpBox);
				}
			} else { 
				this.tmpBox = new BoxAI(x, y);	
				this.AIs.push(this.tmpBox);
			}
		}
		
		if(this.scoreDiv == null) {
			console.log("creating score");
			const el = document.createElement("h1");
			el.style.left = 500 + "px";
			el.style.top =  25 + "px";
			el.style.color = "black";
			el.style.fontSize = "16px";
			el.style.display = "inline-block";
			el.style.position = "fixed"
			el.innerText = "Score : " + this.score;
			el.style.zIndex = 3;
			document.body.appendChild(el);
			this.scoreDiv = el;
			console.log(this.scoreDiv);
		}
		this.scoreDiv.innerText = "Score : " + this.score;
	}
	
	this.logic = function() {
		if(this.pause == false) {
			if(this.pauseMenuDiv != null) {
				document.body.removeChild(this.pauseMenuDiv);
				this.pauseMenuDiv = null;	
			}
			this.player.logic();
			for(let i = 0; i < this.AIs.length; i++) {
				this.AIs[i].logic();
			}
			this.updateScore();
			this.updateClassPts();
		} else {
			if(this.pauseMenuDiv == null) this.showPauseMenu();
		}
	}
	
	this.restart = function() {
		for(let i = 0; i < this.AIs.length; i++) {
			document.body.removeChild(this.getAI(i).getDiv());
		}
		this.AIs = [];
		if(this.getHighscore() < this.getScore()) {
			this.setHighscore(this.getScore());
		}
		if(this.highscoreDiv != null) {
			document.body.removeChild(this.highscoreDiv);
		}
		const el = document.createElement("h1");
		el.style.left = 650 + "px";
		el.style.top =  25 + "px";
		el.style.color = "black";
		el.style.fontSize = "16px";
		el.style.display = "inline-block";
		el.style.position = "fixed"
		el.innerText = "HighScore : " + this.getHighscore();
		el.style.zIndex = 3;
		document.body.appendChild(el);
		this.highscoreDiv = el;
		console.log(this.highscoreDiv);
		score = 5;
		document.body.removeChild(this.player.getDiv());
		this.getPlayer().direction = "none";
		this.getPlayer().resetClassPts();
		clearTimeout(this.id);
		if(this.getPlayer().getTimeoutId() != 0) {
			clearTimeout(this.getPlayer().getTimeoutId());
			this.getPlayer().setTimeoutId(0);
		}
		reset();
	}
	
	
}

function createBorder(width, height) { // the width and height must be % 15 = 0
	
	while(wallsWidth1.length * wallWidth < wallsWidth) {
		let div = createDiv(wallsWidth1.length * wallWidth, 0, wallWidth, wallHeight, "gray")
		wallsWidth1.push(div);
		walls.push(div);
	}
	while(wallsWidth2.length * wallWidth < wallsWidth) {
		let div = createDiv(wallsWidth2.length * wallWidth, wallsHeight, wallWidth, wallHeight, "gray")
		wallsWidth2.push(div);
		walls.push(div);
	}
	
	while(wallsHeight1.length * wallHeight < wallsHeight) {
		let div = createDiv(0, wallsHeight1.length * wallHeight, wallWidth, wallHeight, "gray");
		wallsHeight1.push(div);
		walls.push(div);
	}
	while(wallsHeight2.length * wallHeight < wallsHeight) {
		let div = createDiv(wallsWidth, wallsHeight2.length * wallHeight, wallWidth, wallHeight, "gray");
		wallsHeight2.push(div);
		walls.push(div);
	}
	
}

function createDiv(id_x, id_y, width, height, color) {
	const el = document.createElement("div");
	el.style.width =  width + "px";
	el.style.height =  height + "px";
	el.style.left = id_x + "px";
	el.style.top = id_y + "px";
	el.style.color = color;
	el.style.backgroundColor = color;
	el.style.display = "inline-block";
	el.style.position = "fixed";
	document.body.appendChild(el);
	return el;
}

function createMenuButton(id_x, id_y, str, width, height, color) {
	const el = document.createElement("div");
	el.style.width =  width + "px";
	el.style.height =  height + "px";
	el.style.left = id_x + "px";
	el.style.top = id_y + "px";
	el.style.color = "white";
	el.style.backgroundColor = color;
	el.style.display = "none";
	el.style.position = "fixed";
	el.innerText = str;
	el.style.textAlign = "center";
	el.style.verticalAlign = "middle";
	el.addEventListener("click", click);
	document.body.appendChild(el);
	return el;
}

function createMenuText(id_x, id_y, str, width, height) {
	const el = document.createElement("div");
	el.style.width =  width + "px";
	el.style.height =  height + "px";
	el.style.left = id_x + "px";
	el.style.top = id_y + "px";
	el.style.color = "black";
	el.style.backgroundColor = "white";
	el.style.display = "none";
	el.style.position = "fixed";
	el.innerText = str;
	el.style.textAlign = "center";
	el.style.verticalAlign = "middle";
	el.addEventListener("click", click);
	document.body.appendChild(el);
	return el;
}

function Menu() {
	this.buttons = [];
	this.displayed = false;
	
	this.isMenuDisplayed = function() {
		return this.displayed;
	}
	
	this.getButton = function(innerText) {
		for(let i = 0; i < this.buttons.length; i++) {
			if(this.buttons[i].innerText == innerText) return this.buttons[i];
		}
	}
	
	this.getButtons = function() {
		return this.buttons;
	}
	
	this.addButton = function(but) {
		this.buttons.push(but);
	}
	
	this.isDisplayed = function() {
		return this.displayed;
	}
	
	
	this.toggleDisplay = function() {
		if(this.displayed == false) {
			this.displayed = true;
			for(let i = 0; i < this.buttons.length; i++) {
				this.buttons[i].style.display = "inline-block";	
			}
		} else {
			for(let i = 0; i < this.buttons.length; i++) {
				this.buttons[i].style.display = "none";
			}
			this.displayed = false;
		}
	}
}

function BoxAI(x, y) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 15;
	this.score = 0;
	this.div = createDiv(this.x, this.y, this.width, this.height, "red");
	this.respawnX = x;
	this.respawnY = y;
	
	
	this.getRespawnX = function() {
		return this.respawnX;
	}
	
	this.getRespawnY = function() {
		return this.respawnY;
	}
	
	this.setX = function(x) {
		this.x = x;
	}
	
	this.setY = function(y) {
		this.y = y;
	}
	
	this.getX = function() {
		return this.x;
	}
	
	this.getY = function() {
		return this.y;
	}
	
	this.getDiv = function() {
		return this.div;
	}
	
	this.logic = function() {
		this.move();
		this.div.style.left = this.x + "px";
		this.div.style.top = this.y + "px";
	}
	
	this.move = function() {
		let rand = Math.floor((Math.random() * 10));
		if(rand >= 4) {
			let player = gameManager.getPlayer();
			if(player.getX() > this.getX()) {
				this.moveRight();
			} else if(player.getX() < this.getX()) { 
				this.moveLeft();
			}
			if(player.getY() > this.getY()) {
				this.moveDown();
			} else if(player.getY() < this.getY()) {
				this.moveUp();
			}
		} else {
			if(rand == 0) {
				this.moveUp();
			} else if(rand == 1) {
				this.moveDown();
			} else if(rand == 2) {
				this.moveLeft();
			} else if(rand == 3) {
				this.moveRight();
			}
		}
	}
	
	this.moveUp = function() {
		this.y -= 5;
	}
	
	this.moveDown = function() {
		this.y += 5;
	}
	
	this.moveLeft = function() {
		this.x -= 5;
	}
	
	this.moveRight = function() {
		this.x += 5;
	}
	
	this.getWidth = function() {
		return this.width;
	}
	
	this.getHeight = function() {
		return this.height;
	}
	
	
}

function Player(x, y, c) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 15;
	this.score = 0;
	this.direction = "none";
	this.div = createDiv(this.x, this.y, this.width, this.height, "purple");
	this.alive = true;
	if(c == null) {
		this.class = "paladin";
	} else {
		this.class = c;
	}
	this.maxClassPts = 5;
	this.classPts = 3;
	this.speed = 15;
	this.timeoutId = 0;
	this.invincible = false;
	
	/**
	 *	Classes:
	 *	paladin - can kill 3 enemies (tanks 3 hits)
	 *	angel - can "fly" over enemies 2 times (can't be hit for 3 seconds)
	 *	bomber - can kill ai with bombs 3 times
	 *	bouncer - bounces off walls (gives a speed boost [1.5 speed for 2 seconds])	
	 *
	 *	Classes ability counts reset after each level (thinking every 100 points)
	 *
	 **/
	
	this.setInvincible = function(i) {
		this.invincible = i;
		if(i == false) {
			this.setTimeoutId(0);
		}
	}
	
	this.getInvincible = function() {
		return this.invincible;
	}
	
	this.setTimeoutId = function(s) {
		this.timeoutId = s;
	}
	this.getTimeoutId = function() {
		return this.timeoutId;
	}
	
	this.setSpeed = function(sp) {
		this.speed = sp;
	}
	
	this.getSpeed = function() {
		return this.speed;
	}
	
	this.getClass = function() {
		return this.class;
	}
	
	this.setClass = function(c) {
		this.class = c;
	}
	
	this.resetClassPts = function() { //TODO this will change per class
		this.classPts = 3;
	}
	
	this.reduceClassPts = function() {
		this.classPts--;
	}
	
	this.increaseClassPts = function() {
		if(this.classPts < this.maxClassPts) {
			this.classPts++;
		}
	}
	
	this.getMaxClassPts = function() {
		return this.maxClassPts;
	}
	
	this.getClassPts = function() {
		return this.classPts;
	}
	
	this.setDirection = function(direction) {
		this.direction = direction;
	}
	
	this.getDirection = function() {
		return this.direction;
	}
	
	this.getX = function() {
		return this.x;
	}
	
	this.setLocation = function(x, y) {
		this.x = x;
		this.y = y;
	}
	
	this.getDiv = function() {
		return this.div;
	}
	
	this.logic = function() {
		if(this.alive) {
			this.move();
			this.div.style.left = this.x + "px";
			this.div.style.top = this.y + "px";
			//this.hitCollision();
		} else {
			gameManager.restart();
		}
	}
	
	this.hitCollision = function() {
		for(let i = 0; i < walls.length; i++) {
			let wallX = parseInt(walls[i].style.left);
			let wallY = parseInt(walls[i].style.top);
			if(((this.getX() >= wallX && this.getX() <= wallX + wallWidth) ||
				(this.getX() + this.getWidth() >= wallX && this.getX() + this.getWidth() <= wallX + wallWidth))
				&& ((this.getY() >= wallY && this.getY() <= wallY + wallHeight) || 
				(this.getY() + this.getHeight() >= wallY && this.getY() + this.getHeight() <= wallY + wallHeight))) {
				console.log("touching a wall");
			console.log(this.getY());//15
			console.log(this.getY() + this.getHeight());//30
			console.log(wallY);//0
			console.log(wallY + wallHeight);//15
			
			console.log(this.getX()); //300
			console.log(this.getX() + this.getWidth()); //315
			console.log(wallX); //285
			console.log(wallX + wallWidth);//300
			
			if(this.getClass().match("bouncer")) {
				if(this.getClassPts() == 0) {
					this.alive = false;
				} else {
					switch(this.getDirection()) {
						case "right":
							this.setDirection("left");
							break;
						case "left":
							this.setDirection("right");
							break;
						case "down":
							this.setDirection("up");
							break;
						case "up":
							this.setDirection("down");
							break;
					}
					
					if(this.getSpeed() == 15) {
						if(this.getTimeoutId() != 0) {
							clearTimeout(this.getTimeoutId());
							this.setTimeoutId(0);
						}
						this.setSpeed(20);
						this.setTimeoutId(setTimeout("gameManager.getPlayer().setSpeed(15)", 4000));
						this.reduceClassPts();
					}
				}
				break;
			} else {
				this.alive = false;
			}
				}
		}
		
		//TODO this only checks top left corner of player for collision (kinda works)
		for(let i = 0; i < gameManager.AIs.length; i++) {
			let tmp = gameManager.getAI(i);
			if(((this.getX() >= tmp.getX() && this.getX() <= tmp.getX() + tmp.getWidth()) ||
				(this.getX() + this.getWidth() >= tmp.getX() && this.getX() + this.getWidth() <= tmp.getX() + tmp.getWidth()))
				&& ((this.getY() >= tmp.getY() && this.getY() <= tmp.getY() + tmp.getHeight()) || 
				(this.getY() + this.getHeight() >= tmp.getY() && this.getY() + this.getHeight() <= tmp.getY() + tmp.getHeight()))) {
				if(this.getClass().match("paladin")) {
					if(this.getClassPts() == 0) {
						this.alive = false;				
					} else {
						this.reduceClassPts();
						gameManager.getAI(i).setX(gameManager.getAI(i).getRespawnX());
						gameManager.getAI(i).setY(gameManager.getAI(i).getRespawnY());
					}
				} else if(this.getClass().match("angel")) {
					if(this.getClassPts() == 0 && !this.getInvincible()) {
						this.alive = false;
					} else {
						if(this.getTimeoutId() == 0) {
							this.setInvincible(true);
							this.setTimeoutId(setTimeout("gameManager.getPlayer().setInvincible(false)", 2000));
							this.reduceClassPts();
						}
					}					
				} else {
					this.alive = false;
				}
				}
		}
	}
	
	this.getY = function() {
		return this.y;
	}
	
	this.move = function() {
		for(let i = 0; i < this.getSpeed(); i++) {
			switch(this.getDirection()) {
				case "right":
					this.moveRight();
					break;
				case "left":
					this.moveLeft();
					break;
				case "up":
					this.moveUp();
					break;
				case "down":
					this.moveDown();
					break;
				default:
					this.hitCollision();
					break;
			}
		}
	}
	
	this.moveUp = function() {
		this.y -= 1;
		this.hitCollision();
	}
	
	this.moveDown = function() {
		this.y += 1;
		this.hitCollision();
	}
	
	this.moveLeft = function() {
		this.x -= 1;
		this.hitCollision();
	}
	
	this.moveRight = function() {
		this.x += 1;
		this.hitCollision();
	}
	
	this.setAlive = function() {
		this.alive = true;
	}
	
	this.getWidth = function() {
		return this.width;
	}
	
	this.getHeight = function() {
		return this.height;
	}
	
}

function click(ev) { //TODO this will have to be changed to only check if certain menus are enabled
	console.log(ev.srcElement.outerText);
// 	console.log(ev.path[0]);
	let mainMenu = gameManager.getMainMenu();
	let classMenu = gameManager.getClassMenu();
	let paladinInfo = gameManager.getPaladinInfo();
	let angelInfo = gameManager.getAngelInfo();
	let bouncerInfo = gameManager.getBouncerInfo();
	if(angelInfo.isDisplayed()) {
		if(ev.srcElement.outerText == "Return to class menu") {
			angelInfo.toggleDisplay();
			classMenu.toggleDisplay();
		}
	}
	if(bouncerInfo.isDisplayed()) {
		if(ev.srcElement.outerText == "Return to class menu") {
			bouncerInfo.toggleDisplay();
			classMenu.toggleDisplay();
		}
	}
	if(paladinInfo.isDisplayed()) {
		if(ev.srcElement.outerText == "Return to class menu") {
			paladinInfo.toggleDisplay();
			classMenu.toggleDisplay();
		}
	}
	if(classMenu.isDisplayed()) {
		let paladin = classMenu.getButton("paladin");
		let bouncer = classMenu.getButton("bouncer");
		let angel = classMenu.getButton("angel");
		switch(ev.srcElement.outerText) {
			case "paladin":
				gameManager.getPlayer().setClass("paladin");
				paladin.style.backgroundColor = "cyan";
				bouncer.style.backgroundColor = "black";
				angel.style.backgroundColor = "black";
				break;
			case "angel":
				gameManager.getPlayer().setClass("angel");
				paladin.style.backgroundColor = "black";
				bouncer.style.backgroundColor = "black";
				angel.style.backgroundColor = "cyan";
				break;
			case "bouncer":
				gameManager.getPlayer().setClass("bouncer");
				paladin.style.backgroundColor = "black";
				bouncer.style.backgroundColor = "cyan";
				angel.style.backgroundColor = "black";
				break;
			case "paladin info":
				classMenu.toggleDisplay();
				paladinInfo.toggleDisplay();
				break;
			case "angel info":
				classMenu.toggleDisplay();
				angelInfo.toggleDisplay();
				break;
			case "bouncer info":
				classMenu.toggleDisplay();
				bouncerInfo.toggleDisplay();
				break;
		}
	}
	switch(ev.srcElement.outerText) {
		case "start":
			start();
			console.log("game has started...");
			mainMenu.toggleDisplay();
			break;
		case "options":
			//mainMenu.toggleDisplay();
			console.log("options was pressed");
			break;
		case "class":
			mainMenu.toggleDisplay();
			classMenu.toggleDisplay();
			break;
		case "back to main menu":
			classMenu.toggleDisplay();
			mainMenu.toggleDisplay();
			console.log("back to main menu");
			break;
	}
}

function release(ev) {
	switch(ev.key) {
		case "ArrowLeft":
		case "A":
		case "a":
			if(gameManager.getPlayer().getDirection() == "left") gameManager.getPlayer().setDirection("none");
			break;
		case "ArrowRight":
		case "D":
		case "d":
			if(gameManager.getPlayer().getDirection() == "right") gameManager.getPlayer().setDirection("none");
			break;
		case "ArrowUp":
		case "W":
		case "w":
			if(gameManager.getPlayer().getDirection() == "up") gameManager.getPlayer().setDirection("none");
			break;
		case "ArrowDown":
		case "S":
		case "s":
			if(gameManager.getPlayer().getDirection() == "down") gameManager.getPlayer().setDirection("none");
			break;
			
	}
}

function press(ev) {
	console.log(ev.key);
	switch(ev.key) {
		case "ArrowLeft":
		case "A":
		case "a":
			gameManager.getPlayer().setDirection("left");
			break;
		case "ArrowRight":
		case "D":
		case "d":
			gameManager.getPlayer().setDirection("right");
			break;
		case "ArrowUp":
		case "W":
		case "w":
			gameManager.getPlayer().setDirection("up");
			break;
		case "ArrowDown":
		case "S":
		case "s":
			gameManager.getPlayer().setDirection("down");
			break;
		case "p":
			//TODO you can change your direction while the game is paused
			gameManager.togglePause();
			console.log("toggle");
			break;
		case "o":
			gameManager.swarmMode = true;
			break;
		default:
			//gameManager.getPlayer().setDirection("none");
			break;
	}
}

function logic() {
	if(!gameManager.getMainMenu().isMenuDisplayed()) {
		gameManager.logic();		
	}
}

function start() {
	console.log("The game has started!");
	createBorder();
	gameManager.getPlayer().setAlive();
	gameManager.getPlayer().setLocation(300, 300);
	
	gameManager.setTmpBox(new BoxAI(-30, -30));
	gameManager.AIs.push(gameManager.getTmpBox());
	gameManager.setScore(0);
	gameManager.setId(setInterval(logic, 41.1116)); // about 25 fps
}

function reset() { // send to main menu and reset player values (in this case just make a new player, so you don't have to deal with all the values you might need to reset)
	gameManager.setPlayer(new Player(-300, 300, gameManager.getPlayer().getClass()));
	gameManager.getMainMenu().toggleDisplay();
}

function setup() {
	let classMenu = gameManager.getClassMenu();
	let mainMenu = gameManager.getMainMenu();
	let paladinInfo = gameManager.getPaladinInfo();
	let angelInfo = gameManager.getAngelInfo();
	let bouncerInfo = gameManager.getBouncerInfo();
	paladinInfo.addButton(createMenuText(300, 200, "The paladin can kill an enemy at the cost of 1 power point, if the paladin doesn't have a power point the paladin will die", 100, 50, "cyan"));
	paladinInfo.addButton(createMenuButton(300, 450, "Return to class menu", 100, 50, "black"));
	angelInfo.addButton(createMenuText(300, 200, "The angel upon getting hit will begin to fly above the enemies for 3 seconds at the cost of 1 power point, if the angel doesn't have a power point the angel will die", 100, 50, "cyan"));
	angelInfo.addButton(createMenuButton(300, 450, "Return to class menu", 100, 50, "black"));
	bouncerInfo.addButton(createMenuText(300, 200, "The bouncer can bounce off walls, this gives a small speed boost", 100, 50, "cyan"));
	bouncerInfo.addButton(createMenuButton(300, 450, "Return to class menu", 100, 50, "black"));
	gameManager.setPlayer(new Player(-300, 300, null));
	classMenu.addButton(createMenuButton(300, 200, "paladin", 100, 50, "cyan"));
	classMenu.addButton(createMenuButton(300, 300, "angel", 100, 50, "black"));
	classMenu.addButton(createMenuButton(300, 400, "bouncer", 100, 50, "black"));
	classMenu.addButton(createMenuButton(300, 500, "back to main menu", 100, 50, "black"));
	classMenu.addButton(createMenuButton(450, 200, "paladin info", 100, 50, "black"));
	classMenu.addButton(createMenuButton(450, 300, "angel info", 100, 50, "black"));
	classMenu.addButton(createMenuButton(450, 400, "bouncer info", 100, 50, "black"));
	//classMenu.addButton(createMenuButton(300, 300, "bomber", 100, 50, "blue"));
	
	mainMenu.addButton(createMenuButton(300, 200, "start", 100, 50, "black"));
	mainMenu.addButton(createMenuButton(300, 300, "options", 100, 50, "black"));
	mainMenu.addButton(createMenuButton(300, 400, "class", 100, 50, "black"));
	mainMenu.toggleDisplay();
}

gameManager = new GameManager();
setup();

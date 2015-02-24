(function(){

	var box2dUtils;		// classe utilitaire
	var world; 			// "monde" 2dbox
	var canvas;			// notre canvas
	var canvasWidth;	// largeur du canvas
	var canvasHeight;	// hauteur du canvas
	var context;		// contexte 2d
	var SCALE = 30;		// �chelle
	
	var player = null;
	var keys = [];

	// Initialisation
	$(document).ready(function() {
		init();

	});

	// Lancer � l'initialisation de la page
	this.init = function() {
		box2dUtils = new Box2dUtils(SCALE);	// instancier la classe utilitaire

		// R�cup�rer la canvas, ses propri�t�s et le contexte 2d
		canvas = $('#gipCanvas').get(0);
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);
		context = canvas.getContext('2d');

		world = box2dUtils.createWorld(context); // box2DWorld
		
		// Cr�er le "sol" et le "plafond" de notre environnement physique
		ground = box2dUtils.createBox(world, 400, canvasHeight - 10, 400, 10, true, 'ground');
		ceiling = box2dUtils.createBox(world, 400, -5, 400, 1, true, 'ceiling');
		
		// Cr�er les "murs" de notre environnement physique
		leftWall = box2dUtils.createBox(world, -5, canvasHeight, 1, canvasHeight, true, 'leftWall');
		leftWall = box2dUtils.createBox(world, canvasWidth + 5, canvasHeight, 1, canvasHeight, true, 'leftWall');
		
		// Cr�er les "box"
		box2dUtils.createBox(world, 250, 0, 40, 40, false, 'box');
		box2dUtils.createBox(world, 450, 0, 100, 100, false, 'box');
		
		// Cr�er le player
		player = new Player(SCALE);
		player.createPlayer(world, 25, canvasHeight-30, 20);

		// Ajouter les listeners d'�v�nements
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		
		// D�sactiver les scrollings vertical lors d'un appui sur les touches directionnelles "haut" et "bas"
		document.onkeydown = function(event) {
			return event.keyCode != 38 && event.keyCode != 40;
		}
		
		// Ex�cuter le rendu de l'environnement 2d
		window.setInterval(update, 1000 / 60);
		
	}

	// Mettre � jour le rendu de l'environnement 2d
	this.update = function() {

		// g�rer les interactions
		handleInteractions();
		
        // effectuer les simulations physiques et mettre � jour le canvas
		world.Step(1 / 60,  10, 10);
		world.DrawDebugData();
		world.ClearForces();
	}
	
	// appuyer sur une touche
	this.handleKeyDown = function(evt) {
		keys[evt.keyCode] = true;
	}

	// relacher une touche
	this.handleKeyUp = function(evt) {
		keys[evt.keyCode] = false;
	}

	// G�rer les interactions
	this.handleInteractions = function() {
		// touche "haut"
		if (keys[38]) {
			player.jump();
		}
		// touches "gauche" et "droite"
		if (keys[37]) {
			player.moveLeft();
		} else if (keys[39]) {
			player.moveRight();
		}	
	}
	
}());
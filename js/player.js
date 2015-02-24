(function(){
		
	/**
	 * Constructeur
	 * @param Number scale échelle
	 */
	Player = function(scale) {
		this.scale = scale;							// échelle
		this.box2dUtils = new Box2dUtils(scale);	// instancier la classe utilitaire box2d
		this.object = null;							// l'objet "physique" player
	}
	
	/**
	 * Classe Player
	 */
	Player.prototype = {
		
		/**
		 * Créer l'objet "physique" player
		 * @param b2World world : le monde 2dbox dans lequel ajouter le player
		 * @param Number x : position x du player
		 * @param Number y : position y du player
		 * @param Number radius : le rayon du body player
		 */
		createPlayer : function(world, x, y, radius) {
			this.object = this.box2dUtils.createPlayer(world, x, y, radius, 'player');
		},
	
		/**
		 * Sauter
		 */
		jump : function() {
			var vel = this.object.GetBody().GetLinearVelocity();
			vel.y = -200 / this.scale;
		},
		
		/**
		 * Effectuer un déplacement vers la droite
		 */
		moveRight : function() {
			var vel = this.object.GetBody().GetLinearVelocity();
			vel.x = 140 / this.scale;
		},
		
		/**
		 * Effectuer un déplacement vers la gauche
		 */
		moveLeft : function() {
			var vel = this.object.GetBody().GetLinearVelocity();
			vel.x = -140 / this.scale;
		}
	}
	
}());
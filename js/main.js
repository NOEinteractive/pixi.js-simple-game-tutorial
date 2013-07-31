(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	S.Config = {
        width : Math.min(600, window.innerWidth),
        height : Math.min(400, window.innerHeight)
    };
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(S.Config.width, S.Config.height);
    document.body.appendChild(renderer.view);
    
    //here we just doing some tests for now
	var bkg1, bkg2, ship, enemiesManager, bulletsManager, collisionManager = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/bkg-1.jpg', 'img/bkg-2.jpg', 'img/ship.json','img/enemy.json', 'img/starfield-1.png', 'img/bullet.png']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        
        bkg1 = new S.Background(['img/bkg-1.jpg', 'img/bkg-2.jpg'], 0.7);
        stage.addChild(bkg1);
        bkg1.alpha = 0.6;
        
        bkg2 = new S.Background(['img/starfield-1.png'], 1);
        stage.addChild(bkg2);
        bkg2.alpha = 0.2;
        
        // create ship object
        ship = new S.Ship;
        stage.addChild(ship);
        
        //create the enemy Manager
        enemiesManager = new S.EnemiesManager();
        stage.addChild(enemiesManager);
        
        //create the bullet Manager
        bulletsManager = new S.BulletsManager(ship);
        stage.addChild(bulletsManager);
        
        collisionManager = new S.CollisionManager(ship, enemiesManager, bulletsManager);
        
        // init controls
        S.Controls.start();
        
        requestAnimFrame( animate );
        
    }
    
	function animate() {
	    requestAnimFrame( animate );
		
	    // render the stage   
	    renderer.render(stage);
        collisionManager.checkCollision();
	}
    
    



})();
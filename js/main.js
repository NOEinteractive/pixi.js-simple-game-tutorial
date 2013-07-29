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
	var bkg1 = null,
        bkg2 = null,
      ship = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/bkg-1.jpg', 'img/bkg-2.jpg', 'img/ship.json', 'img/starfield-1.png']);
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
        
        // init controls
        S.Controls.start();
        
        requestAnimFrame( animate );
        
        
        //object pooling test
        //we create 3 enemies in pool
        var enemies = [new S.Enemy(), new S.Enemy()];
        var poolEnemy = new S.Pool(enemies);
        //we want 3 enemies, the pool only contain 2, so the third will wait
        poolEnemy.act(function(e, pool){
            console.log(1);
            console.log(e);
            setTimeout(function() {
                poolEnemy.add(e);
            }, 2000); //2 secondes after, we free the first enemy, so the can could be get
        });
        poolEnemy.act(function(e, pool){
            console.log(2);
            console.log(e);
        });
        poolEnemy.act(function(e, pool){
            console.log(3);
            console.log(e);
        });
    }

	function animate() {
	    requestAnimFrame( animate );
		
	    // render the stage   
	    renderer.render(stage);
	}
    
    



})();
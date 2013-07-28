(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(600, 400);
    document.body.appendChild(renderer.view);
    
    //here we just doing some tests for now
	var bkg1 = null,
      ship = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/bkg-1.jpg', 'img/bkg-2.jpg', 'img/ship.json']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        // create a new Sprite using one of those textures
        bkg1 = new PIXI.Sprite(PIXI.TextureCache['img/bkg-1.jpg']);
        stage.addChild(bkg1);
        
        // create ship object
        ship = new S.Ship;
        stage.addChild(ship);
        
        requestAnimFrame( animate );
    }

	function animate() {
	
	    requestAnimFrame( animate );
	
	    // just for fun, lets move the background
	    bkg1.position.x -= 0.1;
		
	    // render the stage   
	    renderer.render(stage);
	}


})();
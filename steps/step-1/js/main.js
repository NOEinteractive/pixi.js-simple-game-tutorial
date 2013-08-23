// pour ne pas polluer le scope global, nous encapsulons le code dans une fonction autoappelante
(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
    
    //we store global data in S.Config
	S.Config = {
        width : Math.min(600, window.innerWidth),
        height : Math.min(400, window.innerHeight)
    };
    
	// create a renderer instance 
	var renderer = PIXI.autoDetectRenderer(S.Config.width, S.Config.height);
    //append the view in the body
    document.body.appendChild(renderer.view);
    
    //here we just doing some tests for now
    //our main ship
	var ship = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/ship.json']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        
        // create ship object
        ship = new S.Ship;
        
        //and addChild it in the stage
        stage.addChild(ship);
        
        requestAnimFrame( animate );
        
    }
    
    //function called each frame to render the game
	function animate() {
	    requestAnimFrame( animate );
		
	    // render the stage   
	    renderer.render(stage);
	}
    
    



})();
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
	var ship, bkg1, bkg2 = null;
    
    // load all needed assets
    var loader = new PIXI.AssetLoader(['img/bkg-1.jpg', 'img/bkg-2.jpg', 'img/starfield-1.png', 'img/ship.json']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        //create the black background
        bkg1 = new S.Background(['img/bkg-1.jpg', 'img/bkg-2.jpg'], 0.7);
        stage.addChild(bkg1);
        bkg1.alpha = 0.6;
        
        //create the starfield background, for paralaxe effect
        bkg2 = new S.Background(['img/starfield-1.png'], 1);
        stage.addChild(bkg2);
        bkg2.alpha = 0.2;
        
        // init controls
        S.Controls.start();
        
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
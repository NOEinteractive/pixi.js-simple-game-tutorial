(function() {
    // create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x000000);
	
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(600, 400);
    document.body.appendChild(renderer.view);
    
    //here we just doing some tests for now
	var bkg1 = null;
    
    var loader = new S.Loader(['img/bkg-1.jpg', 'img/bkg-2.jpg']);
    loader.addEventListener('complete', function() {
        // create a new Sprite using one of those textures
        bkg1 = new PIXI.Sprite(PIXI.TextureCache['img/bkg-1.jpg']);
        stage.addChild(bkg1);
        requestAnimFrame( animate );
    });
    

	function animate() {
	
	    requestAnimFrame( animate );
	
	    // just for fun, lets move the background
	    bkg1.position.x -= 0.1;
		
	    // render the stage   
	    renderer.render(stage);
	}


})();
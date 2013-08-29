// Pour ne pas polluer le scope global, nous encapsulons le code dans une fonction auto-appelante
(function() {
    // on crée une nouvelle Scene (Stage) PIXI
	var stage = new PIXI.Stage(0x000000);
    
    //On crée un objet global S.Config pour y stocker différentes informations générales
	S.Config = {
        width : Math.min(600, window.innerWidth),
        height : Math.min(400, window.innerHeight)
    };
    
	// on crée un renderer PICI
	var renderer = PIXI.autoDetectRenderer(S.Config.width, S.Config.height);
    //on ajoute la view du renderer dans le DOM
    document.body.appendChild(renderer.view);
    
    //Notre vaisseau principal
	var ship = null;
    
    // On charge les assets (images / sprite (json) )  nécéssaires
    var loader = new PIXI.AssetLoader(['img/ship.json']);
    loader.onComplete = onAssetsLoaded;
	loader.load();
    
    function onAssetsLoaded() {
        
        // On crée une nouvelle instance de vaisseau
        ship = new S.Ship;
        
        //et on ajoute notre vaisseau dans la scene
        stage.addChild(ship);
        
        //boucle d'animation
        requestAnimFrame( animate );
        
    }
    
    //fonction appelée a chaque frame pour rendre notre jeu
	function animate() {
	    requestAnimFrame( animate );
		
	    // rendu de la scene
	    renderer.render(stage);
	}
    
    



})();

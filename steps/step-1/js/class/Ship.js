//Notre première classe : le vaisseau!
S.Ship = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    //appele le constructeur du parent (PIXI.Movieclip)
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = S.Config.height / 2;//centre verticalement notre vaisseau
    
    this.animationSpeed = 0.2;
    
    //joue l'animation du sprite
    this.play();
}

S.Ship.constructor = S.Ship;
// Notre vaisseau hérite de PIXI Movieclip
S.Ship.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * On override la méthode updateTransform appelée à chaque frame
 */
S.Ship.prototype.updateTransform = function() {
    
    PIXI.MovieClip.prototype.updateTransform.call( this ); 
}

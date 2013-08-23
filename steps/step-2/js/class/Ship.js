//our first class, the Ship!
S.Ship = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    //call the parent (PIXI.Movieclip) constructor
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = S.Config.height / 2;//center verticaly our ship
    
    this.animationSpeed = 0.2;
    
    //playing the animation
    this.play();
}

S.Ship.constructor = S.Ship;
// Ship object extend PIXI Movieclip object
S.Ship.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * override updateTransform method, called each frame
 */
S.Ship.prototype.updateTransform = function() {
    
    PIXI.MovieClip.prototype.updateTransform.call( this ); 
}
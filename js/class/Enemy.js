
S.Enemy = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = 200;
    this.anchor.x = this.anchor.y = 0.5;
    
    
}

S.Enemy.constructor = S.Ship;
// Enemy object extend PIXI Movieclip object
S.Enemy.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * override updateTransform method, called each frame
 */
S.Enemy.prototype.updateTransform = function() {
    
    
}
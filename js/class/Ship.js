
S.Ship = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = 200;
    
    this.animationSpeed = 0.2;
    this.play();
}

S.Ship.constructor = S.Ship;
// Ship object extend PIXI Sprite object
S.Ship.prototype = Object.create( PIXI.MovieClip.prototype );

S.Ship.prototype.updateTransform = function() {
    this.position.x += 0.2;
    PIXI.MovieClip.prototype.updateTransform.call( this );
}
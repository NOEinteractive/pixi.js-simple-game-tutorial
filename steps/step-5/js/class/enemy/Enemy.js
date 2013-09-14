//class Enemy, utilisé pour chaque enemy
S.Enemy = function() {
    
    var textures = S.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    PIXI.MovieClip.call( this, textures );
    
    this.visible = false;
    this.SPEED = 1;
    this.animationSpeed = 0.2;
};

S.Enemy.constructor = S.Enemy;
// Enemy object extend PIXI Movieclip object
S.Enemy.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * override updateTransform method, called each frame
 */
S.Enemy.prototype.alloc = function() {
    this.visible = true;
    this.life = 100;
    this.alpha = 1;
    this.play();
};
S.Enemy.prototype.canRealloc = function() {
    this.stop();
    this.visible = false;
    this.parent.pool.add(this);
};
S.Enemy.prototype.updateTransform = function() {
    if(this.playing)  {
        this.position.x = this.position.x - this.SPEED;  
        
        if(this.position.x + this.width < 0) {
            this.canRealloc();
        }
    }
    PIXI.MovieClip.prototype.updateTransform.call( this );
};

S.Enemy = function() {
    
    var textures = S.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    PIXI.MovieClip.call( this, textures );
    
    //this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    this.hitArea = new S.Rectangle(this.position.x, this.position.y, this.width, this.height);
    this.SPEED = 1;
    this.animationSpeed = 0.2;
    this.startLife = 100;
    this.life = 100;
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
            //this.dispatchEvent('LOOSE_A_LIFE');
            this.canRealloc();
        }
        
        //we update the hitArea
        this.hitArea.x = this.position.x;
        this.hitArea.y = this.position.y;
    }
    PIXI.MovieClip.prototype.updateTransform.call( this );
};

S.Enemy.prototype.touched = function(bullet) {
    this.life = this.life - (this.startLife* bullet.damage);
    console.log('TOUCHED '+this.life);
    this.alpha = this.life / 100;
    if(this.life  <= 0) {
        this.canRealloc();
    }
    
};
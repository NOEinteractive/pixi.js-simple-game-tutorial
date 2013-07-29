
S.Ship = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = 200;
    this.anchor.x = this.anchor.y = 0.5;
    
    // moving vars
    this.speedX = this.speedY = 0;
    this.ACCELERATION = 0.4;
    this.MAX_SPEED = 6;
    this.MIN_X = this.width / 2;
    this.MIN_Y = this.height / 2;
    this.MAX_X = S.Config.width - this.width / 2;
    this.MAX_Y = S.Config.height - this.height / 2;
    
    this.animationSpeed = 0.2;
    this.play();
}

S.Ship.constructor = S.Ship;
// Ship object extend PIXI Sprite object
S.Ship.prototype = Object.create( PIXI.MovieClip.prototype );

/**
 * override updateTransform method, called each frame
 */
S.Ship.prototype.updateTransform = function() {
    
    if(S.Controls.pressed(S.Controls.UP)) {
        this.speedY -= this.ACCELERATION;
    } else if(S.Controls.pressed(S.Controls.DOWN)) {
        this.speedY += this.ACCELERATION;
    } else {
        this.speedY /= 1.3;
    }
    this.speedY = S.Utils.boundary(this.speedY, -this.MAX_SPEED, this.MAX_SPEED);
    this.position.y += this.speedY;
    this.position.y = S.Utils.boundary(this.position.y, this.MIN_Y, this.MAX_Y);
    
    if(S.Controls.pressed(S.Controls.LEFT)) {
        this.speedX -= this.ACCELERATION;
    } else if(S.Controls.pressed(S.Controls.RIGHT)) {
        this.speedX += this.ACCELERATION;
    } else {
        this.speedX /= 1.3;
    }
    this.speedX = S.Utils.boundary(this.speedX, -this.MAX_SPEED, this.MAX_SPEED);
    this.position.x += this.speedX;
    this.position.x = S.Utils.boundary(this.position.x, this.MIN_X, this.MAX_X);
    
    PIXI.MovieClip.prototype.updateTransform.call( this );
}
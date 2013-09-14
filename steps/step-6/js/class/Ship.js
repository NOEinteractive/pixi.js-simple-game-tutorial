//our first class, the Ship!
S.Ship = function() {
    
    var textures = S.SpriteSheetTextures.getArray('f', '.png', 4);
    
    //call the parent (PIXI.Movieclip) constructor
    PIXI.MovieClip.call( this, textures );
    
    this.position.x = 100;
    this.position.y = S.Config.height / 2;//center verticaly our ship
    
    // moving vars
    this.speedX = this.speedY = 0;
    this.ACCELERATION = 0.4;
    this.MAX_SPEED = 6;
    this.MIN_X = 0;
    this.MIN_Y = 0;
    this.MAX_X = S.Config.width - this.width;
    this.MAX_Y = S.Config.height - this.height;
    
    // life
    this.life = 4;
    
    this.animationSpeed = 0.2;
    this.hitArea = new S.Rectangle(this.position.x, this.position.y, this.width, this.height);
    
    //playing the animation
    this.play();
}

S.Ship.constructor = S.Ship;
// Ship object extend PIXI Movieclip object
S.Ship.prototype = Object.create( PIXI.MovieClip.prototype );


/**
 * ship hit an ennemy, decrease life
 */
S.Ship.prototype.hitEnnemy = function() {
    this.life--;
    this.alpha = this.life / 4;
    if(this.life === 0) this.die();
}

/**
 * life is over
 */
S.Ship.prototype.die = function() {
    this.visible = false;
    S.Controls.stop();
}

/**
 * override updateTransform method, called each frame
 */
S.Ship.prototype.updateTransform = function() {
    
    // touch controls
    if(S.Controls.touchDevice && S.Controls.touchX != null && S.Controls.touchY != null) {
        this.position.x = S.Controls.touchX + 20;
        this.position.y = S.Controls.touchY - this.height / 2;
    } else { // keyboard controls
        if(S.Controls.pressed(S.Controls.UP)) {
            this.speedY -= this.ACCELERATION;
        } else if(S.Controls.pressed(S.Controls.DOWN)) {
            this.speedY += this.ACCELERATION;
        } else {
            this.speedY /= 1.3;
        }

        if(S.Controls.pressed(S.Controls.LEFT)) {
            this.speedX -= this.ACCELERATION;
        } else if(S.Controls.pressed(S.Controls.RIGHT)) {
            this.speedX += this.ACCELERATION;
        } else {
            this.speedX /= 1.3;
        }
        
        // update speed and position
        this.speedY = S.Utils.boundary(this.speedY, -this.MAX_SPEED, this.MAX_SPEED);
        this.position.y += this.speedY;
        this.speedX = S.Utils.boundary(this.speedX, -this.MAX_SPEED, this.MAX_SPEED);
        this.position.x += this.speedX;
    }
    
    // prevent ship to leave game screen
    this.position.y = S.Utils.boundary(this.position.y, this.MIN_Y, this.MAX_Y);
    this.position.x = S.Utils.boundary(this.position.x, this.MIN_X, this.MAX_X);
    
    //we update the hitArea
    this.hitArea.x = this.position.x;
    this.hitArea.y = this.position.y;
    
    PIXI.MovieClip.prototype.updateTransform.call( this ); 
}
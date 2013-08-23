
S.Bullet = function() {
    
    PIXI.Sprite.call( this, PIXI.Texture.fromImage('img/bullet.png') );
    
    //this.anchor.x = this.anchor.y = 0.5;
    
    this.visible = false;
    this.SPEED = 8;
    
    this.damage = 0.5;
}

S.Bullet.constructor = S.Bullet;
// Bullet object extend PIXI Sprite object
S.Bullet.prototype = Object.create( PIXI.Sprite.prototype );

S.Bullet.prototype.alloc = function() {
    this.visible = true;
};
S.Bullet.prototype.canRealloc = function() {
    this.visible = false;
    this.parent.pool.add(this);
};
S.Bullet.prototype.updateTransform = function() {
    if(this.visible)  {
        this.position.x += this.SPEED;
        
        if(this.position.x > S.Config.width) {
            this.canRealloc();
        }
    }
    PIXI.Sprite.prototype.updateTransform.call( this );
};
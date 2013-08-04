S.BulletsManager = function(ship) {
    PIXI.DisplayObjectContainer.call( this );
    
    var totalBullets = 20;
    this.bullets = [];
    var tmpBullets = [];
    while(totalBullets--) {
        var b = new S.Bullet();
        this.addChild(b);
        this.bullets.push(b);
        tmpBullets.push(b);
    }
    this.pool = new S.Pool(tmpBullets);
    
    
    this.SHOOT_DELAY = 10;
    this.shootTimer = 0;
    this.ship = ship;
}

S.BulletsManager.constructor = S.BulletsManager;
S.BulletsManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


S.BulletsManager.prototype.updateTransform = function() {
    this.shootTimer--;
    
    if(this.shootTimer <= 0 && (S.Controls.pressed(S.Controls.S) || S.Controls.touchDevice) && this.ship.visible) {
        this.shoot();
    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

S.BulletsManager.prototype.shoot = function() {
    var scope = this;
    
    this.pool.act(function(b, pool) {
        b.alloc();
        b.position.x = scope.ship.position.x + scope.ship.width - b.SPEED;
        b.position.y = scope.ship.position.y + scope.ship.height / 2;
    });
    
    this.shootTimer = this.SHOOT_DELAY;
};
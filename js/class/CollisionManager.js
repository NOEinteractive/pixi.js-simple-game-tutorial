S.CollisionManager = function(ship, enemiesManager, bullets) {
    PIXI.EventTarget.call( this );
    
    this.ship = ship;
    this.enemiesManager = enemiesManager;
    this.bullets = bullets;
};
 
S.CollisionManager.constructor = S.CollisionManager;

S.CollisionManager.prototype.checkCollision= function() {
    var i = this.enemiesManager.enemies.length;
    while(i--) {
        if(this.enemiesManager.enemies[i].visible) {
            if(this.enemiesManager.enemies[i].hitArea.intersectWith(this.ship.hitArea)) {
                this.dispatchEvent('TOUCH_ENEMY');
            }
        }
    }
};
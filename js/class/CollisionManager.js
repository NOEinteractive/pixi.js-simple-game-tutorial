S.CollisionManager = function(ship, enemiesManager, bulletsManager) {
    PIXI.EventTarget.call( this );
    
    this.ship = ship;
    this.enemiesManager = enemiesManager;
    this.bulletsManager = bulletsManager;
};
 
S.CollisionManager.constructor = S.CollisionManager;

S.CollisionManager.prototype.checkCollision= function() {
    var eM =this.enemiesManager.enemies,
        bM =this.bulletsManager.bullets,
        i = eM.length;
    while(i--) {
        if(eM[i].visible) {
            var a = bM.length;
            while(a--) { //test with bullet
                if(bM[a].visible) {
                    if(eM[i].hitArea.contain(bM[a].position)) {
                        eM[i].touched(bM[a]);
                        bM[a].canRealloc();
                        this.dispatchEvent('ENEMY_TOUCHED');
                        //console.log('ENEMY TOUCHED');
                    }
                }
            }
            if(this.ship.visible && eM[i].hitArea.intersectWith(this.ship.hitArea)) {
                eM[i].canRealloc();
                this.ship.hitEnnemy();
                this.dispatchEvent('TOUCH_ENEMY');
            }
            
            
        }
    }
};
S.EnemiesManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    var scope = this;
    //object pooling test
    //we create 3 enemies in pool
    var totalEnemies = 20;
    this.enemies = [];
    var tmpEnemies = [];
    while(totalEnemies--) {
        var e = new S.Enemy();
        e.position.x = S.Config.width + 200;
        this.addChild(e);
        //we use two different variable
        //this.enemies will keep all the enemis
        //tmpEnemies is only used to create the pool
        //if we use the same variable, the pool only get a reference to this.enemies and so modifie our array
        this.enemies.push(e);
        tmpEnemies.push(e);
    }
    this.pool = new S.Pool(tmpEnemies);
    
    
    this.MIN_BETWEEN_WAVE = 10000;
    this.MAX_BETWEEN_WAVE = 14000;
    this.COEFF_DISPERSSION_X = 0.45;
    
    this.timerWave = null;
    
    this.play();
    
}

S.EnemiesManager.constructor = S.Background;
S.EnemiesManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

S.EnemiesManager.prototype.stop = function() {

    var i = this.enemies.length;
    while(i--) {
        this.enemies[i].stop();
    }
    if(this.timerWave) {
        clearTimeout(this.timerWave);
        this.timerWave = null;
    }
}
S.EnemiesManager.prototype.play = function() {
    //launch first wave
    var scope = this;
    //if we resume the game, we restart the enemy previously playing
    var i = this.enemies.length;
    while(i--) {
        this.enemies[i].visible && this.enemies[i].play();
    }
    //we launch a wave
    this.timerWave = setTimeout(function() {
        scope.newWave.call(scope);
    }, S.Utils.randomBetween(2000, 4000));
}
S.EnemiesManager.prototype.newWave = function() {
    var scope = this;
    
    var nbEnemies = S.Utils.randomBetween(2, 8);
    console.log('WAVE');
    while(nbEnemies--) {
        this.pool.act(function(e, pool) {
            e.alloc();
            e.position.x = S.Utils.randomBetween(S.Config.width, S.Config.width*scope.COEFF_DISPERSSION_X + S.Config.width);
            e.position.y = S.Utils.randomBetween(10, S.Config.height - 10);
        });
    }
    
    this.timerWave = setTimeout(function() {
        scope.newWave.call(scope);
    }, S.Utils.randomBetween(this.MIN_BETWEEN_WAVE, this.MAX_BETWEEN_WAVE));
};
S.EnemiesManager = function() {
    PIXI.DisplayObjectContainer.call( this );
    
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
    
    
    this.MIN_BETWEEN_WAVE = 440;
    this.MAX_BETWEEN_WAVE = 540;
    this.COEFF_DISPERSSION_X = 0.5;
    
    this.nbFrameBeforeNextWave = S.Utils.randomBetween(30, 60);
}

S.EnemiesManager.constructor = S.EnemiesManager;
S.EnemiesManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


S.EnemiesManager.prototype.updateTransform = function() {
    this.nbFrameBeforeNextWave--;
    
    if(this.nbFrameBeforeNextWave === 0) {
        this.newWave();
    }
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}

S.EnemiesManager.prototype.newWave = function() {
    var scope = this;
    
    var nbEnemies = S.Utils.randomBetween(5, 15);
    console.log('WAVE');
    while(nbEnemies--) {
        this.pool.act(function(e, pool) {
            e.alloc();
            e.position.x = S.Utils.randomBetween(S.Config.width, S.Config.width*scope.COEFF_DISPERSSION_X + S.Config.width);
            e.position.y = S.Utils.randomBetween(10, S.Config.height - 30);
        });
    }
    
    this.nbFrameBeforeNextWave = S.Utils.randomBetween(this.MIN_BETWEEN_WAVE, this.MAX_BETWEEN_WAVE);
};
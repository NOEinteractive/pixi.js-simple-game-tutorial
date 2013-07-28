S.Loader = function(textures) {
	PIXI.EventTarget.call( this );
    
    this.idxLoaded = 0;
    
    if(textures && textures.length) {
        this.textures = textures;
        this.load();
    }
}
 
S.Loader.constructor = S.Loader;

S.Loader.prototype.load = function() {
    var scope = this,
    t = PIXI.Texture.fromImage(scope.textures[scope.idxLoaded]);
    t.addEventListener('update', function() {scope.onTextureLoad.call(scope); });
}

S.Loader.prototype.onTextureLoad = function() {
    this.idxLoaded++;
    if(this.idxLoaded === this.textures.length) {
        this.dispatchEvent({type : 'complete', content : this});
    } else {
        this.dispatchEvent({type : 'progress', content : this});
        this.load();
    }
}
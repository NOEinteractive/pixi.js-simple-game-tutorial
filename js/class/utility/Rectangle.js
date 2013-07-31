S.Rectangle = function(x, y, width, height) {
    PIXI.Rectangle.call(this,x, y, width, height);
};

S.Rectangle.constructor = S.Rectangle;
S.Rectangle.prototype = Object.create(PIXI.Rectangle.prototype);

S.Rectangle.prototype.intersectWith = function(rect) {
    if((
            (this.x + this.width > rect.x && this.x < rect.x + rect.width ) 
            ||  (this.x > rect.x && this.x < rect.x + rect.width ) 
        ) && (
            (this.y + this.height > rect.y && this.y < rect.y + rect.height ) 
            ||  (this.y > rect.y && this.y < rect.y + rect.height )         
        )) {
            return true;
        }
    
    return false;
};
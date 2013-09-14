/**
 * the S.Background class allow you to create repetitive background, with a bunch of image,
 * it will create only the images needed for the stage width, and realloc then when they disappear
 * 
 * @var availlableImages array of textures ID those can be used in this background (required)
 * @var speed int : speed for background animation (default : 1 pixel per frame)
 */
S.Background = function(availlableImages, speed) {
    
    PIXI.DisplayObjectContainer.call( this );
    
    // properties
    this.availlableImages = availlableImages;
    this.speed = speed || 1;
    this.toRealloc = [];
    
    if(!this.availlableImages || !this.availlableImages.length) {
        throw 'You have to specifie "availlableImages" params for S.Background()';
        return;
    }
    
    //create the textures needed
    var totalWidth = 0,
    idxImages = 0,
    nbAvaillableImages = this.availlableImages.length,
    tmpBkg = null;
    
    while(totalWidth < S.Config.width || this.children.length <= 1) {
        if(this.children.length) {
            totalWidth+= this.children[this.children.length-1].width;
        }
        tmpBkg = new PIXI.Sprite(PIXI.Texture.fromImage(this.availlableImages[idxImages]));
        
        this.addChild(tmpBkg);
        tmpBkg.position.x = totalWidth;
                
        idxImages++; 
        if(idxImages >= nbAvaillableImages) {
            idxImages = 0;
        }
    }
    
}

S.Background.constructor = S.Background;
//S.Background extend PIXI.DisplayObjectContainer
S.Background.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

/**
 * called at each frame
 */
S.Background.prototype.updateTransform = function() {
    var i = this.children.length,
    child = null,
    maxX = Number.MIN_VALUE;
    
    this.toRealloc = [];
    
    //move all the children
    //and look if one (or more) is hide and so can be reallocated
    while(i--) {
        child = this.getChildAt(i);
        child.position.x -= this.speed;
        if(child.position.x + child.width <= 0) {
            this.toRealloc.push(child);
        } else {
            //we need the biggest X position to reallocate items
            maxX = Math.max(maxX, child.position.x + child.width);
        }
    }
    //if children(s) can be reallocated, it will reallocate them at the right X position
    if(this.toRealloc.length) {
        i = this.toRealloc.length;
        while(i--) {
            this.toRealloc[i].position.x = maxX;
            maxX = this.toRealloc[i].position.x + this.toRealloc[i].width;
        }
    }
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
}
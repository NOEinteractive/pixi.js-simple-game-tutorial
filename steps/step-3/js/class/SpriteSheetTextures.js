
S.SpriteSheetTextures = {
    
    /**
     * get array of textures from a spritesheet
     * @param name name of file
     * @param ext extension of file
     * @param count number of frames to get
     * @param start number of first frame to get
     */
    getArray: function(name, ext, count, start) {
        start = start || 1;
        
        var textures = [],
            i = count,
            j = start;
        
        while(i--) {
            textures.push(PIXI.Texture.fromFrame(name + j + ext));
            j++;
        }
        
        return textures;
    }
    
}

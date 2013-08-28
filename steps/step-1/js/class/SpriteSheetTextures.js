S.SpriteSheetTextures = {
    
    /**
     * retourne le tableau de textures d'une spritesheet pour utiliser dans un objet movieclip
     * @param name nom du fichier contenant la spritesheet
     * @param ext extension du fichier contenant la spritesheet
     * @param count nombre de frames à récupérer
     * @param start numéro de la première frame à récupérer (1 par défaut)
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

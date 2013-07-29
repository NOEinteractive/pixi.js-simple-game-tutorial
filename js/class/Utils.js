
S.Utils = {
    
    /**
     * limit a value between min and max
     * @param value
     * @param min
     * @param max
     */
    boundary: function(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }
    
}

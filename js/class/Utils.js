
S.Utils = {
    
    /**
     * limit a value between min and max
     * @param value
     * @param min
     * @param max
     */
    boundary: function(value, min, max) {
        return value < min ? min : value > max ? max : value;
    },
    randomBetween : function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}


/**
 * handle keyboard keys pressed and touch inputs
 */

S.Controls = {
    
    // define key codes we need
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    
    keysPressed: [],
    
    /**
     * init listeners
     */
    start: function() {
        var scope = this;
        document.addEventListener('keydown', function(e) {
            scope.keyDown(e);
        });
        document.addEventListener('keyup', function(e) {
            scope.keyUp(e);
        });
    },
    
    keyDown: function(e) {
        this.keysPressed[e.keyCode] = true;
    },
    
    keyUp: function(e) {
        this.keysPressed[e.keyCode] = false;
    },
    
    /**
     * check if a key is currently pressed
     * @var int keyCode
     */
    pressed: function(keyCode) {
        return this.keysPressed[keyCode];
    }
    
}

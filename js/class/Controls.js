
/**
 * handle keyboard keys pressed and touch inputs
 */

S.Controls = {
    
    // define key codes we need
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    S: 83,
    
    // check if device have touch
    touchDevice: !!('ontouchstart' in window) || !!('onmsgesturechange' in window),
    
    touchX: null,
    touchY: null,
    
    keysPressed: [],
    
    /**
     * init listeners
     */
    start: function() {
        var scope = this;
        
        if(this.touchDevice) {
            document.addEventListener('touchstart', function(e) {
                scope.touch(e);
                e.preventDefault();
                return false;
            });
            document.addEventListener('touchmove', function(e) {
                scope.touch(e);
                e.preventDefault();
                return false;
            });
        } else {
            document.addEventListener('keydown', function(e) {
                scope.keyDown(e);
            });
            document.addEventListener('keyup', function(e) {
                scope.keyUp(e);
            });
        }
        
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
    },
    
    /**
     * save touch position
     */
    touch: function(e) {
        this.touchX = e.touches[0].pageX;
        this.touchY = e.touches[0].pageY;
    }
    
}

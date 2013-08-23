
/**
 * handle keyboard keys pressed and touch inputs
 */
//cette class est une class static, qu'on ne va pas instancier
//elle n'a donc pas la meme structure que les autres
S.Controls = {
    
    // define key codes we need
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    
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
        
        //si on est sur un device touch, on écoute le touchmove
        if(this.touchDevice) {
            this.touchHandler = function(e) {
                scope.touch(e);
                e.preventDefault();
                return false;
            };
            document.addEventListener('touchstart', this.touchHandler);
            document.addEventListener('touchmove', this.touchHandler);
        } else {
            //sur un device non touch, on écoute le clavier
            this.keyDownHandler = function(e) {
                scope.keyDown(e);
            };
            document.addEventListener('keydown', this.keyDownHandler);
            
            this.keyUpHandler = function(e) {
                scope.keyUp(e);
            };
            document.addEventListener('keyup', this.keyUpHandler);
        }
        
    },
    //remove the event, when player loose for example
    stop: function() {
        
        if(this.touchDevice) {
            document.removeEventListener('touchstart', this.touchHandler);
            document.removeEventListener('touchmove', this.touchHandler);
            this.touchX = this.touchY = null;
        } else {
            document.removeEventListener('keydown', this.keyDownHandler);
            document.removeEventListener('keyup', this.keyUpHandler);
            this.keysPressed = [];
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


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
    
    leapMotionEnable : !!window.Leap,
    leapController : null,
    leapMotionConnected : false,
    leapX : 0,
    leapY : 0,
    /**
     * init listeners
     */
    start: function() {
        var scope = this;
        //if leap motion framework is available, we try to connect to a leap motion device
        if(this.leapMotionEnable) {
            this.leapController = new Leap.Controller();
            
            this.leapController.on('connect', function() {
                scope.leapMotionConnected = true;
                Leap.loop(function(frame){
                    var x, y, z = 0;
                    
                    //we only use the first finger we found
                    //for this test we tell that : 
                    //x vary between -300 & +300 (approximately) //in fact we make as if leap go from -100 to 300, more easy to use
                    //y vary between 40 & +400 (approximately)
                    if(frame.hands[0] && frame.hands[0].fingers[0]){
                        x = Math.max(frame.hands[0].fingers[0].tipPosition[0] + 100, 0)
                        scope.leapX = x * S.Config.width / 400;
                        y = Math.max(frame.hands[0].fingers[0].tipPosition[1] - 50, 0);
                        scope.leapY = S.Config.height - (y * S.Config.height / 250);
                    } else {
                        scope.leapY = S.Config.height/2 - 20;
                        scope.leapX = 40;
                    }
                });
        
            });

            this.leapController.connect();
            
        }
        
        if(this.touchDevice) {
            this.touchHandler = function(e) {
                scope.touch(e);
                e.preventDefault();
                return false;
            };
            document.addEventListener('touchstart', this.touchHandler);
            document.addEventListener('touchmove', this.touchHandler);
        } else {
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

/**
 * largely inspired (stolen) from @emehrkay's simple pool class
 * @url : https://github.com/emehrkay/Pool/blob/master/src/pool.js
 * 
 * this class will handle object pooling for list of object
 */
S.Pool = function(objects){
    this.queue = [];
    this.objects = objects;
};

S.Pool.prototype = {
    add : function(object){
        this.objects.push(object);
        return this.call();
    },
    call : function(){
        if(this.objects.length && this.queue.length){
            var fn = this.queue.shift(),
            obj = this.objects.shift();      
            fn(obj, this);
        }
    
        return this;
    },
    act : function(fn){
        this.queue.push(fn);
        return this.call();
    }
};

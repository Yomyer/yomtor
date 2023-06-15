/**
 * @name Control
 * @class
 * @extends Item
 */

var Control = Item.extend(
    /** @lends Control# */ {
        _class: "Control",
        _scale: null,
        _control: true,
        _owner: null,
        _offset: null,

        /**
         * @name Control#initialize
         * 
         * @param {String} name
         * @param {(event: DrawControlEvent) => void} [draw]
         */
        
        initialize: function Control(name, draw) {
            this._initialize({ insert: false, guide: true });

            this._project = paper.project;
 
            this._owner = this._project.selector;
            this._children = [];
            this._namedChildren = {};

            this._name = name;
            this.onDraw = draw;

            this._owner._addControl(name, this);
        },

        setActived: function () {},


        /**
         * @bean
         * @type Number
         */
        getZoom: function(){
            return this._project._view.getZoom();
        },

        addChild: function addChild(item) {
            this._children[item.name] = item;
            return addChild.base.call(this, item);
        },

        /**
         *
         * @name Control#getChild
         * @param {String} name
         * @type {Item}
         */
        getChild: function(name) {
            return this._children[name]
        },

        _getOwner: function(){
            return this._owner
        },
        
        
        _hitTest: function _hitTest(point, options) {
            // console.log('a')
            
            if (this.isSmallZoom()) {
                return null;
            }

            var zoom = this.getZoom();
            var hit;

            if (
                this._locked ||
                !this._visible ||
                !options.selector
            ) {
                return null;
            }

            options.tolerance = 5 / zoom;

            var children = this._children;
            if (children) {
                var hit = null;
                for (var i = children.length - 1; i >= 0; i--) {
                    var item = children[i];

                    if (hit = item._hitTest(point, options)) {
                        return hit;
                    }
                }
                return null
            }
        },

    
        isSmallZoom: function () {
            if(!this._project._activeItems.length){
                return false;
            }
            if (
                (this._project._selector.width + this._project._selector.height) * this.getZoom() <
                20
            ) {
                return true;
            }
        },

        emit: function emit(type, event) {
            var handlers =
                (this._project._selector._callbacks &&
                    this._project._selector._callbacks[type]) ||
                [];
 
            if(hit = this._project.hitTest(event.point, {
                tolerance: 0,
                fill: true,
                stroke: true
            })){
                event.target = hit.item
            }

            handlers = (this._callbacks && this._callbacks[type]) || handlers;

            if (!handlers.length) return false;
            var args = Base.slice(arguments, 1),
                setTarget = event && event.target && !event.currentTarget;

            handlers = handlers.slice();
            if (setTarget) event.currentTarget = this;
            for (var i = 0, l = handlers.length; i < l; i++) {
                if (handlers[i].apply(this, args) == false) {
                    if (event && event.stop) event.stop();
                    break;
                }
            }
            if (setTarget) delete event.currentTarget;
            return true;
        },

        responds: function responds(type) {
            return !!!!(
                (this._callbacks && this._callbacks[type]) ||
                (this._project._selector._callbacks &&
                    this._project._selector._callbacks[type])
            );
        },

        _drawFix: function(item){
            var zoom = this.getZoom(),
                children = item._children;
            
            if(children){
                for (var i = 0, l = children.length; i < l; i++) {
                   this._drawFix(children[i])
                }
            }else{
                item.strokeWidth = item.strokeWidth / zoom
                item.dashArray = item.dashArray.map(function(num){
                   return num / zoom
                });

                item.shadowBlur = item.shadowBlur / zoom
                item.shadowOffset = new Matrix()
                    .rotate(-item.angle)
                    ._transformPoint(item.shadowOffset).divide(zoom);
               
            }
        },

        _reverseDrawFix: function(item){
            var zoom = this.getZoom(),
                children = item._children;
            
            if(children){
                for (var i = 0, l = children.length; i < l; i++) {
                   this._reverseDrawFix(children[i])
                }
            }else{
                item.strokeWidth = item.strokeWidth * zoom
                item.dashArray = item.dashArray.map(function(num){
                   return num * zoom
                });

                item.shadowBlur = item.shadowBlur * zoom
                item.shadowOffset = new Matrix()
                    .rotate(-item.angle)
                    ._transformPoint(item.shadowOffset).multiply(zoom);
               
            }
        },

        /**
         *
         * @name Control#onDraw
         * The function receives a {@link DrawControlEvent} object which contains
         * information about the draw event.
         * @property
         * @type ?Function
         *
         */

        draw: function (ctx, param) {
            var owner = this._owner;
            
            if (this.isSmallZoom() || !this.visible) {
                return;
            }

            if(owner.onControlDraw){
                owner.onControlDraw(new DrawControlEvent(this, owner))
            }else if(this.onDraw){
                this.onDraw(new DrawControlEvent(this, owner))
            }

            var children = this._children;

            if(children){
                this._drawFix(this);

                for (var x = 0; x < children.length; x++) {
                    children[x].draw(ctx, param);
                }

                this._reverseDrawFix(this);
            }
            
        },
    }
);

/**
 * @name Control
 * @class
 * @extends Item
 */

var Control = Item.extend(
    /** @lends Control# */ {
        _class: "Control",
        _item: null,
        _scale: null,
        _control: true,
        _owner: null,
        _offset: null,


        /**
         * @name Control#initialize
         * 
         * @param {String} name
         * @param {Item} item
         * @param {(event: DrawControlEvent) => void} [draw]
         * @param {Boolean} [scale]
         */
        
        initialize: function Control(name, item, draw, scale = false) {
            this._project = paper.project;
 
            this._owner = this._project.selector;

            item.remove();
            this._item = item;
            this._item._control = this;
            this._style = this._item._style
            this._scale = scale;
            this._name = name;
            this.onDraw = draw;

            this._owner._addControl(name, this);
        },

        setActived: function () {},

        /**
         * @bean
         * @type Item
         */
        getItem: function () {
            return this._item;
        },

        setItem: function (item) {
            this._item = item;
        },

        /**
         * @bean
         * @type Point
         */
        getPosition: function () {
            return this._item.getPosition();
        },

        setPosition: function (/* point */) {
           this._item.setPosition(Point.read(arguments));
        },

        /**
         * @bean
         * @type Point
         */
        getOffset: function(){
            return this._offset
        },

        setOffset: function(/* point */){
            var matrix = new Matrix().rotate(this._item.getRotation());
            this._offset = matrix._transformPoint(Point.read(arguments).divide(this.getZoom()));
            this._item.setPosition(this._item.getPosition().add(this._offset));
            
        },

        /**
         * @bean
         * @type Size
         */
         getSize: function(){
            return this._item.getSize();
        },

        setSize: function(/* size */){
            this._item.setSize(Size.read(arguments));
        },

        /**
         * @bean
         * @type Boolean
         */
        getVisible: function(){
            return this._item.getVisible();
        },

        setVisible: function(visible){
            this._item.setVisible(visible);
        },

        getRotation: function () {
            return this._item.getRotation();
        },

        setRotation: function (rotation) {
            this._item.setRotation(rotation);
        },

        getBounds: function () {
            return this._item.getBounds();
        },

        setBounds: function (/* rect */) {
            this._item.setBounds(arguments);
        },

        /**
         * @name Control#onDraw
         * @property
         * @type ?(event: DrawControlEvent) => void
         *
         */

        getZoom: function(){
            return this._project._view.getZoom();
        },

        _remove: function _remove(notifySelf, notifyParent) {
            if(this._item){
                this._item.remove();
            }
            return _remove.base.call(this, notifySelf, notifyParent);
        },

        _getOwner: function(){
            return this._owner
        },
        
        _hitTest: function (point, options) {
            if (this.isSmallZoom()) {
                return null;
            }

            var zoom = this.getZoom();
            var hit;

            if (
                this._item._locked ||
                !this._item._visible ||
                !options.selector
            ) {
                return null;
            }

            if(this._scale){
                this._item.transform(
                    new Matrix().scale(1 / zoom, this.getPosition()),
                    false,
                    false,
                    true
                );
            }

            options.tolerance = 5 / zoom;

            if (this._item._hitTest(point, options)) {
                hit = new HitResult("fill", this);
                var match = options.match;

                if (match && !match(hit)) {
                    hit = null;
                }

                if (hit && options.all) {
                    options.all.push(hit);
                }
            }

            if(this._scale){
                this._item.transform(
                    new Matrix().scale(zoom, this.getPosition()),
                    false,
                    false,
                    true
                );
            }

            return hit;
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

        _strokeZoomFix: function(item){
            var zoom = this.getZoom();
            
            if(item instanceof Group){
                var children = item._children;

                for (var i = 0, l = children.length; i < l; i++) {
                   this._strokeZoomFix(children[i])
                }
            }else{
                item.strokeWidth = item.strokeWidth / zoom
                item.dashArray = item.dashArray.map(function(num){
                   return num / zoom
                });
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
            if (this.isSmallZoom()) {
                return;
            }

            var owner = this._owner;
            var zoom = this.getZoom();
            var shadowOffset = null;
            
            if(owner.onControlDraw){
                owner.onControlDraw(new DrawControlEvent(this, owner))
            }else if(this.onDraw){
                this.onDraw(new DrawControlEvent(this, owner))
            }else{
                this.setRotation(owner.inheritedAngle);
                this.setPosition(owner.topLeft);
            }

            if(this._scale){
                this._item.transform(
                    new Matrix().scale(1 / zoom, this.getPosition()),
                    false,
                    false,
                    true
                );
            }
           
            if (this._item.shadowOffset) {
                shadowOffset = this._item.shadowOffset.clone();
                this._item.shadowOffset = new Matrix()
                    .rotate(-this.item.getRotation())
                    ._transformPoint(shadowOffset);
            }

            if(!this._scale){
                this._strokeZoomFix(this._item);
            }

            this._item.draw(ctx, param);
              
           
            if(this._scale){
                this._item.transform(
                    new Matrix().scale(zoom, this.getPosition()),
                    false,
                    false,
                    true
                );
            }
            

            if (shadowOffset) {
                this._item.shadowOffset = shadowOffset;
            }
        },
    }
);

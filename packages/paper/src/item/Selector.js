/**
 * @name Selector
 * @class
 * @extends Item
 */
var Selector = Item.extend(
    /** @lends Selector# */ {
        _class: "Selector",
        _applyChildrenStyle: false,
        _corners: [
            "topLeft",
            "topCenter",
            "topRight",
            "rightCenter",
            "bottomRight",
            "bottomCenter",
            "bottomLeft",
            "leftCenter",
        ],
        _project: null,
        _angle: 0,
        _width: null,
        _height: null,
        _size: null,
        _center: null,
        _topCenter: null,
        _rightCenter: null,
        _bottomCenter: null,
        _leftCenter: null,
        _topLeft: null,
        _topRight: null,
        _bottomRight: null,
        _bottomLeft: null,
        _children: [],
        _helpers: [],
        _cornerItems: {},
        _activeItemsInfo: null,
        _cache: null,
        _info: null,
        _defaultStyles: {
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 2,
            shadowOffset: 1,
        },

        _oposite: {
            topLeft: "bottomRight",
            topCenter: "bottomCenter",
            topRight: "bottomLeft",
            leftCenter: "rightCenter",
            rightCenter: "leftCenter",
            bottomLeft: "topRight",
            bottomCenter: "topCenter",
            bottomRight: "topLeft",
            center: "center",
        },

        initialize: function Selector(arg) {
            var that = this;

            this._initialize(arg);
            this._style.set(Object.assign({}, this._defaultStyles, {
                strokeColor: "rgba(0, 142, 252, 1)",
                fillColor: "white",
                strokeWidth: 0.2,
            }));

            this._children = []
            this._namedChildren = {}
        },

        _changed: function (flags, item) {
            if (flags & /*#=*/ ChangeFlag.CONTROL) {
                this._activeItemsInfo = null;
            }

            if (flags & /*#=*/ ChangeFlag.ACTIVE) {
                this._cornerItems = {};
            }

            if (
                item &&
                (flags & /*#=*/ (ChangeFlag.GEOMETRY | ChangeFlag.ACTIVE)) &&
                !(item instanceof Layer) &&
                !item.guide &&
                !item._control &&
                item.actived
            ) {
                this._activeItemsInfo = null;
            }
        },

        /**
         * @bean
         * @type Array
         */
        getSelector: function () {
            return this._children;
        },

        /**
         * @bean
         * @type Number
         */
        getX: function () {
            return this._descomposeActiveItemsInfo("topLeft", "x") || 0;
        },

        /**
         * @bean
         * @type Number
         */
        getY: function () {
            return this._descomposeActiveItemsInfo("topLeft", "y") || 0;
        },

        /**
         * @bean
         * @type Number
         */
        getAngle: function () {
            return this._descomposeActiveItemsInfo("angle") || 0;
        },

        /**
         * @bean
         * @type Number
         */
        getInheritedAngle: function(){
            return this._descomposeActiveItemsInfo("inheritedAngle") || 0;
        },

        /**
         * @bean
         * @type Number
         */
        getWidth: function () {
            return this._descomposeActiveItemsInfo("width") || 0;
        },

        /**
         * @function
         * @param {number} width 
         * @param {Point} [center] 
         * @param {boolean} [preserve] 
         * @bean
         * @type Number
         */
        setWidth: function(width, center, preserve) {
            this.setSize([width, null], center, preserve);
        },



        /**
         * @bean
         * @type Number
         */
        getHeight: function () {
            return this._descomposeActiveItemsInfo("height") || 0;
        },

        /**
         * @function
         * @param {number} heigth 
         * @param {Point} [center] 
         * @param {boolean} [preserve] 
         * @bean
         * @type Number
         */
        setHeight: function(height, center, preserve) {
            this.setSize([null, height], center, preserve)
        },

                
        /**

         * @bean
         * @type Size
         */
        getSize: function(){
            return new Size(this.width, this.height)
        },

        /**
         * @function
         * @param {Size} Size 
         * @param {Point} [center] 
         * @param {boolean} [preserve] 
         * @bean
         * @type Size
         */
        setSize: function(/* size, center, preserve */){
            var size = Size.read(arguments);
            var center = Point.read(arguments);
            var preserve = Base.read(arguments);
            
            this._checkHelpers();

            var items = this._project._activeItems;
            var width = this._cache.width;
            var height = this._cache.height;
            var factor = new Point(1, 1)
            var helpers = this._helpers;

            if(width === 0){
                width = 1;
            }
            if(height === 0){
                height = 1;
            }
 
            if (Math.abs(width) > 0.0000001) {
                factor.x = size.width / width;
            }
            if (Math.abs(height) > 0.0000001) {
                factor.y = size.height / height;
            }

            Base.each(items, function(item){
                var helper = helpers[item.uid].clone({insert: false, keep: true});
                item.set(Base.omit(helper, ['uid', 'actived', 'guide', 'parent']));
                
                var matrix = item.matrix.clone();
                matrix.scale(new Point(factor.x, factor.y), center);
                item.transformType = 'scale';
                item.constraintsPivot = center;
                item.transform(matrix, true);
                
                if(helpers[item.uid]._lastDirection){
                    if(!helpers[item.uid]._cacheFlipped){
                        helpers[item.uid]._cacheFlipped = Object.assign({}, helpers[item.uid].flipped);
                    }
    
                    if(factor.sign().x && factor.sign().x !== helpers[item.uid]._lastDirection.x ){
                        helpers[item.uid]._flip('x', (helpers[item.uid]._cacheFlipped.x === -1 ? factor.sign().x * -1 : factor.sign().x) === -1 ? -1 : 1);
                    }
                    if(factor.sign().y && factor.sign().y !== helpers[item.uid]._lastDirection.y ){
                        helpers[item.uid]._flip('y', (helpers[item.uid]._cacheFlipped.y === -1 ? factor.sign().y * -1 : factor.sign().y) === -1 ? -1 : 1);
                    }
                }

                helpers[item.uid]._lastDirection = factor.sign();
                
                helper.remove();
            });


            if(!preserve){
                this._clearHelpers();
            }
        },

        /**
         * @bean
         * @type Point
         */
        getCenter: function () {
            return this._descomposeActiveItemsInfo("center") || new Point(0, 0);
        },

        /**
         * @bean
         * @type Number
         */
        getTop: function () {
            return (
                this._descomposeActiveItemsInfo("topCenter").y || 0
            );
        },

        /**
         * @bean
         * @type Number
         */
        getBottom: function () {
            return (
                this._descomposeActiveItemsInfo("bottomCenter").y || 0
            );
        },

        /**
         * @bean
         * @type Number
         */
        getLeft: function () {
            return (
                this._descomposeActiveItemsInfo("leftCenter").x || 0
            );
        },

        /**
         * @bean
         * @type Number
         */
        getRight: function () {
            return (
                this._descomposeActiveItemsInfo("rightCenter").x || 0
            );
        },

        /**
         * @bean
         * @type Point
         */
        getTopLeft: function () {
            return (
                this._descomposeActiveItemsInfo("topLeft") || new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getTopCenter: function () {
            return (
                this._descomposeActiveItemsInfo("topCenter") || new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getTopRight: function () {
            return (
                this._descomposeActiveItemsInfo("topRight") || new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getRightCenter: function () {
            return (
                this._descomposeActiveItemsInfo("rightCenter") ||
                new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getBottomRight: function () {
            return (
                this._descomposeActiveItemsInfo("bottomRight") ||
                new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getBottomCenter: function () {
            return (
                this._descomposeActiveItemsInfo("bottomCenter") ||
                new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getBottomLeft: function () {
            return (
                this._descomposeActiveItemsInfo("bottomLeft") || new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getLeftCenter: function () {
            return (
                this._descomposeActiveItemsInfo("leftCenter") || new Point(0, 0)
            );
        },

        /**
         * @bean
         * @type Point
         */
        getPosition: function () {
            return this._descomposeActiveItemsInfo("center") || new Point(0, 0);
        },

        /**
         * @name Selector#getOposite
         * @param String
         * @values 'center', 'topCenter', 'rightCenter', 'bottomCenter', 'leftCenter', 'topLeft', 'topRight', 'bottomRight', 'bottomLeft'
         * @function
         * @return {Point}
         *
         */
        getOposite: function (oposite) {
            return this[this._oposite[oposite]];
        },

        /**
         * @name Selector#getControl
         * @param String
         * @function
         * @return {Control}
         *
         */
        getControl: function (name) {
            return this._children[name];
        },

        /**
         *
         * @param {String} label
         * @param {Point} point
         * @param {'topCenter' | 'rightCenter' | 'bottomCenter' | 'leftCenter' | 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'} [corner='topLeft']
         */
        setInfo: function (label, point, corner) {
            if (!this._info) {
                return (this._info = new SelectorInfo(
                    label,
                    point,
                    corner || "topLeft"
                ));
            }

            this._info.setCorner(corner || "topLeft");
            this._info.setContent(label);
            this._info.setPosition(point);
        },

        /**
         * @function
         */
        clearInfo: function () {
            this._info = null;
        },

        _checkHelpers: function(){
            if(!Base.equals(
                Base.simplify(this._project._activeItems, 'uid'),
                Base.simplify(this._helpers, 'uid'))
            ){
                this._cache = this._getActiveItemsInfo();

                this._helpers = this._project._activeItems.map(function(item){
                    return item.clone({keep: true, insert: false});
                });
                var helpers = this._helpers;
                this._helpers.forEach(function(item){
                    helpers[item.uid] = item;
                });
            }
        },

        _clearHelpers: function(){
            var helpers = this._helpers;
            this._project._activeItems.forEach(function(item){
                helpers[item.uid]._cacheFlipped = null;
                helpers[item.uid]._lastDirection = null;
            })
            this._cache = null;
            this._helpers = [];
        },

        _addControl: function (name, item) {
            item.remove();
            this._children.push(item);
            item._index = this._children.length - 1

            item._style.set(this._defaultStyles)

            if (name) {
                this._children[name || item.name] = item;
                item.name = name || item.name;
            }

            this._changed(/*#=*/ Change.CONTROL, item);
        },
        
        _descomposeActiveItemsInfo: function (name, sub) {
            if (this._getActiveItemsInfo()) {
                if (sub) {
                    return this._getActiveItemsInfo()[name][sub];
                }

                return this._getActiveItemsInfo()[name];
            }

            return null;
        },

        _getActiveItemsInfo: function () {
            // if (this._activeItemsInfo) return this._activeItemsInfo;

            var items = this._project._activeItems;
            if (items.length) {
                var info = items[0].activeInfo;

                if (items.length > 1) {
                    var cornerIntems = this._getCornerItems();

                    var rect = cornerIntems.left.bounds;
                    for (var x in cornerIntems) {
                        rect = rect.unite(cornerIntems[x].bounds);
                    }

                    info = {
                        angle: 0,
                        width: rect.width,
                        height: rect.height,
                        center: rect.center,
                        topCenter: rect.topCenter,
                        rightCenter: rect.rightCenter,
                        bottomCenter: rect.bottomCenter,
                        leftCenter: rect.leftCenter,
                        topLeft: rect.topLeft,
                        topRight: rect.topRight,
                        bottomRight: rect.bottomRight,
                        bottomLeft: rect.bottomLeft,
                    };
                }

                return (this._activeItemsInfo = info);
            }
            return (this._activeItemsInfo = null);
        },

        _getCornerItems: function () {
            if (this._cornerItems.left) return this._cornerItems;
            var items = this._project._activeItems;
            var left = this._cornerItems.left;
            var right = this._cornerItems.right;
            var top = this._cornerItems.top;
            var bottom = this._cornerItems.bottom;

            for (var x in items) {
                var bounds = items[x].bounds;

                if (!left || (left && left.bounds.left > bounds.left)) {
                    left = items[x];
                }
                if (!right || (right && right.bounds.right < bounds.right)) {
                    right = items[x];
                }
                if (!top || (top && top.bounds.top > bounds.top)) {
                    top = items[x];
                }
                if (
                    !bottom ||
                    (bottom && bottom.bounds.bottom < bounds.bottom)
                ) {
                    bottom = items[x];
                }
            }

            return (this._cornerItems = {
                left: left,
                right: right,
                top: top,
                bottom: bottom,
            });
        },

        /**
         * @name Selector#onControlDraw
         * @property
         * @type ?(event: DrawControlEvent) => void
         *
         */

        draw: function (ctx, matrix, pixelRatio) {
            var items = this._project._activeItems;
            var Selector = this._children;

            matrix = matrix.appended(this.getGlobalMatrix(true));

            ctx.lineWidth = 0.5;
            ctx.strokeStyle = this.strokeColor.toCanvasStyle(ctx, matrix);

            for (var x in items) {
                items[x]._drawActivation(ctx, matrix, items.length > 1);
            }

            var bounds = matrix._transformBounds(this);

            if (items.length > 1) {
                ctx.beginPath();
                ctx.moveTo(bounds.topLeft.x, bounds.topLeft.y);
                ctx.lineTo(bounds.topRight.x, bounds.topRight.y);
                ctx.lineTo(bounds.bottomRight.x, bounds.bottomRight.y);
                ctx.lineTo(bounds.bottomLeft.x, bounds.bottomLeft.y);
                ctx.closePath();
                ctx.stroke();
            }

            matrix.applyToContext(ctx);

            var param = new Base({
                offset: new Point(0, 0),
                pixelRatio: pixelRatio,
                viewMatrix: matrix.isIdentity() ? null : matrix,
                matrices: [new Matrix()],
                updateMatrix: true,
            });

            this._drawConstraints(ctx, param)

            for (var x = 0; x < Selector.length; x++) {
                this._children[x].draw(ctx, param);
            }
        },

        drawInfo: function (ctx, matrix, pixelRatio) {
            if (this._info) {
                this._info.draw(ctx, matrix, pixelRatio);
            }
        },

        _drawConstraints: function(ctx, param){
            var items = this._project._activeItems;
            if(items.length === 1){
                var item = items[0]

                if(!item.artboard) return;

                var constraints = item._constraints,
                    selector = this,
                    zoom = this._project.view.zoom,
                    horizontal = constraints.horizontal,
                    vertical = constraints.vertical,
                    bounds = item.artboard.bounds;

                var params = {
                    strokeColor: selector.strokeColor,
                    strokeWidth: 0.5 / zoom,
                    dashArray: [3/ zoom, 2/ zoom],
                    insert: false,
                };
    
                var paramsV = paramsH = Object.assign({}, params);
                
                if(bounds.left < selector.center.x ){
                    switch (vertical) {
                        default:
                            paramsV.from = [selector.center.x, bounds.top];
                            paramsV.to = [selector.center.x, selector.center.y];
                            break;
                    }
                }
    
    
                var vLine = new Path.Line(paramsV);
                var hLine = new Path.Line(paramsH);
    
    
                vLine.draw(ctx, param);
                hLine.draw(ctx, param);

            }
        }
    },
    {
        statics: {
            create: function (project) {
                return new Selector(project);
            },
        },
    }
);

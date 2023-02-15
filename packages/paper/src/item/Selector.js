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
        _cornerItems: {},
        _activeItemsInfo: null,
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
         * @bean
         * @type Number
         */
        setWidth: function(width, center) {
            var items = this._project._activeItems;
            var newWidth = this.width
            var matrix = new Matrix().rotate(this.inheritedAngle);
            var factor = 1
            
            if(newWidth === 0){
                newWidth = 1
            }

            if (Math.abs(width) > 0.0000001) {
                factor = width / newWidth
            }
            // console.log(factor)
            Base.each(items, function(item){
                var matrix = item.matrix.clone();
                matrix.scale([factor, 1], center)   
                item.matrix = matrix;
                
                if(factor < 0){
                    item.flipped.x = !item.flipped.x
                }
                /*
                var matrix = item.matrix.clone();
                matrix.scale([factor, 1], center)

                console.log(item.flipped.x, factor)
                if(item.flipped.x){
                    matrix.scale([-1, 1], center)
                }

                item.matrix.set(matrix)

               
                */
                
                /*var matrix = new Matrix()
                // matrix.rotate(item.inheritedAngle, item.center)
                matrix.scale(new Point(factor, 1), center)
                item.transform(matrix, center)
                */
            })
            
            

            // console.log(factor)
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
         * @bean
         * @type Number
         */
        setHeight: function(height, center) {
            var items = this._project._activeItems;

            // console.log(height)
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
         * @bean
         * @type Size
         */
        setSize: function(/* size, center */){
            var size = Size.read(arguments);
            var center = Point.read(arguments);
            
            this.setWidth(size.width, center)
            this.setHeight(size.width, center)
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

            ctx.lineWidth = 0.3;
            ctx.strokeStyle = this.strokeColor.toCanvasStyle(ctx, matrix);;

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

            for (var x = 0; x < Selector.length; x++) {
                this._children[x].draw(ctx, param);
            }
        },

        drawInfo: function (ctx, matrix, pixelRatio) {
            if (this._info) {
                this._info.draw(ctx, matrix, pixelRatio);
            }
        },
    },
    {
        statics: {
            create: function (project) {
                return new Selector(project);
            },
        },
    }
);

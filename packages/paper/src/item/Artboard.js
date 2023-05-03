/*
 * Paper.js - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 */

/**
 * @name Artboard
 *
 * @class The Layer item represents a layer in a Paper.js project.
 *
 * The layer which is currently active can be accessed through
 * {@link Project#activeArtboard}.
 * An array of all layers in a project can be accessed through
 * {@link Project#artboards}.
 *
 * @extends Group
 */
var Artboard = Group.extend(
    /** @lends Artboard# */ {
        _class: "Artboard",
        _applyChildrenStyle: false,
        _selectBounds: true,
        _selectChildren: false,
        _getBackgroundsInChildrens: true,
        _getItemsInChildrens: true,
        _serializeStyle: true,
        _background: null,
        _clipped: true,
        _name: 'Artboard',
        _transformCache: {},
        _serializeFields: {
            size: null,
            point: null,
            grid: null,
            children: [],
        },

        initialize: function Artboard() {
            var args = arguments;

            this._children = [];
            this._namedChildren = {};

            
            this.setBackground(args[0]);

            if (!this._initialize(args[0])) {
                if(Array.isArray(args[0]) || Array.isArray(arguments) ){
                   
                    this.addChildren(Array.isArray(args[0]) ? args[0] : arguments);
                    var rect = null;
                    var children = this._children;
                    for (var i = 0, l = children.length; i < l; i++) {
                        if(!rect){
                            rect = children[i].bounds.clone();
                        }else{
                            rect = rect.unite(children[i].bounds);
                        }
                    }
                    this.setBackground(rect);
                }
            }

            this._project._artboards.push(this);
        },

        /**
         * Private helper to return the owner, either the parent, or the project
         * for top-level layers, if they are inserted in it.
         */
        _getOwner: function () {
            return this._parent || (this._index != null && this._project);
        },

        getBackground: function () {
            return this._background;
        },

        setBackground: function (args) {
            var args = Base.set(Object.assign({
                fillColor: 'rgba(255,255,255,0.000001)'
            }, args), {
                insert: false,
                children: undefined,
                actived: false,
            });

            this._background = new Shape.Rectangle(args);
        },

        /**
         * The name of the artboard.
         *
         * @bean
         * @type String
         */
        getName: function () {
            return this._name;
        },

        setName: function (name) {
            this._name = name;
        },

        /**
         * The name of the artboard.
         *
         * @bean
         * @type Boolean
         */
        getClipped: function () {
            return this._clipped;
        },

        setClipped: function (clipped) {
            this._clipped = clipped;
            this._getItemsInChildrens = !clipped;
        },

        /**
         * The name of the artboard.
         *
         * @bean
         * @type Boolean
         */
        getActived: function () {
            return this._actived;
        },

        setActived: function setActived(actived) {
            this._project._activeArtboard = actived ? this : null;

            if (this.children.length) {
                this._selectBounds = actived;
                this._selectChildren = !actived;
            }

            setActived.base.call(this, actived);
        },

        getStyle: function () {
            return this._background._style;
        },

        isEmpty: function isEmpty(recursively) {
            return false;
        },

        copyContent: function copyContent(source, keep) {
            this._background = source._background.clone();
            this._clipped = source._clipped;
            copyContent.base.call(this, source, keep);
        },

        getStrokeBounds: function (matrix) {
            return this.getBounds(matrix);
        },

        _getBounds: function (matrix, options) {
            var rect = this._background.bounds,
                style = this._style,
                strokeWidth =
                    options.stroke &&
                    style.hasStroke() &&
                    style.getStrokeWidth();

            /*
            if (options.hit) {
                var children = this._children;
                for (var i = 0, l = children.length; i < l; i++) {
                    rect = rect.unite(children[i].bounds);
                }
            }
            */

            if (matrix) rect = matrix._transformBounds(rect);
            return strokeWidth
                ? rect.expand(
                      Path._getStrokePadding(
                          strokeWidth,
                          this._getStrokeMatrix(matrix, options)
                      )
                  )
                : rect;
        },


        transform: function tranform(
            matrix,
            _applyRecursively,
            _setApplyMatrix,
            _skypChanges
        ) {
            if (!matrix) {
                return;
            }
            
   
            tranform.base.call(
                this,
                matrix,
                _applyRecursively,
                _setApplyMatrix,
                _skypChanges
            );

            this._background.transform(
                matrix,
                _applyRecursively,
                _setApplyMatrix,
                _skypChanges
            );

            this._changed(/*#=*/ Change.MATRIX);
        },

        _transformContent: function (matrix, applyRecursively, setApplyMatrix, skypChanges) {
            return this._applyConstraints(
                this._children,
                matrix,
                applyRecursively,
                setApplyMatrix,
                skypChanges
            );
        },

        _applyConstraints: function(children, matrix, applyRecursively, setApplyMatrix) {
            if (children) {
                var scaling = new Point(matrix.a, matrix.d),
                    translation = matrix.translation,
                    isScaling = this._transformType == "scale",
                    flippedArtboard = this.flipped,
                    flipped = new Point(matrix.a, matrix.d).sign(),
                    info = this._background.getActiveInfo(),
                    diff = new Point(info.width, info.height)
                        .multiply(new Size(matrix.a, matrix.d).abs())
                        .subtract(new Size(info.width, info.height)).multiply(flippedArtboard),
                    offset = new Point(this._transformDisrupting && this._transformDisrupting.x ? diff.x /2: 0, this._transformDisrupting && this._transformDisrupting.y ? diff.y /2: 0);

                for (var i = 0, l = children.length; i < l; i++) {
                    var item = children[i],
                        mx = new Matrix(),
                        horizontal = item._constraints.horizontal,
                        vertical = item._constraints.vertical,
                        size = new Size(item.bounds.width, item.bounds.height);
                    
                    if (isScaling) {
                        var rLeft, rTop;

                        var top = rTop = info.center.y > this._constraintsPivot.y;
                        var left = rLeft = info.center.x > this._constraintsPivot.x;

                        if(!(flippedArtboard.x + flipped.x)) left = !left;
                        if(!(flippedArtboard.y + flipped.y)) top = !top;

                        var itemScale = diff.multiply(new Point(
                            !(flippedArtboard.x + flipped.x) ? flipped.x * -1 : flipped.x, 
                            !(flippedArtboard.y + flipped.y) ? flipped.y * -1 : flipped.y
                        )).add(size).divide(size)
                        
                        switch (horizontal) {
                            case "scale":
                                mx.translate(translation.x, 0).scale(scaling.x, 1);
                                break;
                            case "center":
                                mx.translate((diff.x / 2 - offset.x) * (left ? 1 : -1) , 0).scale(flipped.x, 1, this._constraintsPivot);
                                break;
                            case "end":
                                mx.translate(left ? diff.x - offset.x : offset.x, 0).scale(flipped.x, 1,  this._constraintsPivot);
                                break;
                            case "both":
                                mx.scale(flipped.x, 1,  this._constraintsPivot).scale(itemScale.x,  1, rLeft ? item.bounds.leftCenter : item.bounds.rightCenter)
                                break;
                            default:
                                mx.translate(!left ? -diff.x + offset.x : -offset.x, 0).scale(flipped.x, 1,  this._constraintsPivot);
                                break;
                        }
                        
                        switch (vertical) {
                            case "scale":
                                mx.translate(0, translation.y).scale(1, scaling.y);
                            case "center":
                               mx.translate(0, (diff.y / 2 - offset.y) * (top ? 1 : -1)  ).scale(1, flipped.y, this._constraintsPivot);
                                break;
                            case "end":
                                mx.translate(0, top ? diff.y - offset.y : offset.y).scale(1, flipped.y,  this._constraintsPivot);
                            case "both":
                                mx.scale(1, flipped.y,  this._constraintsPivot).scale(1,  itemScale.y, rTop ? item.bounds.topCenter : item.bounds.bottomCenter)
                                break;
                            default:
                                mx.translate(0, !top ? - diff.y + offset.y : -offset.y).scale(1, flipped.y,  this._constraintsPivot);
                        }
                    } else {
                        mx = matrix;
                    }

                    item.transform(mx, applyRecursively, setApplyMatrix);
                }
                    
                return true;
            }
        },

        isClipped: function () {
            return this.getClipped();
        },

        _getClipItem: function () {
            return this.isClipped() && this._background;
        },

        _hitTest: function _hitTest(point, options, parentViewMatrix) {
            var hit = this._background._hitTest(
                point,
                Base.set(Object.assign({}, options), {
                    all: null,
                    match: null,
                    class: null,
                    tolerance: 0,
                })
            );

            if ((hit || (!this.isClipped() && !options.legacy))) {
                return _hitTest.base.call(
                    this,
                    point,
                    options,
                    parentViewMatrix
                );
            }

            var activeItems = this.getActiveItems();
            if (activeItems) {
                var hit = null;
                for (var i = activeItems.length - 1; i >= 0; i--) {
                    var item = activeItems[i];
                    if (!hit) {
                        var hit = item._hitTest(point, options);
                    }
                }
                return hit;
            }
        },

        _hitTestChildren: function _hitTestChildren(
            point,
            options,
            viewMatrix
        ) {
            var that = this;

            function hitTestChildren() {
                return _hitTestChildren.base.call(
                    that,
                    point,
                    options,
                    viewMatrix
                );
            }

            var hit = this._background._hitTest(
                point,
                Base.set(Object.assign({}, options), {
                    all: null,
                    match: null,
                    class: null,
                    tolerance: 0,
                })
            );

            if (options.legacy || this._actived || !this._children.length) {
                if (hit) {
                    var hit = new HitResult("fill", this);
                    var match = options.match;

                    if (
                        options.type &&
                        options.type !== Base.hyphenate(this._class)
                    ) {
                        hit = null;
                    }

                    if (options.class && !(this instanceof options.class)) {
                        hit = null;
                    }

                    if (match && !match(hit)) {
                        hit = null;
                    }

                    if (options.legacy) {
                        hitTestChildren();
                    }

                    if (hit && options.all) {
                        options.all.push(hit);
                    }
                    return hit;
                }

                return hitTestChildren();
            } else {
                return hitTestChildren();
            }
        },

        _remove: function _remove(notifySelf, notifyParent) {
            if(!this._background) return 

            this._background.remove();

            if (this._project) {
                var index = this._project._artboards.indexOf(this);
                if (index != -1) {
                    this._project._artboards.splice(index, 1);
                }
            }

            return _remove.base.call(this, notifySelf, notifyParent);
        },

        draw: function draw(ctx, param, parentStrokeMatrix) {
            draw.base.call(this, ctx, param.extend(), parentStrokeMatrix);
            this._false = true;
        },

        _asPathItem: function () {
            return this._background._asPathItem();
        },

        _draw: function (ctx, param) {
            this._drawRect(ctx, param);
            this._drawChildren(ctx, param);
        },

        _drawRect: function (ctx, param) {
            if (this._background) {
                this._background.draw(ctx, param);
            }
        },

        _drawClip: function (ctx, param) {
            if (this.isClipped()) {
                var clipItem = this._background.clone();
                this._insertItem(0, clipItem);

                clipItem.draw(ctx, param.extend({ clip: true }));

                clipItem.remove();
            }
        },

        _drawChildren: function (ctx, param) {
            this._drawClip(ctx, param);

            var children = this._children;
            for (var i = 0, l = children.length; i < l; i++) {
                children[i].draw(ctx, param);
            }
        },
    }
);

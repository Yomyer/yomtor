/**
 * @name Info
 * @namespace
 */
var Info = Base.extend(/** @lends Info# */{
    _class: 'Info',
    _cache: {},

    beans: true,
   
    /**
     * Creates a Info object using the directions of the given Info object.
     *
     * @param {Item} owner
     * @name Info#initialize
     */
    initialize: function Info(owner) {
       
        this._set(owner);
        
        return this;
    },

    /**
     *
     * @function
     * @param {...*} values
     * @return {Info}
     */
    set: '#initialize',

    _set: function(owner) {
        this._owner = owner;

        return this;
    },

    /**
     *
     * @param {Info} info
     * @return {Boolean} {@true if the points are equal}
     */
    equals: function(info) {
        return this === info || false;
    },

    /**
     * Returns a copy of the info.
     * @return {Info} the cloned info
     */
    clone: function() {
        return new Info(this.owner);
    },

    /**
     * @return {String} a string representation of the info
     */
    toString: function() {
        // return '{ horizontal: ' + this.horizontal + ', vertical: ' + this.vertical + ' }';
    },

    _serialize: function(options) {
        // return [this.horizontal, this.vertical];
    },

    /**
     * @bean
     * @type Point
     */
    getTopLeft: function (_dontLink) {
        var corners = this.getCorners();

        if(!_dontLink && this._topLeft){
            return this._topLeft;
        }
       
        return this._topLeft = new LinkedPoint(corners[0], corners[1], this, '_setInfoTopLeft');
    },

    setTopLeft: function(/* point */) {
        var point = Point.read(arguments);
        this.topLeft.x = point.x;
        this.topLeft.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getTopRight: function (_dontLink) {
        var corners = this.getCorners();

        if(!_dontLink && this._topRight){
            return this._topRight;
        }

        return this._topRight = new LinkedPoint(corners[2], corners[3], this, '_setInfoTopRight');
    },

    setTopRight: function(/* point */) {
        var point = Point.read(arguments);
        this.topRigth.x = point.x;
        this.topRigth.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getBottomRight: function (_dontLink) {
        var corners = this.getCorners();

        if(!_dontLink && this._bottomRight){
            return this._bottomRight;
        }

        return this._bottomRight = new LinkedPoint(corners[4], corners[5], this, '_setInfoBottomRight');
    },

    setBottomRight: function(/* point */) {
        var point = Point.read(arguments);
        this.bottomRight.x = point.x;
        this.bottomRight.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getBottomLeft: function (_dontLink) {
        var corners = this.getCorners();

        if(!_dontLink && this._bottomLeft){
            return this._bottomLeft;
        }

        return this._bottomLeft = new LinkedPoint(corners[6], corners[7], this, '_setInfoBottomLeft');
    },

    setBottomLeft: function(/* point */) {
        var point = Point.read(arguments);
        this.bottomLeft.x = point.x;
        this.bottomLeft.y = point.y;
    },
    
    /**
     * @bean
     * @type Point
     */
    getCenter: function (_dontLink) {
        var point = this.getTopLeft(_dontLink).add(this.getBottomRight(_dontLink)).divide(2);

        return new LinkedPoint(point.x, point.y, this, '_setInfoCenter');
    },

    setCenter: function(/* point */) {
        var point = Point.read(arguments);
        this.center.x = point.x;
        this.center.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getTopCenter: function (_dontLink) {
        var point = this.getTopLeft(_dontLink).add(this.getTopRight(_dontLink)).divide(2);

        return new LinkedPoint(point.x, point.y, this, '_setInfoTopCenter');
    },

    setTopCenter: function(/* point */) {
        var point = Point.read(arguments);
        this.topCenter.x = point.x;
        this.topCenter.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getRightCenter: function (_dontLink) {
        var point = this.getTopRight(_dontLink).add(this.getBottomRight(_dontLink)).divide(2);

        return new LinkedPoint(point.x, point.y, this, '_setInfoRightCenter');
    },

    setRightCenter: function(/* point */) {
        var point = Point.read(arguments);
        this.rightCenter.x = point.x;
        this.rightCenter.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getLeftCenter: function (_dontLink) {
        var point = this.getBottomLeft(_dontLink).add(this.getTopLeft(_dontLink)).divide(2);

        return new LinkedPoint(point.x, point.y, this, '_setInfoLeftCenter');
    },

    setLeftCenter: function(/* point */) {
        var point = Point.read(arguments);
        this.leftCenter.x = point.x;
        this.leftCenter.y = point.y;
    },

    /**
     * @bean
     * @type Point
     */
    getBottomCenter: function (_dontLink) {
        var point = this.getBottomRight(_dontLink).add(this.getBottomLeft(_dontLink)).divide(2);

        return new LinkedPoint(point.x, point.y, this, '_setInfoBottomCenter');
    },

    setBottomCenter: function(/* point */) {
        var point = Point.read(arguments);
        this.bottomCenter.x = point.x;
        this.bottomCenter.y = point.y;
    },

    /**
     * @bean
     * @type Number
     */
    getTop: function () {
        return this.topCenter.y;
    },

    /**
     * @bean
     * @type Number
     */
    getRight: function () {
        return this.rightCenter.x;
    },

    /**
     * @bean
     * @type Number
     */
    getBottom: function () {
        return this.bottomCenter.x;
    },

    /**
     * @bean
     * @type Number
     */
    getLeft: function () {
        return this.leftCenter.x;
    },

    /**
     * @bean
     * @type Number
     */
    getAngle: function () {
        return this._owner.angle;
    },

    setAngle: function(angle){
        this._owner.rotate(angle-this.inheritedAngle, this.center);
    },

    /**
     * @bean
     * @type Number
     */
    getInheritedAngle: function () {
        return this._owner.inheritedAngle;
    },

    /**
     * @bean
     * @type Number
     */
    getWidth: function () {
        return this.topLeft.subtract(this.topRight).length
    },

    setWidth: function(value){
        this._setSize('width', value)
    },

    /**
     * @bean
     * @type Number
     */
    getHeight: function () {
        return this.topLeft.subtract(this.bottomLeft).length
    },

    setHeight: function(value){
        this._setSize('height', value)
    },

    /**
     * @bean
     * @type Size
     */
    getSize: function () {
        return new LinkedSize(this.width, this.height, this, '_setInfoSize');
    },

    setSize: function(/* size */){
        var size = Size.read(arguments);
        this._setInfoSize(size.width, size.height, this.topLeft);
    },

    /**
     *
     * @name Control#setPivotSize
     * @param {Size} size
     * @param {Point} pivot
     * @type void
     */
    /**
     *
     * @name Control#setPivotSize
     * @param {Number} width
     * @param {Number} height
     * @param {Point} pivot
     * @type void
     */
    setPivotSize: function(/* arguments */){
        var size = Size.read(arguments);
        var pivot = Point.read(arguments);

        this._setInfoSize(size.width, size.height, pivot);

    },
    
    /**
     * The corners
     *
     * @name Info#corners
     * @type Array<number>
     * 
    */
    getCorners: function(unrotated) {
        var owner = this._owner
        var data = {
            angle: owner.getInheritedAngle(),
            bounds: owner.bounds,
            center: owner.bounds.center,
            unrotated: unrotated
        }
        var key = JSON.stringify(Base.serialize(data))
        
        if(this._cache[key]){
          return this._cache[key];
        }
        
        if (data.angle !== 0 && !unrotated) {    
            owner.transform(new Matrix().rotate(-data.angle, data.center), false, false, true);
            data.bounds = owner.bounds;
            owner.transform(new Matrix().rotate(data.angle, data.center), false, false, true);
        }
        
        var matrix = new Matrix().rotate(!unrotated && data.angle, data.center);
        var corners = matrix._transformCorners(data.bounds);

        return this._cache[key] = JSON.parse(JSON.stringify(corners));
    },

    _setInfoSize: function(/* arguments */){
        var size = Size.read(arguments);
        var pivot = Point.read(arguments);

        this._setSize('width', size.width, pivot);
        this._setSize('height', size.height, pivot);
    },

    _setSize: function(direction, value, pivot = this.topLeft){
        var angle = this.inheritedAngle;
        
        if(value <= 0){
            value = 1;
        }

        factor = value / this[direction];
        factor = direction === 'width' ? [factor, 1] : [1, factor];

        this._owner.rotate(-angle, pivot);
        this._owner.scale(factor, pivot);
        this._owner.rotate(angle, pivot);
    }

}, Base.each(['_setInfoTopLeft', '_setInfoTopRight', '_setInfoBottomRight', '_setInfoBottomLeft', '_setInfoCenter', '_setInfoTopCenter', '_setInfoRightCenter', '_setInfoLeftCenter', '_setInfoBottomCenter'], function(key) {
    this[key] = function(/* value, center */) {
       var get = 'get' + key.replace('_setInfo', '');
       var point = Point.read(arguments)
       var diff = point.subtract(this[get](true))
       
       this._owner.bounds.center = this._owner.bounds.center.add(diff)
    };
}));

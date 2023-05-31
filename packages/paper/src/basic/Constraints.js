/**
 * @name Constraints
 * @namespace
 */

var Constraints = Base.extend(/** @lends Constraints# */{
    _class: 'Constraints',
    _vertical: null,
    _horizontal: null,

    /**
     * Creates a Constraints object using the directions of the given Constraints object.
     *
     * @name Constraints#initialize
     * @param {'start' | 'end' | 'center' | 'both' | 'scale'} horizontal the x coordinate
     * @param {'start' | 'end' | 'center' | 'both' | 'scale'} vertical the y coordinate
     */
    /**
     * Creates a Constraints object using the directions of the given Constraints object.
     *
     * @name Constraints#initialize
     * @param {Array} array
     *
     */
    /**
     * Creates a Constraints object using the directions of the given Constraints object.
     *
     * @param {Constraints} constraints
     * @name Constraints#initialize
     */
    initialize: function Constraints(arg0, arg1) {
        var type = typeof arg0,
            reading = this.__read,
            read = 0;

        if (type === 'string') {
            var hasY = typeof arg1 === 'string';
            this._set(arg0, hasY ? arg1 : arg0);
            if (reading)
                read = hasY ? 2 : 1;
        } else if (type === 'undefined' || arg0 === null) {
            this._set('start', 'start');
            if (reading)
                read = arg0 === null ? 1 : 0;
        } else {
            var obj = type === 'string' ? JSON.parse(arg0.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')) || [] : arg0;
            read = 1;
            if (Array.isArray(obj)) {
                this._set(obj[0], (obj.length > 1 ? obj[1] : obj[0]));
            } else if ('horizontal' in obj) {
                this._set(obj.horizontal || 0, obj.vertical || 0);
            }  else {
                this._set('start', 'start');
                read = 0;
            }
        }
        if (reading)
            this.__read = read;
        return this;
    },

    /**
     *
     * @function
     * @param {...*} values
     * @return {Constraints}
     */
    set: '#initialize',

    _set: function(horizontal, vertical) {
        this.horizontal = horizontal;
        this.vertical = vertical;

        return this;
    },

    /**
     * The horizontal direction of the constraint
     *
     * @name Constraints#vertical
     * @type 'start' | 'end' | 'center' | 'both' | 'scale'
     */

    /**
     * The horizontal direction of the constraint
     *
     * @name Constraints#horizontal
     * @type 'start' | 'end' | 'center' | 'both' | 'scale'
     */

    /**
     *
     * @param {Constraints} constraists
     * @return {Boolean} {@true if the points are equal}
     */
    equals: function(constraists) {
        return this === constraists || constraists
                && (this.horizontal === constraists.horizontal && this.vertical === constraists.vertical
                    || Array.isArray(constraists)
                        && this.horizontal === constraists[0] && this.vertical === constraists[1])
                || false;
    },

    /**
     * Returns a copy of the constraints.
     * @return {Constraints} the cloned constraints
     */
    clone: function() {
        return new Constraints(this.horizontal, this.vertical);
    },

    /**
     * @return {String} a string representation of the constraints
     */
    toString: function() {
        return '{ horizontal: ' + this.horizontal + ', vertical: ' + this.vertical + ' }';
    },

    _serialize: function(options) {
        return [this.horizontal, this.vertical];
    },
    statics: /** @lends Constraints */{
        /**
         * @type 'start' | 'end' | 'center' | 'both' | 'scale'
         * @static
         * @ben
         */
        POSITIONS: ''
    }
});

/**
 * @name LinkedConstraints
 *
 *
 * @private
 */
var LinkedConstraints = Constraints.extend({
    // Have LinkedPoint appear as a normal Point in debugging
    initialize: function Constraints(horizontal, vertical, owner, setter) {
        this._horizontal = horizontal;
        this._vertical = vertical;
        this._owner = owner;
        this._setter = setter;
    },

    // See Point#_set() for an explanation of #_set():
    _set: function(horizontal, vertical, _dontNotify) {
        this._horizontal = horizontal;
        this._vertical = vertical;
        if (!_dontNotify)
            this._owner[this._setter](this);
        return this;
    },

    getHorizontal: function() {
        return this._horizontal;
    },

    setHorizontal: function(horizontal) {
        this._horizontal = horizontal;
        this._owner[this._setter](this);
    },
    
    getVertical: function() {
        return this._vertical;
    },

    setVertical: function(vertical) {
        this._vertical = vertical;
        this._owner[this._setter](this);
    },
});

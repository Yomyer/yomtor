/**
 * @name Shorthand
 * @namespace
 */

var Shorthand = Base.extend(/** @lends Shorthand# */{
    _class: 'Shorthand',
    _top: null,
    _right: null,
    _bottom: null,
    _left: null,

    /**
     * Creates a Shorthand object using the numbers of the given Shorthand object.
     *
     * @name Shorthand#initialize
     * @param {Number} top the x coordinate
     * @param {Number} right the y coordinate
     * @param {Number} bottom the x coordinate
     * @param {Number} left the y coordinate
     */
    /**
     * Creates a Shorthand array using the numbers of the given Shorthand object.
     *
     * @name Shorthand#initialize
     * @param {Array} array
     *
     */
    /**
     * Creates a Shorthand serialize string using the numbers of the given Shorthand object.
     *
     * @name Shorthand#initialize
     * @param {String} string
     *
     */
    /**
     * Creates a Shorthand object using the directions of the given Shorthand object.
     *
     * @name Shorthand#initialize
     * @param {Number} array
     *
     */
    /**
     * Creates a Shorthand object using number of the given Shorthand object.
     *
     * @param {Shorthand} shorthand
     * @name Shorthand#initialize
     */
    initialize: function Shorthand(arg0, arg1, arg2, arg3) {
        var type = typeof arg0,
            reading = this.__read,
            read = 0;

        if (type === 'number' || arg0 === null) {
            var multiple = typeof arg1 === 'number';
            this._set(arg0, multiple ? arg1 : arg0, multiple ? arg2 : arg0, multiple ? arg3 : arg0);
            if (reading)
                read = multiple ? 4 : 1;
        } else if (type === 'undefined' || arg0 === null) {
            this._set(0, 0, 0, 0);
            if (reading)
                read = arg0 === null ? 1 : 0;
        } else {
            var obj = type === 'string' ? JSON.parse(arg0.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')) || [] : arg0;
            
            read = 1;
            if (Array.isArray(obj)) {
                this._set(obj[0], (obj.length > 1 ? obj[1] : obj[0]), (obj.length > 1 ? obj[2] : obj[0]), (obj.length > 1 ? obj[3] : obj[0]));
            } else if ('top' in obj) {
                this._set(obj.top, obj.right, obj.bottom, obj.left);
            }  else {
                this._set(0, 0, 0, 0);
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
     * @return {Shorthand}
     */
    set: '#initialize',

    _set: function(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;

        return this;
    },

    /**
     * The horizontal direction of the constraint
     *
     * @name Shorthand#top
     * @type Number
     */

    /**
     * The horizontal direction of the constraint
     *
     * @name Shorthand#right
     * @type Number
     */

    /**
     * The horizontal direction of the constraint
     *
     * @name Shorthand#bottom
     * @type Number
     */

    /**
     * The horizontal direction of the constraint
     *
     * @name Shorthand#left
     * @type Number
     */



    /**
     *
     * @param {Shorthand} shorthand
     * @return {Boolean} {@true if the shorthand are equal}
     */
    equals: function(shorthand) {
        return this === shorthand || shorthand
                && (this.top === shorthand.top && this.right === shorthand.right && this.bottom === shorthand.bottom && this.left === shorthand.left
                    || Array.isArray(shorthand)
                        && this.top === shorthand[0] && this.right === shorthand[1] && this.bottom === shorthand[2] && this.left === shorthand[3])
                || false;
    },

    /**
     *
     * @name Shorthand#iactived
     * @type Boolean
     */
    getActived: function(){
        return this.top || this.right || this.bottom || this.left;
    },

    /**
     *
     * @name Shorthand#regular
     * @type Boolean
     */
    getRegular: function(){
        return this.top === this.right && this.top === this.bottom && this.top === this.left;
    },

    /**
     * Returns a copy of the shorthand.
     * @return {Shorthand} the cloned shorthand
     */
    clone: function() {
        return new Shorthand(this.top, this.right, this.bottom, this.left);
    },

    /**
     * @return {String} a string representation of the shorthand
     */
    toString: function() {
        return '{ top: ' + this.top + ', right: ' + this.right + ', bottom: ' + this.bottom + ', left: ' + this.left + ' }';
    },

    _serialize: function(options) {
        return [this.top, this.right, this.bottom, this.left];
    },
});

/**
 * @name LinkedShorthand
 *
 *
 * @private
 */
var LinkedShorthand = Shorthand.extend({
    // Have LinkedPoint appear as a normal Point in debugging
    initialize: function Shorthand(top, right, bottom, left, owner, setter) {
        this._top = top;
        this._right = right;
        this._bottom = bottom;
        this._left = left;
        this._owner = owner;
        this._setter = setter;
    },

    // See Point#_set() for an explanation of #_set():
    _set: function(top, right, bottom, left, _dontNotify) {
        this._top = top;
        this._right = right;
        this._bottom = bottom;
        this._left = left;
        if (!_dontNotify)
            this._owner[this._setter](this);
        return this;
    },

    getTop: function() {
        return this._top;
    },

    setTop: function(top) {
        this._top = top;
        this._owner[this._setter](this);
    },
    
    getRight: function() {
        return this._right;
    },

    setRight: function(right) {
        this._right = right;
        this._owner[this._setter](this);
    },

    getBottom: function() {
        return this._bottom;
    },

    setBottom: function(bottom) {
        this._bottom = bottom;
        this._owner[this._setter](this);
    },

    getLeft: function() {
        return this._left;
    },

    setLeft: function(left) {
        this._left = left;
        this._owner[this._setter](this);
    },
    
});

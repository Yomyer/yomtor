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
 * @name DrawControlEvent
 * @class
 * @extends Event
 */
var DrawControlEvent = Event.extend(/** @lends DrawControlEvent# */{
    _class: 'DrawControlEvent',
    _control: null,
    _selector: null,

    /**
     * Creates a new Segment object.
     *
     * @name DrawControlEvent#initialize
     * @param {Control} [control] 
     * @param {Selector} [selector]
     */
    initialize: function DrawControlEvent(control, selector) {
        this.control = control;
        this.selector = selector;
    },

    /**
     *
     * @bean
     * @type Control
     */
    getControl: function() {
        return this._control;
    },

    setControl: function(control) {
        this._control = control;
    },


    /**
     *
     * @bean
     * @type Selector
     */
    getSelector: function() {
        return this._selector;
    },

    setSelector: function(selector) {
        this._selector = selector;
    },
});

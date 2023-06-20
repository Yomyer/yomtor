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
    _ctx: null,
    _params: null,
    _zoom: null,

    /**
     * Creates a new Segment object.
     *
     * @name DrawControlEvent#initialize
     * @param {Control} [control] 
     * @param {Selector} [selector]
     * @param {CanvasRenderingContext2D} [ctx]
     * @param {Object} [params]
     * @param {Number} [zoom]
     */
    initialize: function DrawControlEvent(control, selector, ctx, params, zoom) {
        this.control = control;
        this.selector = selector;
        this.ctx = ctx;
        this.params = params;
        this.zoom = zoom;
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

    /**
     *
     * @bean
     * @type CanvasRenderingContext2D
     */
     getCtx: function() {
        return this._ctx;
    },

    setCtx: function(ctx) {
        this._ctx = ctx;
    },

    /**
     *
     * @bean
     * @type CanvasRenderingContext2D
     */
    getParams: function() {
        return this._params;
    },

    setParams: function(params) {
        this._params = params;
    },

    /**
     *
     * @bean
     * @type Number
     */
    getZoom: function() {
        return this._zoom;
    },

    setZoom: function(zoom) {
        this._zoom = zoom;
    },
});

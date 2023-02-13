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
 * @name ChangeFlag
 * @namespace
 */
var ChangeFlag = {
    /**
     * Anything affecting the appearance of an item, including GEOMETRY,
     * STROKE, STYLE and ATTRIBUTE (except for the invisible ones: locked, name)
     *
     * @bean
     * @type number
     */
    APPEARANCE: 0x1,

    /**
     * A change in the item's children
     *
     * @bean
     * @type number
     */
    CHILDREN: 0x2,

    /**
     * A change of the item's place in the scene graph (removed, inserted,
     * moved)
     * 
     * @bean
     * @type number
     */
    INSERTION: 0x4,

    /**
     * Item geometry (path, bounds)
     *
     * @bean
     * @type number
     */
    GEOMETRY: 0x8,

    /**
     * The item's matrix has changed
     *
     * @bean
     * @type number
     */
    MATRIX: 0x10,

    /**
     * Only segment(s) have changed, and affected curves have already been
     * notified. This is to implement an optimization in _changed() calls
     *
     * @bean
     * @type number
     */
    SEGMENTS: 0x20,

    /**
     * Stroke geometry (excluding color)
     *
     * @bean
     * @type number
     */
    STROKE: 0x40,

    /**
     * Fill style or stroke color / dash
     *
     * @bean
     * @type number
     */
    STYLE: 0x80,

    /**
     * Item attributes: visible, blendMode, locked, name, opacity, clipMask ...
     *
     * @bean
     * @type number
     */
    ATTRIBUTE: 0x100,

    /**
     * Text content
     *
     * @bean
     * @type number
     */
    CONTENT: 0x200,

    /**
     * Raster pixels
     *
     * @bean
     * @type number
     */
    PIXELS: 0x400,

    /**
     * Clipping in one of the child items
     *
     * @bean
     * @type number
     */
    CLIPPING: 0x800,

    /**
     * The view has been transformed
     *
     * @bean
     * @type number
     */
    VIEW: 0x1000,

    /**
     * A change controls
     *
     * @bean
     * @type number
     */
    CONTROL: 0x10000,

    /**
     * A change iactived item
     *
     * @bean
     * @type number
     */
    HIGHLIGHT: 0x200000,

    /**
     * A change iactived item
     *
     * @bean
     * @type number
     */
    ACTIVE: 0x100000
};

/**
 * @name Change
 * @namespace
 */
var Change = {
    /**
     * @bean
     * @type number
     */
    CHILDREN: ChangeFlag.CHILDREN | ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    INSERTION: ChangeFlag.INSERTION | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    GEOMETRY: ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    MATRIX: ChangeFlag.MATRIX | ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    SEGMENTS: ChangeFlag.SEGMENTS | ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    STROKE: ChangeFlag.STROKE | ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    STYLE: ChangeFlag.STYLE | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    ATTRIBUTE: ChangeFlag.ATTRIBUTE | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    CONTENT: ChangeFlag.CONTENT | ChangeFlag.GEOMETRY | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    PIXELS: ChangeFlag.PIXELS | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    VIEW: ChangeFlag.VIEW | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    CONTROL: ChangeFlag.CONTROL | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    ACTIVE: ChangeFlag.ACTIVE | ChangeFlag.ATTRIBUTE | ChangeFlag.APPEARANCE,
    /**
     * @bean
     * @type number
     */
    HIGHLIGHT: ChangeFlag.HIGHLIGHT | ChangeFlag.ATTRIBUTE | ChangeFlag.APPEARANCE
};

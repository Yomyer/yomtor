"use strict";
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../dist/paper.d.ts" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file is used as a way to test auto-generated typescript definition
 * validity. For now, this only check that calling methods as they are defined
 * in online documentation does not throw error in typescript compilation.
 *
 * Todo: add more advanced type checking by using either:
 * - typescript compiler check: `let result:type = methodCall()`
 * - dedicated testing library like: https://github.com/Microsoft/dtslint
 */
var paper_1 = __importStar(require("@yomtor/paper"));
//
// Utility variables
//
var point = {};
var size = {};
var rectangle = {};
var matrix = {};
var project = {};
var item = {};
var layer = {};
var group = {};
var shape = {};
var raster = {};
var pathItem = {};
var path = {};
var compoundPath = {};
var segment = {};
var curve = {};
var curveLocation = {};
var symbolDefinition = {};
var symbolItem = {};
var style = {};
var color = {};
var gradient = {};
var gradientStop = {};
var textItem = {};
var pointText = {};
var view = {};
var event = {};
var mouseEvent = {};
var tool = {};
var toolEvent = {};
var keyEvent = {};
var paperScope = {};
var callback = {};
var hitResult = {};
var object = {};
var acolor = new paper_1.Color('#333');
//
// Classes
//
//
// Point
//
new paper_1.default.Point(0, 0);
new paper_1.default.Point([0, 0]);
new paper_1.default.Point({ x: 0, y: 0 });
new paper_1.default.Point(size);
new paper_1.default.Point(point);
point.x;
point.y;
point.length;
point.angle;
point.angleInRadians;
point.quadrant;
point.selected;
point.set(0, 0);
point.set([0, 0]);
point.set({ x: 0, y: 0 });
point.set(size);
point.set(point);
point.equals(point);
point.clone();
point.toString();
point.getAngle(point);
point.getAngleInRadians(point);
point.getDirectedAngle(point);
point.getDistance(point, true);
point.normalize();
point.normalize(0);
point.rotate(0, point);
point.transform(matrix);
point.isInside(rectangle);
point.isClose(point, 0);
point.isCollinear(point);
point.isOrthogonal(point);
point.isZero();
point.isNaN();
point.isInQuadrant(0);
point.dot(point);
point.cross(point);
point.project(point);
point.round();
point.ceil();
point.floor();
point.abs();
point.add(0);
point.add(point);
point.subtract(0);
point.subtract(point);
point.multiply(0);
point.multiply(point);
point.divide(0);
point.divide(point);
point.modulo(0);
point.modulo(point);
paper_1.default.Point.min(point, point);
paper_1.default.Point.max(point, point);
paper_1.default.Point.random();
//
// Size
//
new paper_1.default.Size(0, 0);
new paper_1.default.Size([0, 0]);
new paper_1.default.Size({ width: 0, height: 0 });
new paper_1.default.Size(size);
new paper_1.default.Size(point);
size.width;
size.height;
size.set(0, 0);
size.set([0, 0]);
size.set({ x: 0, y: 0 });
size.set(size);
size.set(point);
size.equals(size);
size.clone();
size.toString();
size.isZero();
size.isNaN();
size.round();
size.ceil();
size.floor();
size.abs();
size.add(0);
size.add(size);
size.subtract(0);
size.subtract(size);
size.multiply(0);
size.multiply(size);
size.divide(0);
size.divide(size);
size.modulo(0);
size.modulo(size);
paper_1.default.Size.min(size, size);
paper_1.default.Size.max(size, size);
paper_1.default.Size.random();
//
// Rectangle
//
new paper_1.default.Rectangle(point, size);
new paper_1.default.Rectangle({ point: point, size: size });
new paper_1.default.Rectangle(0, 0, 0, 0);
new paper_1.default.Rectangle(point, point);
new paper_1.default.Rectangle(rectangle);
rectangle.x;
rectangle.y;
rectangle.width;
rectangle.height;
rectangle.point;
rectangle.size;
rectangle.left;
rectangle.top;
rectangle.right;
rectangle.bottom;
rectangle.center;
rectangle.topLeft;
rectangle.topRight;
rectangle.bottomLeft;
rectangle.bottomRight;
rectangle.leftCenter;
rectangle.topCenter;
rectangle.rightCenter;
rectangle.bottomCenter;
rectangle.area;
rectangle.selected;
rectangle.set(point, size);
rectangle.set({ point: point, size: size });
rectangle.set(0, 0, 0, 0);
rectangle.set(point, point);
rectangle.set(rectangle);
rectangle.clone();
rectangle.equals(rectangle);
rectangle.toString();
rectangle.isEmpty();
rectangle.contains(point);
rectangle.contains(rectangle);
rectangle.intersects(rectangle);
rectangle.intersects(rectangle, 0);
rectangle.intersect(rectangle);
rectangle.unite(rectangle);
rectangle.include(point);
rectangle.expand(0);
rectangle.expand(0, 0);
rectangle.scale(0);
rectangle.scale(0, 0);
//
// Matrix
//
new paper_1.default.Matrix();
new paper_1.default.Matrix(0, 0, 0, 0, 0, 0);
new paper_1.default.Matrix([0, 0, 0, 0, 0, 0]);
new paper_1.default.Matrix(matrix);
matrix.a;
matrix.b;
matrix.c;
matrix.d;
matrix.tx;
matrix.ty;
matrix.values;
matrix.translation;
matrix.scaling;
matrix.rotation;
matrix.set(0, 0, 0, 0, 0, 0);
matrix.set([0, 0, 0, 0, 0, 0]);
matrix.set(matrix);
matrix.clone();
matrix.equals(matrix);
matrix.toString();
matrix.reset();
matrix.apply();
matrix.apply(true);
matrix.translate(point);
matrix.translate(0, 0);
matrix.scale(0);
matrix.scale(0, point);
matrix.scale(0, 0);
matrix.scale(0, 0, point);
matrix.rotate(0, point);
matrix.rotate(0, 0, 0);
matrix.shear(point);
matrix.shear(point, point);
matrix.shear(0, 0);
matrix.shear(0, 0, point);
matrix.skew(point);
matrix.skew(point, point);
matrix.skew(0, 0);
matrix.skew(0, 0, point);
matrix.append(matrix);
matrix.prepend(matrix);
matrix.appended(matrix);
matrix.prepended(matrix);
matrix.invert();
matrix.inverted();
matrix.isIdentity();
matrix.isInvertible();
matrix.isSingular();
matrix.transform(point);
matrix.transform([0, 0], [0, 0], 0);
matrix.inverseTransform(point);
matrix.decompose();
matrix.applyToContext({});
//
// Project
//
new paper_1.default.Project({});
new paper_1.default.Project('');
new paper_1.default.Project(size);
project.view;
project.currentStyle;
project.index;
project.layers;
project.activeLayer;
project.symbolDefinitions;
project.selectedItems;
project.activate();
project.clear();
project.isEmpty();
project.remove();
project.selectAll();
project.deselectAll();
project.addLayer(layer);
project.insertLayer(0, layer);
project.hitTest(point);
project.hitTest(point, {});
project.hitTestAll(point);
project.hitTestAll(point, {});
project.getItems({});
project.getItems(callback);
project.getItem({});
project.getItem(callback);
project.exportJSON();
project.exportJSON({});
project.importJSON('');
project.exportSVG();
project.exportSVG({});
project.importSVG('');
project.importSVG({});
project.importSVG('', {});
project.importSVG('', callback);
//
// Item
//
item.id;
item.className;
item.name;
item.style;
item.locked;
item.visible;
item.blendMode;
item.opacity;
item.selected;
item.clipMask;
item.data;
item.position;
item.pivot;
item.bounds;
item.strokeBounds;
item.handleBounds;
item.rotation;
item.scaling;
item.matrix;
item.globalMatrix;
item.viewMatrix;
item.applyMatrix;
item.project;
item.view;
item.layer;
item.parent;
item.children;
item.firstChild;
item.lastChild;
item.nextSibling;
item.previousSibling;
item.index;
item.strokeColor;
item.strokeWidth;
item.strokeCap;
item.strokeJoin;
item.dashOffset;
item.strokeScaling;
item.dashArray;
item.miterLimit;
item.fillColor;
item.fillColor && item.fillColor;
item.fillRule;
item.shadowColor;
item.shadowBlur;
item.shadowOffset;
item.selectedColor;
item.onFrame;
item.onMouseDown;
item.onMouseDrag;
item.onMouseUp;
item.onClick;
item.onDoubleClick;
item.onMouseMove;
item.onMouseEnter;
item.onMouseLeave;
item.set({});
item.clone();
item.clone({});
item.copyContent(item);
item.copyAttributes(item, true);
item.rasterize();
item.rasterize({});
item.contains(point);
item.isInside(rectangle);
item.intersects(item);
item.hitTest(point);
item.hitTest(point, {});
item.hitTestAll(point);
item.hitTestAll(point, {});
item.matches({});
item.matches(callback);
item.getItems({});
item.getItems(callback);
item.getItem({});
item.getItem(callback);
item.exportJSON();
item.exportJSON({});
item.importJSON('');
item.exportSVG();
item.exportSVG({});
item.importSVG('');
item.importSVG({});
item.importSVG('', {});
item.importSVG('', callback);
item.addChild(item);
item.insertChild(0, item);
item.addChildren([item]);
item.insertChildren(0, [item]);
item.insertAbove(item);
item.insertBelow(item);
item.sendToBack();
item.bringToFront();
item.addTo(group);
item.copyTo(group);
item.reduce({});
item.remove();
item.replaceWith(item);
item.removeChildren();
item.removeChildren(0);
item.removeChildren(0, 0);
item.reverseChildren();
item.isEmpty();
item.hasFill();
item.hasStroke();
item.hasShadow();
item.hasChildren();
item.isInserted();
item.isAbove(item);
item.isBelow(item);
item.isParent(item);
item.isChild(item);
item.isDescendant(item);
item.isAncestor(item);
item.isSibling(item);
item.isGroupedWith(item);
item.translate(point);
item.rotate(0);
item.rotate(0, point);
item.scale(0);
item.scale(0, point);
item.scale(0, 0);
item.scale(0, 0, point);
item.shear(point);
item.shear(point, point);
item.shear(0, 0);
item.shear(0, 0, point);
item.skew(point);
item.skew(point, point);
item.skew(0, 0);
item.skew(0, 0, point);
item.transform(matrix);
item.globalToLocal(point);
item.localToGlobal(point);
item.parentToLocal(point);
item.localToParent(point);
item.fitBounds(rectangle);
item.fitBounds(rectangle, true);
item.on('', callback);
item.on({});
item.off('', callback);
item.off({});
item.emit('', event);
item.responds('');
item.removeOn({});
item.removeOnMove();
item.removeOnDown();
item.removeOnDrag();
item.removeOnUp();
//
// Layer
//
new paper_1.default.Layer([item]);
new paper_1.default.Layer({});
layer.activate();
//
// Group
//
new paper_1.default.Group([item]);
new paper_1.default.Group({});
group.clipped;
//
// Shape
//
new paper_1.default.Shape.Circle(point, 0);
new paper_1.default.Shape.Circle({});
new paper_1.default.Shape.Rectangle(rectangle);
new paper_1.default.Shape.Rectangle(rectangle, size);
new paper_1.default.Shape.Rectangle(point, size);
new paper_1.default.Shape.Rectangle(point, point);
new paper_1.default.Shape.Rectangle({});
new paper_1.default.Shape.Ellipse(rectangle);
new paper_1.default.Shape.Ellipse({});
shape.type;
shape.size;
shape.radius;
shape.toPath();
shape.toPath(true);
//
// Raster
//
new paper_1.default.Raster();
new paper_1.default.Raster({});
new paper_1.default.Raster({});
new paper_1.default.Raster('');
new paper_1.default.Raster('', point);
raster.size;
raster.width;
raster.height;
raster.loaded;
raster.resolution;
raster.image;
raster.canvas;
raster.context;
raster.source;
raster.crossOrigin;
raster.smoothing;
raster.onLoad;
raster.onLoad = function () { };
raster.onLoad = null;
raster.onError;
raster.getSubCanvas(rectangle);
raster.getSubRaster(rectangle);
raster.toDataURL();
raster.drawImage({}, point);
raster.getAverageColor(path);
raster.getAverageColor(rectangle);
raster.getAverageColor(point);
raster.getPixel(0, 0);
raster.getPixel(point);
raster.setPixel(0, 0, color);
raster.setPixel(point, color);
raster.createImageData(size);
raster.getImageData(rectangle);
raster.putImageData({}, point);
raster.setImageData({});
//
// HitResult
//
hitResult.type;
hitResult.name;
hitResult.item;
hitResult.location;
hitResult.color;
hitResult.segment;
hitResult.point;
//
// PathItem
//
pathItem.interiorPoint;
pathItem.clockwise;
pathItem.pathData;
pathItem.unite(path);
pathItem.unite(path, {});
pathItem.intersect(path);
pathItem.intersect(path, {});
pathItem.subtract(path);
pathItem.subtract(path, {});
pathItem.exclude(path);
pathItem.exclude(path, {});
pathItem.divide(path);
pathItem.divide(path, {});
pathItem.reorient();
pathItem.reorient(true);
pathItem.reorient(true, true);
pathItem.getIntersections(path);
pathItem.getIntersections(path, callback);
pathItem.getCrossings(path);
pathItem.getNearestLocation(point);
pathItem.getNearestPoint(point);
pathItem.reverse();
pathItem.flatten();
pathItem.flatten(0);
pathItem.smooth();
pathItem.smooth({});
pathItem.simplify();
pathItem.simplify(0);
pathItem.interpolate(path, path, 0);
pathItem.compare(path);
pathItem.moveTo(point);
pathItem.lineTo(point);
pathItem.arcTo(point, point);
pathItem.arcTo(point);
pathItem.arcTo(point, true);
pathItem.curveTo(point, point);
pathItem.curveTo(point, point, 0);
pathItem.cubicCurveTo(point, point, point);
pathItem.quadraticCurveTo(point, point);
pathItem.closePath();
pathItem.moveBy(point);
pathItem.lineBy(point);
pathItem.arcBy(point, point);
pathItem.arcBy(point);
pathItem.arcBy(point, true);
pathItem.curveBy(point, point);
pathItem.curveBy(point, point, 0);
pathItem.cubicCurveBy(point, point, point);
pathItem.quadraticCurveBy(point, point);
paper_1.default.PathItem.create('');
paper_1.default.PathItem.create([[0]]);
paper_1.default.PathItem.create({});
//
// Path
//
new paper_1.default.Path();
new paper_1.default.Path([segment]);
new paper_1.default.Path(object);
new paper_1.default.Path('');
new paper_1.default.Path.Line(point, point);
new paper_1.default.Path.Line(object);
new paper_1.default.Path.Circle(point, 0);
new paper_1.default.Path.Circle(object);
new paper_1.default.Path.Rectangle(rectangle);
new paper_1.default.Path.Rectangle(rectangle, size);
new paper_1.default.Path.Rectangle(point, size);
new paper_1.default.Path.Rectangle(point, point);
new paper_1.default.Path.Rectangle(object);
new paper_1.default.Path.Ellipse(rectangle);
new paper_1.default.Path.Ellipse(object);
new paper_1.default.Path.Arc(point, point, point);
new paper_1.default.Path.Arc(object);
new paper_1.default.Path.RegularPolygon(point, 0, 0);
new paper_1.default.Path.RegularPolygon(object);
new paper_1.default.Path.Star(point, 0, 0, 0);
new paper_1.default.Path.Star(object);
path.segments;
path.firstSegment;
path.lastSegment;
path.curves;
path.firstCurve;
path.lastCurve;
path.closed;
path.length;
path.area;
path.fullySelected;
path.add(segment);
path.add(point);
path.add([0, 0]);
path.add(segment, point, [0, 0]);
path.insert(0, segment);
path.addSegments([segment]);
path.insertSegments(0, [segment]);
path.removeSegment(0);
path.removeSegments();
path.removeSegments(0);
path.removeSegments(0, 0);
path.hasHandles();
path.clearHandles();
path.divideAt(curveLocation);
path.splitAt(curveLocation);
path.join(path);
path.join(path, 0);
path.reduce(object);
path.toShape();
path.toShape(true);
path.getLocationOf(point);
path.getOffsetOf(point);
path.getLocationAt(0);
path.getPointAt(0);
path.getTangentAt(0);
path.getNormalAt(0);
path.getWeightedTangentAt(0);
path.getWeightedNormalAt(0);
path.getCurvatureAt(0);
path.getOffsetsWithTangent(point);
path = path.set(object);
path = path.clone();
path = path.addTo(group);
path = path.copyTo(group);
path = path.on('', callback);
path = path.on({});
path = path.off('', callback);
path = path.off({});
//
// CompoundPath
//
new paper_1.default.CompoundPath(object);
new paper_1.default.CompoundPath('');
compoundPath.closed;
compoundPath.firstSegment;
compoundPath.lastSegment;
compoundPath.curves;
compoundPath.firstCurve;
compoundPath.lastCurve;
compoundPath.area;
compoundPath.length;
//
// Segment
//
new paper_1.default.Segment();
new paper_1.default.Segment(point);
new paper_1.default.Segment(point, point);
new paper_1.default.Segment(point, point, point);
new paper_1.default.Segment(object);
segment.point;
segment.handleIn;
segment.handleOut;
segment.selected;
segment.index;
segment.path;
segment.curve;
segment.location;
segment.next;
segment.previous;
segment.hasHandles();
segment.isSmooth();
segment.clearHandles();
segment.smooth();
segment.smooth(object);
segment.isFirst();
segment.isLast();
segment.reverse();
segment.reversed();
segment.remove();
segment.toString();
segment.transform(matrix);
segment.interpolate(segment, segment, 0);
//
// Curve
//
new paper_1.default.Curve(segment, segment);
new paper_1.default.Curve(point, point, point, point);
curve.point1;
curve.point2;
curve.handle1;
curve.handle2;
curve.segment1;
curve.segment2;
curve.path;
curve.index;
curve.next;
curve.previous;
curve.selected;
curve.values;
curve.points;
curve.length;
curve.area;
curve.bounds;
curve.strokeBounds;
curve.handleBounds;
curve.clone();
curve.toString();
curve.classify();
curve.remove();
curve.isFirst();
curve.isLast();
curve.getPart(0, 0);
curve.divideAt(curveLocation);
curve.divideAtTime(0);
curve.splitAt(curveLocation);
curve.splitAtTime(0);
curve.reversed();
curve.clearHandles();
curve.hasHandles();
curve.hasLength();
curve.hasLength(0);
curve.isStraight();
curve.isLinear();
curve.isCollinear(curve);
curve.isHorizontal();
curve.isVertical();
curve.getLocationAt(0);
curve.getLocationAtTime(0);
curve.getTimeAt(0);
curve.getTimeAt(0, 0);
curve.getTimesWithTangent(point);
curve.getOffsetAtTime(0);
curve.getLocationOf(point);
curve.getOffsetOf(point);
curve.getTimeOf(point);
curve.getNearestLocation(point);
curve.getNearestPoint(point);
curve.getPointAt(curveLocation);
curve.getTangentAt(curveLocation);
curve.getNormalAt(curveLocation);
curve.getWeightedTangentAt(curveLocation);
curve.getWeightedNormalAt(curveLocation);
curve.getCurvatureAt(curveLocation);
curve.getPointAtTime(0);
curve.getTangentAtTime(0);
curve.getNormalAtTime(0);
curve.getWeightedTangentAtTime(0);
curve.getWeightedNormalAtTime(0);
curve.getCurvatureAtTime(0);
curve.getIntersections(curve);
//
// CurveLocation
//
new paper_1.default.CurveLocation(curve, 0);
new paper_1.default.CurveLocation(curve, 0, point);
curveLocation.segment;
curveLocation.curve;
curveLocation.path;
curveLocation.index;
curveLocation.time;
curveLocation.point;
curveLocation.offset;
curveLocation.curveOffset;
curveLocation.intersection;
curveLocation.tangent;
curveLocation.normal;
curveLocation.curvature;
curveLocation.distance;
curveLocation.equals(curveLocation);
curveLocation.toString();
curveLocation.isTouching();
curveLocation.isCrossing();
curveLocation.hasOverlap();
//
// SymbolDefinition
//
new paper_1.default.SymbolDefinition(item);
new paper_1.default.SymbolDefinition(item, true);
symbolDefinition.project;
symbolDefinition.item;
symbolDefinition.place();
symbolDefinition.place(point);
symbolDefinition.clone();
symbolDefinition.equals(symbolDefinition);
//
// SymbolItem
//
new paper_1.default.SymbolItem(symbolDefinition);
new paper_1.default.SymbolItem(item);
new paper_1.default.SymbolItem(symbolDefinition, point);
symbolItem.definition;
//
// Style
//
new paper_1.default.Style({ strokeColor: 'red' });
style.view;
style.strokeColor;
style.strokeWidth;
style.strokeCap;
style.strokeJoin;
style.strokeScaling;
style.dashOffset;
style.dashArray;
style.miterLimit;
style.fillColor;
style.fillRule;
style.shadowColor;
style.shadowBlur;
style.shadowOffset;
style.selectedColor;
style.fontFamily;
style.fontWeight;
style.fontSize;
style.leading;
style.justification;
//
// Color
//
new paper_1.default.Color(0, 0, 0);
new paper_1.default.Color(0, 0, 0, 0);
new paper_1.default.Color(0);
new paper_1.default.Color(0, 0);
new paper_1.default.Color(object);
new paper_1.default.Color('');
new paper_1.default.Color(gradient, point, point);
new paper_1.default.Color(gradient, point, point, point);
color.type;
color.components;
color.alpha;
color.red;
color.green;
color.blue;
color.gray;
color.hue;
color.saturation;
color.brightness;
color.lightness;
color.gradient;
color.highlight;
color.set(0, 0, 0);
color.set(0, 0, 0, 0);
color.set(0);
color.set(0, 0);
color.set(object);
color.set(color);
color.set(gradient, point, point);
color.set(gradient, point, point, point);
color.convert('');
color.hasAlpha();
color.equals(color);
color.clone();
color.toString();
color.toCSS(true);
color.transform(matrix);
color.add(0);
color.add(color);
color.subtract(0);
color.subtract(color);
color.multiply(0);
color.multiply(color);
color.divide(0);
color.divide(color);
paper_1.default.Color.random();
//
// Gradient
//
gradient.stops;
gradient.radial;
gradient.clone();
gradient.equals(gradient);
//
// GradientStop
//
new paper_1.default.GradientStop();
new paper_1.default.GradientStop(color);
new paper_1.default.GradientStop(color, 0);
gradientStop.offset;
gradientStop.color;
gradientStop.clone();
//
// TextItem
//
textItem.content;
textItem.fontFamily;
textItem.fontWeight;
textItem.fontSize;
textItem.leading;
textItem.justification;
//
// PointText
//
new paper_1.default.PointText(point);
new paper_1.default.PointText(object);
pointText.point;
//
// View
//
view.autoUpdate;
view.element;
view.pixelRatio;
view.resolution;
view.viewSize;
view.bounds;
view.size;
view.center;
view.zoom;
view.rotation;
view.scaling;
view.matrix;
view.onFrame;
view.onResize;
view.onMouseDown;
view.onMouseDrag;
view.onMouseUp;
view.onClick;
view.onDoubleClick;
view.onMouseMove;
view.onMouseEnter;
view.onMouseLeave;
view.remove();
view.update();
view.requestUpdate();
view.play();
view.pause();
view.isVisible();
view.isInserted();
view.translate(point);
view.rotate(0);
view.rotate(0, point);
view.scale(0);
view.scale(0, point);
view.scale(0, 0);
view.scale(0, 0, point);
view.shear(point);
view.shear(point, point);
view.shear(0, 0);
view.shear(0, 0, point);
view.skew(point);
view.skew(point, point);
view.skew(0, 0);
view.skew(0, 0, point);
view.transform(matrix);
view.projectToView(point);
view.viewToProject(point);
view.getEventPoint(event);
view.on('', callback);
view.on(object);
view.off('', callback);
view.off(object);
view.emit('', event);
view.responds('');
//
// Event
//
event.timeStamp;
event.modifiers;
event.modifiers.shift;
event.preventDefault();
event.stopPropagation();
event.stop();
//
// MouseEvent
//
mouseEvent.type;
mouseEvent.point;
mouseEvent.target;
mouseEvent.currentTarget;
mouseEvent.delta;
mouseEvent.toString();
//
// Tool
//
tool.minDistance;
tool.maxDistance;
tool.fixedDistance;
tool.onMouseDown;
tool.onMouseDrag;
tool.onMouseMove;
tool.onMouseUp;
tool.onKeyDown;
tool.onKeyUp;
tool.activate();
tool.remove();
tool.on('', callback);
tool.on(object);
tool.off('', callback);
tool.off(object);
tool.emit('', event);
tool.responds('');
//
// ToolEvent
//
toolEvent.type;
toolEvent.point;
toolEvent.lastPoint;
toolEvent.downPoint;
toolEvent.middlePoint;
toolEvent.delta;
toolEvent.count;
toolEvent.item;
toolEvent.toString();
//
// Key
//
paper_1.default.Key.modifiers;
paper_1.default.Key.isDown('');
//
// KeyEvent
//
keyEvent.type;
keyEvent.character;
keyEvent.key;
keyEvent.toString();
//
// PaperScope
//
new paper_1.default.PaperScope();
paperScope.version;
paperScope.settings;
paperScope.settings = null;
paperScope.project;
paperScope.projects;
paperScope.view;
paperScope.tool;
paperScope.tools;
paperScope.execute('');
paperScope.execute('', object);
paperScope.install(object);
paperScope.setup('');
paperScope.setup({});
paperScope.setup(size);
paperScope.activate();
paper_1.default.PaperScope.get(0);
new paperScope.Color('');
new paperScope.CompoundPath('');
new paperScope.Curve(segment, segment);
new paperScope.CurveLocation(curve, 0);
new paperScope.Event();
new paperScope.Gradient();
new paperScope.GradientStop();
new paperScope.Group();
new paperScope.HitResult();
new paperScope.Item();
new paperScope.Key();
new paperScope.KeyEvent();
new paperScope.Layer();
new paperScope.Matrix();
new paperScope.MouseEvent();
new paperScope.PaperScript();
new paperScope.Path();
new paperScope.PathItem();
new paperScope.Point(0, 0);
new paperScope.PointText(point);
new paperScope.Project(size);
new paperScope.Raster();
new paperScope.Rectangle(point, size);
new paperScope.Segment();
new paperScope.Shape();
new paperScope.Size(0, 0);
new paperScope.Style(object);
new paperScope.SymbolDefinition(item);
new paperScope.SymbolItem(symbolDefinition);
new paperScope.TextItem();
new paperScope.Tool();
new paperScope.ToolEvent();
new paperScope.Tween(object, object, object, 0);
new paperScope.View();
//
// Global PaperScope instance
//
paper_1.default.version;
paper_1.default.settings;
paper_1.default.project;
paper_1.default.projects;
paper_1.default.view;
paper_1.default.tool;
paper_1.default.tools;
paper_1.default.execute('');
paper_1.default.execute('', object);
paper_1.default.install(object);
paper_1.default.setup('');
paper_1.default.setup({});
paper_1.default.setup(size);
paper_1.default.activate();
//
// PaperScript
//
paper_1.default.PaperScript.compile('');
paper_1.default.PaperScript.compile('', object);
paper_1.default.PaperScript.execute('', paperScope);
paper_1.default.PaperScript.execute('', paperScope, object);
paper_1.default.PaperScript.load();
paper_1.default.PaperScript.load({});
//# sourceMappingURL=typescript-definition-test.js.map
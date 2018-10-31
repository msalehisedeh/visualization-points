/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function VisualizationPoint() { }
/** @type {?} */
VisualizationPoint.prototype.key;
/** @type {?} */
VisualizationPoint.prototype.value;
var VisualizationPointsMaker = /** @class */ (function () {
    function VisualizationPointsMaker() {
        this.points = [];
    }
    /**
     * @param {?} points
     * @param {?} root
     * @return {?}
     */
    VisualizationPointsMaker.prototype.targetKeysFromGeneratedPoints = /**
     * @param {?} points
     * @param {?} root
     * @return {?}
     */
    function (points, root) {
        /** @type {?} */
        var targets = [];
        points.map(function (point) {
            /** @type {?} */
            var path = point.key.split(".");
            /** @type {?} */
            var pItem = root;
            /** @type {?} */
            var foundArray = false;
            path.map(function (key) {
                if (key.length === 0 || pItem instanceof Array) {
                    pItem = undefined;
                    foundArray = true;
                }
                else {
                    pItem = pItem ? pItem[key] : pItem;
                }
            });
            if (!foundArray) {
                targets.push(JSON.parse(JSON.stringify(point)));
            }
        });
        return targets;
    };
    /**
     * @param {?} root
     * @param {?} path
     * @param {?} clear
     * @return {?}
     */
    VisualizationPointsMaker.prototype.generatePoints = /**
     * @param {?} root
     * @param {?} path
     * @param {?} clear
     * @return {?}
     */
    function (root, path, clear) {
        var _this = this;
        if (clear) {
            this.points = [];
        }
        if (root !== null) {
            Object.keys(root).map(function (key) {
                /** @type {?} */
                var innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    _this.points.push({
                        key: innerPath,
                        value: _this.makeWords(innerPath)
                    });
                }
                else if (root[key] instanceof Array) {
                    /** @type {?} */
                    var node = root[key];
                    if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
                        _this.generatePoints(node[0], innerPath, false);
                    }
                    else {
                        _this.points.push({
                            key: innerPath,
                            value: _this.makeWords(innerPath)
                        });
                    }
                }
                else {
                    _this.generatePoints(root[key], innerPath, false);
                }
            });
        }
        return this.points;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    VisualizationPointsMaker.prototype.makeWords = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return name
            .replace(/\./g, ' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    VisualizationPointsMaker.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VisualizationPointsMaker.ctorParameters = function () { return []; };
    return VisualizationPointsMaker;
}());
export { VisualizationPointsMaker };
if (false) {
    /** @type {?} */
    VisualizationPointsMaker.prototype.points;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztJQVd6QztzQkFGdUMsRUFBRTtLQUd4Qzs7Ozs7O0lBRUQsZ0VBQTZCOzs7OztJQUE3QixVQUE4QixNQUFZLEVBQUUsSUFBTzs7UUFDakQsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRW5CLE1BQU0sQ0FBQyxHQUFHLENBQUUsVUFBQyxLQUFLOztZQUNoQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztZQUNqQixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFDLEdBQUc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEtBQUssR0FBRyxTQUFTLENBQUM7b0JBQ2xCLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQ25CO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUNwQzthQUNGLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLElBQUks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WyIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWaXN1YWxpemF0aW9uUG9pbnQge1xyXG4gIGtleTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmdcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIHtcclxuICBwcml2YXRlIHBvaW50czogVmlzdWFsaXphdGlvblBvaW50W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICB0YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHM6YW55W10sIHJvb3Q6e30pIHtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBbXTtcclxuXHJcbiAgICBwb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgIGxldCBwSXRlbSA9IHJvb3Q7XHJcbiAgICAgIGxldCBmb3VuZEFycmF5ID0gZmFsc2U7XHJcblxyXG4gICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHBJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgZm91bmRBcnJheSA9IHRydWU7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZm91bmRBcnJheSkge1xyXG4gICAgICAgIHRhcmdldHMucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBvaW50KSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0YXJnZXRzO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVQb2ludHMocm9vdDoge30sIHBhdGg6IHN0cmluZywgY2xlYXI6IGJvb2xlYW4pIHtcclxuXHJcbiAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmIChyb290ICE9PSBudWxsKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHJvb3QpLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlubmVyUGF0aCA9IChwYXRoLmxlbmd0aCA/IChwYXRoICsgXCIuXCIgKyBrZXkpIDoga2V5KTtcclxuICBcclxuICAgICAgICBpZiAodHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiByb290W2tleV0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5OiBpbm5lclBhdGgsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAocm9vdFtrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290W2tleV07XHJcbiAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgIShub2RlWzBdIGluc3RhbmNlb2YgQXJyYXkpICYmICh0eXBlb2Ygbm9kZVswXSAhPT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVBvaW50cyhub2RlWzBdLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMocm9vdFtrZXldLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLi9nLCcgfiAnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14uLywgKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=
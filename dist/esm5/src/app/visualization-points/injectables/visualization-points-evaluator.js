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
var VisualizationPointsEvaluator = /** @class */ (function () {
    function VisualizationPointsEvaluator() {
    }
    /**
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.pushIfNotContain = /**
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    function (array, entry) {
        /** @type {?} */
        var found = false;
        array.map(function (item) {
            if (item.name.indexOf(entry.name) > -1) {
                found = true;
            }
        });
        if (!found) {
            array.push(entry);
        }
    };
    /**
     * @param {?} list
     * @param {?} item
     * @param {?} node
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @param {?} displayData
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.pushInList = /**
     * @param {?} list
     * @param {?} item
     * @param {?} node
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @param {?} displayData
     * @return {?}
     */
    function (list, item, node, allowduplicates, groupduplicates, displayData) {
        var _this = this;
        /** @type {?} */
        var found = undefined;
        item = item instanceof Array ? item.join("") : item;
        if (typeof item === "string") {
            item = item.trim().length ? item : "BLANK";
        }
        else if (typeof item === "boolean") {
            item = item ? "true" : "false";
        }
        else {
            item = item === null ? "NULL" : item;
        }
        list.map(function (subItem) {
            if (subItem.name === item) {
                found = subItem;
                _this.pushIfNotContain(subItem.children, displayData);
            }
        });
        if (item !== null) {
            if (!found) {
                list.push({ name: item, data: node, children: [displayData] });
            }
            else {
                if (groupduplicates) {
                    found.children.push(displayData);
                }
                else if (allowduplicates) {
                    list.push({ name: item, data: node, children: [displayData] });
                }
            }
        }
    };
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.eveluate = /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    function (pItem, path) {
        var _this = this;
        var _loop_1 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
                var list_1 = [];
                pItem.map(function (item) {
                    list_1.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_1;
                return "break";
            }
        };
        for (var i = 0; i < path.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        return pItem;
    };
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.eveluatedNode = /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    function (pItem, path) {
        var _this = this;
        var _loop_2 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
                var list_2 = [];
                pItem.map(function (item) {
                    list_2.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_2;
                return "break";
            }
        };
        for (var i = 0; i < path.length - 1; i++) {
            var state_2 = _loop_2(i);
            if (state_2 === "break")
                break;
        }
        return pItem;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.makeWords = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.evaluatePoints = /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @return {?}
     */
    function (data, pickPoints, primarys, allowduplicates, groupduplicates) {
        var _this = this;
        /** @type {?} */
        var innerMap = {};
        pickPoints.map(function (point) {
            innerMap[point.value] = [];
        });
        data.map(function (item) {
            /** @type {?} */
            var displayData = [];
            primarys.map(function (point) {
                /** @type {?} */
                var path = point.key.split(".");
                /** @type {?} */
                var pItem = item;
                path.map(function (key) {
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map(function (point) {
                    /** @type {?} */
                    var path = point.key.split(".");
                    /** @type {?} */
                    var list = innerMap[point.value];
                    /** @type {?} */
                    var pItem = _this.eveluate(item, path);
                    /** @type {?} */
                    var nodes = _this.eveluatedNode(item, path);
                    /** @type {?} */
                    var found = false;
                    if (pItem instanceof Array) {
                        pItem.map(function (p, index) {
                            _this.pushInList(list, p, nodes[index], allowduplicates, groupduplicates, { name: displayData });
                        });
                    }
                    else {
                        _this.pushInList(list, pItem, nodes, allowduplicates, groupduplicates, { name: displayData });
                    }
                });
            }
        });
        /** @type {?} */
        var rootList = [];
        Object.keys(innerMap).map(function (key) {
            rootList.push({
                name: _this.makeWords(key),
                children: innerMap[key]
            });
        });
        return {
            name: "/",
            children: rootList
        };
    };
    VisualizationPointsEvaluator.decorators = [
        { type: Injectable }
    ];
    return VisualizationPointsEvaluator;
}());
export { VisualizationPointsEvaluator };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBS2pDLHVEQUFnQjs7Ozs7Y0FBQyxLQUFLLEVBQUUsS0FBSzs7UUFDbkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxJQUFJO1lBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNkO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjs7Ozs7Ozs7Ozs7SUFHSyxpREFBVTs7Ozs7Ozs7O2NBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxXQUFXOzs7UUFDaEYsSUFBSSxLQUFLLEdBQVEsU0FBUyxDQUFDO1FBRTNCLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3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LGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O29CQUNsRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBRWxCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUMzQixLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsQ0FBQyxFQUFFLEtBQUs7NEJBQ2xCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO3lCQUMvRixDQUFDLENBQUM7cUJBQ0o7b0JBQUEsSUFBSSxDQUFDLENBQUM7d0JBQ0wsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7cUJBQzVGO2lCQUNGLENBQUMsQ0FBQzthQUNKO1NBQ0YsQ0FBQyxDQUFDOztRQUVILElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFDLEdBQUc7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxHQUFHO1lBQ1QsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztLQUNIOztnQkF0SUYsVUFBVTs7dUNBVFg7O1NBVWEsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIHtcclxuICBwcml2YXRlIHB1c2hJZk5vdENvbnRhaW4oYXJyYXksIGVudHJ5KSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZS5pbmRleE9mKGVudHJ5Lm5hbWUpID4gLTEpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBhcnJheS5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaEluTGlzdChsaXN0LCBpdGVtLCBub2RlLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywgZGlzcGxheURhdGEpIHtcclxuICAgIGxldCBmb3VuZDogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGl0ZW0gPSBpdGVtIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtLmpvaW4oXCJcIikgOiBpdGVtO1xyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtLnRyaW0oKS5sZW5ndGggPyBpdGVtIDogXCJCTEFOS1wiO1xyXG4gICAgfWVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICBpdGVtID0gaXRlbT8gXCJ0cnVlXCI6XCJmYWxzZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbSA9IGl0ZW0gPT09IG51bGwgPyBcIk5VTExcIiA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdC5tYXAoIChzdWJJdGVtOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHN1Ykl0ZW0ubmFtZSA9PT0gaXRlbSkge1xyXG4gICAgICAgIGZvdW5kID0gc3ViSXRlbTtcclxuICAgICAgICB0aGlzLnB1c2hJZk5vdENvbnRhaW4oc3ViSXRlbS5jaGlsZHJlbiwgZGlzcGxheURhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICggaXRlbSAhPT0gbnVsbCApIHtcclxuICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChncm91cGR1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGZvdW5kLmNoaWxkcmVuLnB1c2goZGlzcGxheURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dkdXBsaWNhdGVzKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBpdGVtLCBkYXRhOiBub2RlLCBjaGlsZHJlbjogW2Rpc3BsYXlEYXRhXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbHVhdGUoIHBJdGVtOmFueSwgcGF0aDogYW55W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgZXZlbHVhdGVkTm9kZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi4vLCAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZVBvaW50cyhkYXRhOiBhbnlbXSwgcGlja1BvaW50czogYW55W10sIHByaW1hcnlzOiBhbnlbXSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMpIHtcclxuXHJcbiAgICBjb25zdCBpbm5lck1hcCA9IHt9O1xyXG5cclxuICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgaW5uZXJNYXBbcG9pbnQudmFsdWVdID0gW107XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGRpc3BsYXlEYXRhOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgIHByaW1hcnlzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHBJdGVtID0gaXRlbTtcclxuXHJcbiAgICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IChwSXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogcEl0ZW0pO1xyXG4gICAgICAgIGRpc3BsYXlEYXRhLnB1c2goU3RyaW5nKHBJdGVtKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5RGF0YSA9IGRpc3BsYXlEYXRhLmxlbmd0aCA/IGRpc3BsYXlEYXRhLmpvaW4oXCIsIFwiKSA6IHVuZGVmaW5lZDsgICAgICBcclxuXHJcbiAgICAgIGlmIChkaXNwbGF5RGF0YSkge1xyXG4gICAgICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGlubmVyTWFwW3BvaW50LnZhbHVlXTtcclxuICAgICAgICAgIGNvbnN0IHBJdGVtOiBhbnkgPSB0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgY29uc3Qgbm9kZXM6IGFueSA9IHRoaXMuZXZlbHVhdGVkTm9kZShpdGVtLCBwYXRoKTtcclxuICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcEl0ZW0ubWFwKCAocCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcCwgbm9kZXNbaW5kZXhdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcEl0ZW0sIG5vZGVzLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJvb3RMaXN0ID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhpbm5lck1hcCkubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgIHJvb3RMaXN0LnB1c2goe1xyXG4gICAgICAgIG5hbWU6IHRoaXMubWFrZVdvcmRzKGtleSksXHJcbiAgICAgICAgY2hpbGRyZW46IGlubmVyTWFwW2tleV1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCIvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiByb290TGlzdFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19
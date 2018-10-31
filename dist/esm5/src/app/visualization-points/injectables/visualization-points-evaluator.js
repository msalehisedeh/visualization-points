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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLWV2YWx1YXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7SUFLakMsdURBQWdCOzs7OztjQUFDLEtBQUssRUFBRSxLQUFLOztRQUNuQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUk7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7U0FDRixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25COzs7Ozs7Ozs7OztJQUdLLGlEQUFVOzs7Ozs7Ozs7Y0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFdBQVc7OztRQUNoRixJQUFJLEtBQUssR0FBUSxTQUFTLENBQUM7UUFFM0IsSUFBSSxHQUFHLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUks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QUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7b0JBQ2xELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFFbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzNCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxDQUFDLEVBQUUsS0FBSzs0QkFDbEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7eUJBQy9GLENBQUMsQ0FBQztxQkFDSjtvQkFBQSxJQUFJLENBQUMsQ0FBQzt3QkFDTCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztxQkFDNUY7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7O1FBRUgsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRztZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDekIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDO1lBQ0wsSUFBSSxFQUFFLEdBQUc7WUFDVCxRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDO0tBQ0g7O2dCQXRJRixVQUFVOzt1Q0FUWDs7U0FVYSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3Ige1xyXG4gIHByaXZhdGUgcHVzaElmTm90Q29udGFpbihhcnJheSwgZW50cnkpIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lLmluZGV4T2YoZW50cnkubmFtZSkgPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoSW5MaXN0KGxpc3QsIGl0ZW0sIG5vZGUsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCBkaXNwbGF5RGF0YSkge1xyXG4gICAgbGV0IGZvdW5kOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaXRlbSA9IGl0ZW0gaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW0uam9pbihcIlwiKSA6IGl0ZW07XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0udHJpbSgpLmxlbmd0aCA/IGl0ZW0gOiBcIkJMQU5LXCI7XHJcbiAgICB9ZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtPyBcInRydWVcIjpcImZhbHNlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtID0gaXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Lm1hcCggKHN1Ykl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3ViSXRlbS5uYW1lID09PSBpdGVtKSB7XHJcbiAgICAgICAgZm91bmQgPSBzdWJJdGVtO1xyXG4gICAgICAgIHRoaXMucHVzaElmTm90Q29udGFpbihzdWJJdGVtLmNoaWxkcmVuLCBkaXNwbGF5RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBpdGVtICE9PSBudWxsICkge1xyXG4gICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdyb3VwZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgZm91bmQuY2hpbGRyZW4ucHVzaChkaXNwbGF5RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd2R1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVsdWF0ZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBldmVsdWF0ZWROb2RlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlUG9pbnRzKGRhdGE6IGFueVtdLCBwaWNrUG9pbnRzOiBhbnlbXSwgcHJpbWFyeXM6IGFueVtdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcykge1xyXG5cclxuICAgIGNvbnN0IGlubmVyTWFwID0ge307XHJcblxyXG4gICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBpbm5lck1hcFtwb2ludC52YWx1ZV0gPSBbXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgZGlzcGxheURhdGE6IGFueSA9IFtdO1xyXG5cclxuICAgICAgcHJpbWFyeXMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgcEl0ZW0gPSBpdGVtO1xyXG5cclxuICAgICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gKHBJdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBwSXRlbSk7XHJcbiAgICAgICAgZGlzcGxheURhdGEucHVzaChTdHJpbmcocEl0ZW0pKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEubGVuZ3RoID8gZGlzcGxheURhdGEuam9pbihcIiwgXCIpIDogdW5kZWZpbmVkOyAgICAgIFxyXG5cclxuICAgICAgaWYgKGRpc3BsYXlEYXRhKSB7XHJcbiAgICAgICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gaW5uZXJNYXBbcG9pbnQudmFsdWVdO1xyXG4gICAgICAgICAgY29uc3QgcEl0ZW06IGFueSA9IHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBjb25zdCBub2RlczogYW55ID0gdGhpcy5ldmVsdWF0ZWROb2RlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBwSXRlbS5tYXAoIChwLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwLCBub2Rlc1tpbmRleF0sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwSXRlbSwgbm9kZXMsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgcm9vdExpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGlubmVyTWFwKS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgcm9vdExpc3QucHVzaCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5tYWtlV29yZHMoa2V5KSxcclxuICAgICAgICBjaGlsZHJlbjogaW5uZXJNYXBba2V5XVxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIi9cIixcclxuICAgICAgY2hpbGRyZW46IHJvb3RMaXN0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=
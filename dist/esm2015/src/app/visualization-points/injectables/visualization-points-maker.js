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
export class VisualizationPointsMaker {
    constructor() {
        this.points = [];
    }
    /**
     * @param {?} points
     * @param {?} root
     * @return {?}
     */
    targetKeysFromGeneratedPoints(points, root) {
        /** @type {?} */
        const targets = [];
        points.map((point) => {
            /** @type {?} */
            const path = point.key.split(".");
            /** @type {?} */
            let pItem = root;
            /** @type {?} */
            let foundArray = false;
            path.map((key) => {
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
    }
    /**
     * @param {?} root
     * @param {?} path
     * @param {?} clear
     * @return {?}
     */
    generatePoints(root, path, clear) {
        if (clear) {
            this.points = [];
        }
        if (root !== null) {
            Object.keys(root).map((key) => {
                /** @type {?} */
                const innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    this.points.push({
                        key: innerPath,
                        value: this.makeWords(innerPath)
                    });
                }
                else if (root[key] instanceof Array) {
                    /** @type {?} */
                    const node = root[key];
                    if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
                        this.generatePoints(node[0], innerPath, false);
                    }
                    else {
                        this.points.push({
                            key: innerPath,
                            value: this.makeWords(innerPath)
                        });
                    }
                }
                else {
                    this.generatePoints(root[key], innerPath, false);
                }
            });
        }
        return this.points;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    makeWords(name) {
        return name
            .replace(/\./g, ' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    }
}
VisualizationPointsMaker.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VisualizationPointsMaker.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    VisualizationPointsMaker.prototype.points;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0FBUTNDLE1BQU07SUFHSjtzQkFGdUMsRUFBRTtLQUd4Qzs7Ozs7O0lBRUQsNkJBQTZCLENBQUMsTUFBWSxFQUFFLElBQU87O1FBQ2pELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVuQixNQUFNLENBQUMsR0FBRyxDQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQ3BCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O1lBQ2pCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLEdBQUcsU0FBUyxDQUFDO29CQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUNuQjtnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDcEM7YUFDRixDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JB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dHJhdmVyc2UgdGhyb3VnaCBhIGdpdmVuIGpzb24gb2JqZWN0IGFuZCBmaW5kcyBhbGwgdGhlIGF0dHJpYnV0ZXMgb2YgXHJcbiAqIHRoZSBvYmplY3QgYW5kIGl0cyByZWxhdGVkIGFzc29jaWF0aW9ucyB3aXRoaW4gdGhlIGpzb24uIFRoZSByZXN1bHRpbmcgc3RydWN0dXJlIHdvdWxkIGJlIFxyXG4gKiBuYW1lIG9mIGF0dHJpYnV0ZXMgYW5kIGEgcGF0aHdheSB0byByZWFjaCB0aGUgYXR0cmlidXRlIGRlZXAgaW4gb2JqZWN0IGhlaXJhcmNoeS5cclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZpc3VhbGl6YXRpb25Qb2ludCB7XHJcbiAga2V5OiBzdHJpbmcsXHJcbiAgdmFsdWU6IHN0cmluZ1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIge1xyXG4gIHByaXZhdGUgcG9pbnRzOiBWaXN1YWxpemF0aW9uUG9pbnRbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIHRhcmdldEtleXNGcm9tR2VuZXJhdGVkUG9pbnRzKHBvaW50czphbnlbXSwgcm9vdDp7fSkge1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9IFtdO1xyXG5cclxuICAgIHBvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgbGV0IHBJdGVtID0gcm9vdDtcclxuICAgICAgbGV0IGZvdW5kQXJyYXkgPSBmYWxzZTtcclxuXHJcbiAgICAgIHBhdGgubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgICAgaWYgKGtleS5sZW5ndGggPT09IDAgfHwgcEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgcEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBmb3VuZEFycmF5ID0gdHJ1ZTsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtrZXldIDogcEl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmb3VuZEFycmF5KSB7XHJcbiAgICAgICAgdGFyZ2V0cy5wdXNoKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocG9pbnQpKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRhcmdldHM7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVBvaW50cyhyb290OiB7fSwgcGF0aDogc3RyaW5nLCBjbGVhcjogYm9vbGVhbikge1xyXG5cclxuICAgIGlmIChjbGVhcikge1xyXG4gICAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHJvb3QgIT09IG51bGwpIHtcclxuICAgICAgT2JqZWN0LmtleXMocm9vdCkubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5uZXJQYXRoID0gKHBhdGgubGVuZ3RoID8gKHBhdGggKyBcIi5cIiArIGtleSkgOiBrZXkpO1xyXG4gIFxyXG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdFtrZXldID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiByb290W2tleV0gPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBrZXk6IGlubmVyUGF0aCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMubWFrZVdvcmRzKGlubmVyUGF0aClcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmIChyb290W2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgY29uc3Qgbm9kZSA9IHJvb3Rba2V5XTtcclxuICAgICAgICAgIGlmIChub2RlLmxlbmd0aCAmJiAhKG5vZGVbMF0gaW5zdGFuY2VvZiBBcnJheSkgJiYgKHR5cGVvZiBub2RlWzBdICE9PSBcInN0cmluZ1wiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlUG9pbnRzKG5vZGVbMF0sIGlubmVyUGF0aCwgZmFsc2UpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgICAga2V5OiBpbm5lclBhdGgsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IHRoaXMubWFrZVdvcmRzKGlubmVyUGF0aClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5nZW5lcmF0ZVBvaW50cyhyb290W2tleV0sIGlubmVyUGF0aCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5wb2ludHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ha2VXb3JkcyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwuL2csJyB+ICcpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi4vLCAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
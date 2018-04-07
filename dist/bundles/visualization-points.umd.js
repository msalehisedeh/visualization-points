(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['visualization-points'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */






function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
/**
 * @record
 */
var VisualizationPointsMaker = (function () {
    function VisualizationPointsMaker() {
        this.points = [];
    }
    /**
     * @param {?} root
     * @param {?} path
     * @param {?} clear
     * @return {?}
     */
    VisualizationPointsMaker.prototype.generatePoints = function (root, path, clear) {
        var _this = this;
        if (clear) {
            this.points = [];
        }
        Object.keys(root).map(function (key) {
            var /** @type {?} */ innerPath = (path.length ? (path + "." + key) : key);
            if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                _this.points.push({
                    key: innerPath,
                    value: innerPath.replace(/\./g, ' ')
                });
            }
            else if (root[key] instanceof Array) {
                var /** @type {?} */ node = root[key];
                if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
                    _this.generatePoints(node[0], innerPath, false);
                }
                else {
                    _this.points.push({
                        key: innerPath,
                        value: innerPath.replace(/\./g, ' ')
                    });
                }
            }
            else {
                _this.generatePoints(root[key], innerPath, false);
            }
        });
        return this.points;
    };
    return VisualizationPointsMaker;
}());
VisualizationPointsMaker.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
VisualizationPointsMaker.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
var VisualizationPointsEvaluator = (function () {
    function VisualizationPointsEvaluator() {
    }
    /**
     * @param {?} list
     * @param {?} item
     * @param {?} displayData
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.pushInList = function (list, item, displayData) {
        var /** @type {?} */ found = false;
        list.map(function (subItem) {
            if (subItem.name === item) {
                found = true;
                subItem.children.push(displayData);
            }
        });
        if (!found) {
            list.push({
                name: item,
                children: [displayData]
            });
        }
    };
    /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.evaluatePoints = function (data, pickPoints, primarys) {
        var _this = this;
        var /** @type {?} */ innerMap = {};
        pickPoints.map(function (point) {
            innerMap[point.value] = [];
        });
        data.map(function (item) {
            var /** @type {?} */ displayData = [];
            primarys.map(function (point) {
                var /** @type {?} */ path = point.key.split(".");
                var /** @type {?} */ pItem = item;
                path.map(function (key) {
                    pItem = pItem[key];
                });
                displayData.push(pItem);
            });
            displayData = displayData.join(", ");
            pickPoints.map(function (point) {
                var /** @type {?} */ path = point.key.split(".");
                var /** @type {?} */ list = innerMap[point.value];
                var /** @type {?} */ pItem = item;
                path.map(function (key) {
                    pItem = pItem[key];
                });
                if (pItem instanceof Array) {
                    pItem.map(function (p) {
                        _this.pushInList(list, p, { name: displayData });
                    });
                }
                else if (pItem) {
                    _this.pushInList(list, pItem, { name: displayData });
                }
                else {
                    list.push({ name: displayData });
                }
            });
        });
        var /** @type {?} */ rootList = [];
        Object.keys(innerMap).map(function (key) {
            rootList.push({
                name: key,
                children: innerMap[key]
            });
        });
        return {
            name: "/",
            children: rootList
        };
    };
    return VisualizationPointsEvaluator;
}());
VisualizationPointsEvaluator.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
VisualizationPointsEvaluator.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VisualizationPointsComponent = (function () {
    /**
     * @param {?} pointMaker
     * @param {?} evaluator
     */
    function VisualizationPointsComponent(pointMaker, evaluator) {
        this.pointMaker = pointMaker;
        this.evaluator = evaluator;
        this.evaluatedPoints = {};
        this.interestingPoints = [];
        this.targetKeys = [];
        this.onVisualization = new core.EventEmitter();
    }
    /**
     * @param {?} points
     * @return {?}
     */
    VisualizationPointsComponent.prototype.sizeUp = function (points) {
        var _this = this;
        var /** @type {?} */ size = (points.children && points.children.length) ? points.children.length : undefined;
        if (size) {
            points.name += points.children.length > 1 ? " (" + size + ")" : "";
            points.children.map(function (p) {
                _this.sizeUp(p);
            });
            this.displayHeight += size;
        }
        return points;
    };
    /**
     * @param {?} points
     * @param {?} primaries
     * @return {?}
     */
    VisualizationPointsComponent.prototype.triggerEvaluation = function (points, primaries) {
        if (points.length && primaries.length) {
            this.d3Container.nativeElement.innerHTML = "";
            this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries);
            this.displayHeight = 0;
            var /** @type {?} */ sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
            this.displayHeight = this.displayHeight * 22;
            window['initiateD3'](sizedupPoints, "#d3-container", this.displayHeight);
            this.onVisualization.emit(this.evaluatedPoints);
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
        }
    };
    /**
     * @param {?} chages
     * @return {?}
     */
    VisualizationPointsComponent.prototype.ngOnChanges = function (chages) {
        if (chages.data) {
            this.interestingPoints = undefined;
            this.targetKeys = undefined;
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    };
    /**
     * @return {?}
     */
    VisualizationPointsComponent.prototype.ngOnInit = function () {
        if (this.data.length && this.enableConfiguration) {
            var /** @type {?} */ root = (this.data instanceof Array) ? this.data[0] : this.data;
            var /** @type {?} */ points = this.pointMaker.generatePoints(root, "", true);
            this.interestingPoints = points;
            this.targetKeys = JSON.parse(JSON.stringify(points));
        }
        this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
    };
    /**
     * @return {?}
     */
    VisualizationPointsComponent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadScript("assets/d3.js", 'd3js')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} url
     * @param {?} id
     * @return {?}
     */
    VisualizationPointsComponent.prototype.loadScript = function (url, id) {
        return new Promise(function (resolve, reject) {
            var /** @type {?} */ script = document.getElementById(id);
            if (!script) {
                var /** @type {?} */ scriptElement = document.createElement('script');
                scriptElement.src = url;
                scriptElement.id = id;
                scriptElement.onload = resolve;
                document.body.appendChild(scriptElement);
            }
        });
    };
    /**
     * @param {?} list
     * @return {?}
     */
    VisualizationPointsComponent.prototype.sanitize = function (list) {
        var /** @type {?} */ sanitizedPoints = [];
        if (!list || list.length) {
            list.map(function (point) {
                if (point.selected) {
                    sanitizedPoints.push({
                        key: point.key,
                        value: point.value
                    });
                }
            });
        }
        return sanitizedPoints;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    VisualizationPointsComponent.prototype.onchange = function (event) {
        this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
    };
    return VisualizationPointsComponent;
}());
VisualizationPointsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'visualization-points',
                template: "\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\n    <visualization-configuration\n        [interestingPoints]=\"interestingPoints\"\n        [targetKeys]=\"targetKeys\"\n        (onchange)=\"onchange($event)\"></visualization-configuration>\n</div>\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\n",
                styles: [":host{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n  display:table;\n  position:relative;\n  width:100%; }\n  :host #d3-container{\n    border:1px solid #ddd;\n    padding:5px;\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border-radius:5px;\n    background-color:#fefefe; }\n  :host ::ng-deep .node circle{\n    cursor:pointer;\n    fill:#fff;\n    stroke:steelblue;\n    stroke-width:1.5px; }\n  :host ::ng-deep .node text{\n    font-size:11px;\n    font-weight:bold; }\n  :host ::ng-deep path.link{\n    fill:none;\n    stroke:#ccc;\n    stroke-width:1.5px; }\n"],
            },] },
];
/** @nocollapse */
VisualizationPointsComponent.ctorParameters = function () { return [
    { type: VisualizationPointsMaker, },
    { type: VisualizationPointsEvaluator, },
]; };
VisualizationPointsComponent.propDecorators = {
    "interestingPoints": [{ type: core.Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: core.Input, args: ["targetKeys",] },],
    "data": [{ type: core.Input, args: ["data",] },],
    "enableConfiguration": [{ type: core.Input, args: ["enableConfiguration",] },],
    "onVisualization": [{ type: core.Output, args: ["onVisualization",] },],
    "d3Container": [{ type: core.ViewChild, args: ["d3Container",] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VisualizationConfigurationComponent = (function () {
    /**
     * @param {?} renderer
     */
    function VisualizationConfigurationComponent(renderer) {
        this.renderer = renderer;
        this.interestingPoints = [];
        this.targetKeys = [];
        this.onchange = new core.EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.keyup = function (event) {
        var /** @type {?} */ code = event.which;
        if (code === 13) {
            this.renderer.invokeElementMethod(event.target, "click");
        }
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.click = function (event, item) {
        var /** @type {?} */ input = event.target;
        item.selected = (input.checked);
        this.onchange.emit({
            points: this.interestingPoints,
            keys: this.targetKeys
        });
    };
    return VisualizationConfigurationComponent;
}());
VisualizationConfigurationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'visualization-configuration',
                template: "<p class=\"info\">\n    <span>\n        Pick points are the attributes in which you want to evaluate.\n        Target keys are the attributes in which evaluated data will be presented on.\n    </span>\n    <span>\n        For example: if you are examining users and pick user age and city as pick points,\n        data will be evaluated on city and age. And if you pick user name and gender as target keys,\n        for each age and city reference, you will see the resulting data as name and age values.</span>\n</p>\n<fieldset class=\"pick-points\">\n    <legend>Pick Points:</legend>\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\n        <input\n            type=\"checkbox\"\n            name=\"pickpoint\"\n            [id]=\"'pickpoint' + i\"\n            [value]=\"x.value\"\n            [checked]=\"x.selected ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, x)\" />\n        <span [textContent]=\"x.value\"></span>\n    </label>\n</fieldset>\n<fieldset class=\"pick-points\">\n    <legend>Target Keys:</legend>\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\n        <input\n            type=\"checkbox\"\n            name=\"targetKey\"\n            [id]=\"'targetKey' + i\"\n            [value]=\"x.value\"\n            [checked]=\"x.selected ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, x)\" />\n        <span [textContent]=\"x.value\"></span>\n    </label>\n</fieldset>",
                styles: [":host{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n  display:table;\n  padding:5px; }\n  :host .info{\n    padding:5px;\n    margin:5px; }\n  :host .pick-points{\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border:1px solid #444;\n    display:block;\n    float:left;\n    padding:0;\n    width:49%; }\n    :host .pick-points label{\n      padding:2px 0;\n      display:inline-table;\n      width:33%; }\n      :host .pick-points label:hover{\n        color:#933; }\n"],
            },] },
];
/** @nocollapse */
VisualizationConfigurationComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
]; };
VisualizationConfigurationComponent.propDecorators = {
    "interestingPoints": [{ type: core.Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: core.Input, args: ["targetKeys",] },],
    "onchange": [{ type: core.Output, args: ["onchange",] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var VisualizationPointsModule = (function () {
    function VisualizationPointsModule() {
    }
    return VisualizationPointsModule;
}());
VisualizationPointsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                declarations: [
                    VisualizationPointsComponent,
                    VisualizationConfigurationComponent,
                ],
                exports: [
                    VisualizationPointsComponent,
                    VisualizationConfigurationComponent,
                ],
                entryComponents: [
                    VisualizationPointsComponent,
                    VisualizationConfigurationComponent
                ],
                providers: [
                    VisualizationPointsMaker,
                    VisualizationPointsEvaluator
                ],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
VisualizationPointsModule.ctorParameters = function () { return []; };

exports.VisualizationPointsComponent = VisualizationPointsComponent;
exports.VisualizationConfigurationComponent = VisualizationConfigurationComponent;
exports.VisualizationPointsModule = VisualizationPointsModule;
exports.ɵb = VisualizationPointsEvaluator;
exports.ɵa = VisualizationPointsMaker;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=visualization-points.umd.js.map

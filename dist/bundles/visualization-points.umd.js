(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('visualization-points', ['exports', '@angular/core', '@angular/common'], factory) :
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
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [0, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizationPointsMaker = (function () {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        VisualizationPointsMaker.ctorParameters = function () { return []; };
        return VisualizationPointsMaker;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizationPointsEvaluator = (function () {
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
            { type: core.Injectable }
        ];
        return VisualizationPointsEvaluator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizationPointsComponent = (function () {
        function VisualizationPointsComponent(pointMaker, evaluator) {
            this.pointMaker = pointMaker;
            this.evaluator = evaluator;
            this.evaluatedPoints = {};
            this.interestingPoints = [];
            this.targetKeys = [];
            this.allowduplicates = false;
            this.groupduplicates = false;
            this.settings = {
                tooltipEnabled: false,
                directionality: "L2R",
                nodeType: "Plain",
                targetDiv: "#d3-container",
                styles: {
                    links: {
                        "default-line-color": "gray",
                        "default-size": 1,
                        "hover-line-color": "blue",
                        "hover-line-dasharray": "5,5",
                        "hover-size": 3,
                        "selected-line-color": "red",
                        "selected-size": 1
                    },
                    nodes: {
                        "default-background-color": "white",
                        "default-line-color": "black",
                        "default-size": 1,
                        "hover-background-color": "lightblue",
                        "hover-line-color": "#fcb2b2",
                        "hover-line-dasharray": "5,10,5",
                        "hover-size": 1.1,
                        "selected-background-color": "orange",
                        "selected-line-color": "red",
                        "selected-size": 1
                    }
                }
            };
            this.onVisualization = new core.EventEmitter();
        }
        /**
         * @param {?} points
         * @return {?}
         */
        VisualizationPointsComponent.prototype.sizeUp = /**
         * @param {?} points
         * @return {?}
         */
            function (points) {
                var _this = this;
                /** @type {?} */
                var size = (points.children && points.children.length) ? points.children.length : undefined;
                if (size) {
                    points.name += points.children.length > 1 ? " (" + size + ")" : "";
                    points.children.map(function (p) {
                        _this.sizeUp(p);
                    });
                }
                return points;
            };
        /**
         * @param {?} points
         * @param {?} primaries
         * @return {?}
         */
        VisualizationPointsComponent.prototype.triggerEvaluation = /**
         * @param {?} points
         * @param {?} primaries
         * @return {?}
         */
            function (points, primaries) {
                if (points.length && primaries.length) {
                    this.d3Container.nativeElement.innerHTML = "";
                    this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries, this.allowduplicates, this.groupduplicates);
                    /** @type {?} */
                    var sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
                    window['initiateD3'](sizedupPoints, this.settings);
                    this.onVisualization.emit(this.evaluatedPoints);
                }
                else {
                    this.d3Container.nativeElement.innerHTML = "";
                    this.onVisualization.emit([]);
                }
            };
        /**
         * @param {?} originalNode
         * @param {?} refrenceAttribute
         * @return {?}
         */
        VisualizationPointsComponent.prototype.updateNodeDataRefrence = /**
         * @param {?} originalNode
         * @param {?} refrenceAttribute
         * @return {?}
         */
            function (originalNode, refrenceAttribute) {
                window['updateNodeDataRefrence'](originalNode, refrenceAttribute);
            };
        /**
         * @return {?}
         */
        VisualizationPointsComponent.prototype.startBlinking = /**
         * @return {?}
         */
            function () {
                window['startBlinking'](this.settings);
            };
        /**
         * @return {?}
         */
        VisualizationPointsComponent.prototype.stopBlinking = /**
         * @return {?}
         */
            function () {
                window['stopBlinking']();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        VisualizationPointsComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.data) {
                    this.interestingPoints = undefined;
                    this.targetKeys = undefined;
                    setTimeout(this.ngOnInit.bind(this), 333);
                }
            };
        /**
         * @param {?} array
         * @return {?}
         */
        VisualizationPointsComponent.prototype.findReferenceStructureFrom = /**
         * @param {?} array
         * @return {?}
         */
            function (array) {
                /** @type {?} */
                var result;
                /** @type {?} */
                var maxSize = 0;
                array.map(function (item) {
                    /** @type {?} */
                    var x = item ? Object.keys(item).length : 0;
                    if (x > maxSize) {
                        maxSize = x;
                        result = item;
                    }
                });
                return result;
            };
        /**
         * @return {?}
         */
        VisualizationPointsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (!(this.data instanceof Array)) {
                    this.data = [this.data];
                }
                if (this.data.length && this.enableConfiguration) {
                    /** @type {?} */
                    var root = this.findReferenceStructureFrom(this.data);
                    /** @type {?} */
                    var points = this.pointMaker.generatePoints(root, "", true);
                    this.interestingPoints = points;
                    this.targetKeys = this.pointMaker.targetKeysFromGeneratedPoints(points, root);
                }
                this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
            };
        /**
         * @return {?}
         */
        VisualizationPointsComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!window['initiateD3'])
                                    return [3 /*break*/, 2];
                                return [4 /*yield*/, this.loadScript("assets/d3.js", 'd3js')];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            };
        /**
         * @param {?} url
         * @param {?} id
         * @return {?}
         */
        VisualizationPointsComponent.prototype.loadScript = /**
         * @param {?} url
         * @param {?} id
         * @return {?}
         */
            function (url, id) {
                return new Promise(function (resolve, reject) {
                    /** @type {?} */
                    var scriptElement = document.createElement('script');
                    scriptElement.type = "text/javascript";
                    scriptElement.src = url;
                    // scriptElement.id = id;
                    scriptElement.onload = resolve;
                    document.body.appendChild(scriptElement);
                    // }
                });
            };
        /**
         * @param {?} list
         * @return {?}
         */
        VisualizationPointsComponent.prototype.sanitize = /**
         * @param {?} list
         * @return {?}
         */
            function (list) {
                /** @type {?} */
                var sanitizedPoints = [];
                if (list && list.length) {
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
        VisualizationPointsComponent.prototype.onchange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.allowduplicates = event.allowduplicates;
                this.groupduplicates = event.groupduplicates;
                this.settings = event.configuration;
                this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
            };
        VisualizationPointsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'visualization-points',
                        template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
                        styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
                    }] }
        ];
        /** @nocollapse */
        VisualizationPointsComponent.ctorParameters = function () {
            return [
                { type: VisualizationPointsMaker },
                { type: VisualizationPointsEvaluator }
            ];
        };
        VisualizationPointsComponent.propDecorators = {
            interestingPoints: [{ type: core.Input, args: ["interestingPoints",] }],
            targetKeys: [{ type: core.Input, args: ["targetKeys",] }],
            data: [{ type: core.Input, args: ["data",] }],
            allowduplicates: [{ type: core.Input, args: ["allowduplicates",] }],
            groupduplicates: [{ type: core.Input, args: ["groupduplicates",] }],
            settings: [{ type: core.Input, args: ["settings",] }],
            enableConfiguration: [{ type: core.Input, args: ["enableConfiguration",] }],
            onVisualization: [{ type: core.Output, args: ["onVisualization",] }],
            d3Container: [{ type: core.ViewChild, args: ["d3Container",] }]
        };
        return VisualizationPointsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizationConfigurationComponent = (function () {
        function VisualizationConfigurationComponent(renderer) {
            this.renderer = renderer;
            this.interestingPoints = [];
            this.targetKeys = [];
            this.allowduplicates = false;
            this.configuration = {
                tooltipEnabled: false,
                directionality: "L2R",
                nodeType: "Plain",
                targetDiv: "#d3-container",
                blinkAttributesWatch: [],
                styles: {
                    links: {
                        "default-line-color": "gray",
                        "default-size": 1,
                        "hover-line-color": "#fcb2b2",
                        "hover-line-dasharray": "5,5",
                        "hover-size": 1.1,
                        "selected-line-color": "red",
                        "selected-size": 1
                    },
                    nodes: {
                        "default-background-color": "white",
                        "default-line-color": "gray",
                        "default-size": 1,
                        "hover-background-color": "lightblue",
                        "hover-line-color": "#fcb2b2",
                        "hover-line-dasharray": "5,10,5",
                        "hover-size": 1.1,
                        "selected-background-color": "orange",
                        "selected-line-color": "red",
                        "selected-size": 1
                    }
                }
            };
            this.groupduplicates = false;
            this.onchange = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.keyup = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var code = event.which;
                if (code === 13) {
                    this.renderer.invokeElementMethod(event.target, "click");
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.chaneDirectionality = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.configuration.directionality = event.target.value;
                this.emitChange();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.changeNodeType = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.configuration.nodeType = event.target.value;
                this.emitChange();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.changeColorSets = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.target.value == 1) {
                    this.configuration.styles.links = {
                        "hover-line-dasharray": "5,10,5",
                        "default-size": 1,
                        "hover-size": 3,
                        "selected-size": 1,
                        "default-line-color": "lightsteelblue",
                        "hover-line-color": "#fcb2b2",
                        "selected-line-color": "red"
                    };
                    this.configuration.styles.nodes = {
                        "default-background-color": "white",
                        "hover-background-color": "#fcb2b2",
                        "hover-line-dasharray": "5,5",
                        "selected-background-color": "lightsteelblue",
                        "default-size": 1,
                        "hover-size": 1.5,
                        "selected-size": 1.3,
                        "default-line-color": "blue",
                        "hover-line-color": "black",
                        "selected-line-color": "red",
                        "default-label-color": "black",
                        "hover-label-color": "blue",
                        "selected-label-color": "red"
                    };
                }
                else {
                    this.configuration.styles.links = {
                        "default-line-dasharray": "5,10,5",
                        "default-size": 1.2,
                        "hover-size": 2.2,
                        "selected-size": 1.3,
                        "default-line-color": "green",
                        "hover-line-color": "blue",
                        "selected-line-color": "#f58c24"
                    };
                    this.configuration.styles.nodes = {
                        "default-background-color": "yellow",
                        "default-line-dasharray": "5,5",
                        "hover-background-color": "#cad2d2",
                        "selected-background-color": "blue",
                        "default-size": 1,
                        "hover-size": 2.5,
                        "selected-size": 1.9,
                        "default-line-color": "red",
                        "hover-line-color": "blue",
                        "selected-line-color": "#f58c24",
                        "default-label-color": "black",
                        "hover-label-color": "blue",
                        "selected-label-color": "red"
                    };
                }
                this.emitChange();
            };
        /**
         * @param {?} event
         * @param {?} item
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.click = /**
         * @param {?} event
         * @param {?} item
         * @return {?}
         */
            function (event, item) {
                /** @type {?} */
                var input = event.target;
                if (item === "allowduplicates") {
                    this.allowduplicates = input.checked;
                    this.groupduplicates = this.allowduplicates ? this.groupduplicates : false;
                }
                else if (item === "groupduplicates") {
                    this.groupduplicates = input.checked;
                    this.allowduplicates = this.groupduplicates ? true : this.allowduplicates;
                }
                else if (item === "tooltipEnabled") {
                    this.configuration.tooltipEnabled = input.checked;
                }
                else {
                    item.selected = (input.checked);
                }
                this.emitChange();
            };
        /**
         * @return {?}
         */
        VisualizationConfigurationComponent.prototype.emitChange = /**
         * @return {?}
         */
            function () {
                this.onchange.emit({
                    points: this.interestingPoints,
                    keys: this.targetKeys,
                    allowduplicates: this.allowduplicates,
                    configuration: this.configuration
                });
            };
        VisualizationConfigurationComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'visualization-configuration',
                        template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
                        styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
                    }] }
        ];
        /** @nocollapse */
        VisualizationConfigurationComponent.ctorParameters = function () {
            return [
                { type: core.Renderer }
            ];
        };
        VisualizationConfigurationComponent.propDecorators = {
            interestingPoints: [{ type: core.Input, args: ["interestingPoints",] }],
            targetKeys: [{ type: core.Input, args: ["targetKeys",] }],
            allowduplicates: [{ type: core.Input, args: ["allowduplicates",] }],
            configuration: [{ type: core.Input, args: ["configuration",] }],
            groupduplicates: [{ type: core.Input, args: ["groupduplicates",] }],
            onchange: [{ type: core.Output, args: ["onchange",] }]
        };
        return VisualizationConfigurationComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var VisualizationPointsModule = (function () {
        function VisualizationPointsModule() {
        }
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
                    },] }
        ];
        return VisualizationPointsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.VisualizationPointsComponent = VisualizationPointsComponent;
    exports.VisualizationConfigurationComponent = VisualizationConfigurationComponent;
    exports.VisualizationPointsModule = VisualizationPointsModule;
    exports.ɵb = VisualizationPointsEvaluator;
    exports.ɵa = VisualizationPointsMaker;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlci50cyIsIm5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3IudHMiLCJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQudHMiLCJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnRzIiwibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlzdWFsaXphdGlvblBvaW50IHtcclxuICBrZXk6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB7XHJcbiAgcHJpdmF0ZSBwb2ludHM6IFZpc3VhbGl6YXRpb25Qb2ludFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgdGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzOmFueVtdLCByb290Ont9KSB7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gW107XHJcblxyXG4gICAgcG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICBsZXQgcEl0ZW0gPSByb290O1xyXG4gICAgICBsZXQgZm91bmRBcnJheSA9IGZhbHNlO1xyXG5cclxuICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGZvdW5kQXJyYXkgPSB0cnVlOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZvdW5kQXJyYXkpIHtcclxuICAgICAgICB0YXJnZXRzLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwb2ludCkpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0cztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUG9pbnRzKHJvb3Q6IHt9LCBwYXRoOiBzdHJpbmcsIGNsZWFyOiBib29sZWFuKSB7XHJcblxyXG4gICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAocm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhyb290KS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBpbm5lclBhdGggPSAocGF0aC5sZW5ndGggPyAocGF0aCArIFwiLlwiICsga2V5KSA6IGtleSk7XHJcbiAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290W2tleV0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHJvb3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0gcm9vdFtrZXldO1xyXG4gICAgICAgICAgaWYgKG5vZGUubGVuZ3RoICYmICEobm9kZVswXSBpbnN0YW5jZW9mIEFycmF5KSAmJiAodHlwZW9mIG5vZGVbMF0gIT09IFwic3RyaW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMobm9kZVswXSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICBrZXk6IGlubmVyUGF0aCxcclxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlUG9pbnRzKHJvb3Rba2V5XSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC4vZywnIH4gJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIHtcclxuICBwcml2YXRlIHB1c2hJZk5vdENvbnRhaW4oYXJyYXksIGVudHJ5KSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZS5pbmRleE9mKGVudHJ5Lm5hbWUpID4gLTEpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBhcnJheS5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaEluTGlzdChsaXN0LCBpdGVtLCBub2RlLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywgZGlzcGxheURhdGEpIHtcclxuICAgIGxldCBmb3VuZDogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGl0ZW0gPSBpdGVtIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtLmpvaW4oXCJcIikgOiBpdGVtO1xyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtLnRyaW0oKS5sZW5ndGggPyBpdGVtIDogXCJCTEFOS1wiO1xyXG4gICAgfWVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICBpdGVtID0gaXRlbT8gXCJ0cnVlXCI6XCJmYWxzZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbSA9IGl0ZW0gPT09IG51bGwgPyBcIk5VTExcIiA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdC5tYXAoIChzdWJJdGVtOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHN1Ykl0ZW0ubmFtZSA9PT0gaXRlbSkge1xyXG4gICAgICAgIGZvdW5kID0gc3ViSXRlbTtcclxuICAgICAgICB0aGlzLnB1c2hJZk5vdENvbnRhaW4oc3ViSXRlbS5jaGlsZHJlbiwgZGlzcGxheURhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICggaXRlbSAhPT0gbnVsbCApIHtcclxuICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChncm91cGR1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGZvdW5kLmNoaWxkcmVuLnB1c2goZGlzcGxheURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dkdXBsaWNhdGVzKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBpdGVtLCBkYXRhOiBub2RlLCBjaGlsZHJlbjogW2Rpc3BsYXlEYXRhXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbHVhdGUoIHBJdGVtOmFueSwgcGF0aDogYW55W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgZXZlbHVhdGVkTm9kZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi4vLCAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZVBvaW50cyhkYXRhOiBhbnlbXSwgcGlja1BvaW50czogYW55W10sIHByaW1hcnlzOiBhbnlbXSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMpIHtcclxuXHJcbiAgICBjb25zdCBpbm5lck1hcCA9IHt9O1xyXG5cclxuICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgaW5uZXJNYXBbcG9pbnQudmFsdWVdID0gW107XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGRpc3BsYXlEYXRhOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgIHByaW1hcnlzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHBJdGVtID0gaXRlbTtcclxuXHJcbiAgICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IChwSXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogcEl0ZW0pO1xyXG4gICAgICAgIGRpc3BsYXlEYXRhLnB1c2goU3RyaW5nKHBJdGVtKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5RGF0YSA9IGRpc3BsYXlEYXRhLmxlbmd0aCA/IGRpc3BsYXlEYXRhLmpvaW4oXCIsIFwiKSA6IHVuZGVmaW5lZDsgICAgICBcclxuXHJcbiAgICAgIGlmIChkaXNwbGF5RGF0YSkge1xyXG4gICAgICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGlubmVyTWFwW3BvaW50LnZhbHVlXTtcclxuICAgICAgICAgIGNvbnN0IHBJdGVtOiBhbnkgPSB0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgY29uc3Qgbm9kZXM6IGFueSA9IHRoaXMuZXZlbHVhdGVkTm9kZShpdGVtLCBwYXRoKTtcclxuICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcEl0ZW0ubWFwKCAocCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcCwgbm9kZXNbaW5kZXhdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcEl0ZW0sIG5vZGVzLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJvb3RMaXN0ID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhpbm5lck1hcCkubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgIHJvb3RMaXN0LnB1c2goe1xyXG4gICAgICAgIG5hbWU6IHRoaXMubWFrZVdvcmRzKGtleSksXHJcbiAgICAgICAgY2hpbGRyZW46IGlubmVyTWFwW2tleV1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCIvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiByb290TGlzdFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1wb2ludHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlZFBvaW50cyA9IHt9O1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG4gIFxyXG4gIEBJbnB1dChcInNldHRpbmdzXCIpXHJcbiAgc2V0dGluZ3M6IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVDb25maWd1cmF0aW9uXCIpXHJcbiAgZW5hYmxlQ29uZmlndXJhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dChcIm9uVmlzdWFsaXphdGlvblwiKVxyXG4gIG9uVmlzdWFsaXphdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImQzQ29udGFpbmVyXCIpXHJcbiAgZDNDb250YWluZXI7XHJcblxyXG4gIHByaXZhdGUgc2l6ZVVwKHBvaW50cykge1xyXG4gICAgY29uc3Qgc2l6ZSA9IChwb2ludHMuY2hpbGRyZW4gJiYgcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCkgPyBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoIDogdW5kZWZpbmVkO1xyXG4gICAgaWYgKHNpemUpIHtcclxuICAgICAgcG9pbnRzLm5hbWUgKz0gcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCA+IDEgPyBcIiAoXCIgKyBzaXplICsgXCIpXCIgOiBcIlwiO1xyXG4gICAgICBwb2ludHMuY2hpbGRyZW4ubWFwKCAocCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2l6ZVVwKHApO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxuICB9XHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHMsIHByaW1hcmllcykge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggJiYgcHJpbWFyaWVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5ldmFsdWF0ZWRQb2ludHMgPSB0aGlzLmV2YWx1YXRvci5ldmFsdWF0ZVBvaW50cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyaWVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyk7XHJcbiAgICAgIGNvbnN0IHNpemVkdXBQb2ludHMgPSB0aGlzLnNpemVVcChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZXZhbHVhdGVkUG9pbnRzKSkpO1xyXG4gICAgICB3aW5kb3dbJ2luaXRpYXRlRDMnXShzaXplZHVwUG9pbnRzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdCh0aGlzLmV2YWx1YXRlZFBvaW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdChbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVEYXRhUmVmcmVuY2Uob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSkge1xyXG4gICAgd2luZG93Wyd1cGRhdGVOb2RlRGF0YVJlZnJlbmNlJ10ob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSlcclxuICB9XHJcbiAgc3RhcnRCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RhcnRCbGlua2luZyddKHRoaXMuc2V0dGluZ3MpO1xyXG4gIH1cclxuICBzdG9wQmxpbmtpbmcoKSB7XHJcbiAgICB3aW5kb3dbJ3N0b3BCbGlua2luZyddKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcG9pbnRNYWtlcjogVmlzdWFsaXphdGlvblBvaW50c01ha2VyLCBcclxuICAgIHByaXZhdGUgZXZhbHVhdG9yOiBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuXHJcbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9dW5kZWZpbmVkO1xyXG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmdPbkluaXQuYmluZCh0aGlzKSwgMzMzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZFJlZmVyZW5jZVN0cnVjdHVyZUZyb20oYXJyYXkpOiBhbnkge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGxldCBtYXhTaXplID0gMDtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pPT4ge1xyXG4gICAgICAgbGV0IHggPSBpdGVtID8gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoIDogMDtcclxuICAgICAgIGlmICh4ID4gbWF4U2l6ZSkge1xyXG4gICAgICAgIG1heFNpemUgPSB4O1xyXG4gICAgICAgIHJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCAhKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRhdGEgPSBbdGhpcy5kYXRhXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoICYmIHRoaXMuZW5hYmxlQ29uZmlndXJhdGlvbikge1xyXG4gICAgICBjb25zdCByb290ID0gdGhpcy5maW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbSh0aGlzLmRhdGEpO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50TWFrZXIuZ2VuZXJhdGVQb2ludHMocm9vdCwgXCJcIiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSBwb2ludHM7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9IHRoaXMucG9pbnRNYWtlci50YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHMsIHJvb3QpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLmludGVyZXN0aW5nUG9pbnRzKSxcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLnRhcmdldEtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF3aW5kb3dbJ2luaXRpYXRlRDMnXSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoXCJhc3NldHMvZDMuanNcIiwgJ2QzanMnKTtcclxuICAgIH1cclxuIFx0fVxyXG4gICBcclxuXHRwcml2YXRlIGxvYWRTY3JpcHQodXJsLCBpZCkgeyAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgLy8gaWYgKCFzY3JpcHQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgXHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHVybDtcclxuICAgICAgICAvLyBzY3JpcHRFbGVtZW50LmlkID0gaWQ7XHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcbiAgICAgIC8vIH1cclxuXHRcdH0pXHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgc2FuaXRpemUobGlzdCkge1xyXG4gICAgY29uc3Qgc2FuaXRpemVkUG9pbnRzID0gW107XHJcbiAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICBsaXN0Lm1hcCgocG9pbnQpID0+IHtcclxuICAgICAgICBpZiAocG9pbnQuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHNhbml0aXplZFBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5IDogcG9pbnQua2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogcG9pbnQudmFsdWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2FuaXRpemVkUG9pbnRzO1xyXG4gIH1cclxuICBvbmNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBldmVudC5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGV2ZW50Lmdyb3VwZHVwbGljYXRlcztcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBldmVudC5jb25maWd1cmF0aW9uO1xyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZShldmVudC5wb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LmtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQge1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImNvbmZpZ3VyYXRpb25cIilcclxuICBjb25maWd1cmF0aW9uOiBEM0NvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICB0b29sdGlwRW5hYmxlZDogZmFsc2UsXHJcbiAgICBkaXJlY3Rpb25hbGl0eTogXCJMMlJcIixcclxuICAgIG5vZGVUeXBlOiBcIlBsYWluXCIsXHJcbiAgICB0YXJnZXREaXY6IFwiI2QzLWNvbnRhaW5lclwiLFxyXG4gICAgYmxpbmtBdHRyaWJ1dGVzV2F0Y2g6IFtdLFxyXG4gICAgc3R5bGVzOiB7XHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XHJcblxyXG4gIGtleXVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuXHRcdH1cclxuICB9XHJcblxyXG4gIGNoYW5lRGlyZWN0aW9uYWxpdHkoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5kaXJlY3Rpb25hbGl0eSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTm9kZVR5cGUoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5ub2RlVHlwZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBjaGFuZ2VDb2xvclNldHMoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT0gMSkge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLmxpbmtzID0ge1xyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJsaWdodHN0ZWVsYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLm5vZGVzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS4zLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEuMixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMi4yLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JlZW5cIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ5ZWxsb3dcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjY2FkMmQyXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjUsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuOSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2soZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGl0ZW0gPT09IFwiYWxsb3dkdXBsaWNhdGVzXCIpIHtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IHRoaXMuYWxsb3dkdXBsaWNhdGVzID8gdGhpcy5ncm91cGR1cGxpY2F0ZXMgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJncm91cGR1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID8gdHJ1ZSA6IHRoaXMuYWxsb3dkdXBsaWNhdGVzO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcInRvb2x0aXBFbmFibGVkXCIpIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnRvb2x0aXBFbmFibGVkID0gaW5wdXQuY2hlY2tlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAoaW5wdXQuY2hlY2tlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgcG9pbnRzOiB0aGlzLmludGVyZXN0aW5nUG9pbnRzLFxyXG4gICAgICBrZXlzOiB0aGlzLnRhcmdldEtleXMsXHJcbiAgICAgIGFsbG93ZHVwbGljYXRlczogdGhpcy5hbGxvd2R1cGxpY2F0ZXMsXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IHRoaXMuY29uZmlndXJhdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyJztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJSZW5kZXJlciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsdUJBNkMwQixPQUFPLEVB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QUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNULEtBQUssQ0FBQyxDQUFDO3dCQUFDLEtBQUssQ0FBQzs0QkFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLE1BQU07d0JBQzlCLEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENB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
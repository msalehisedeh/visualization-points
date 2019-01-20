(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/visualization-points', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['visualization-points'] = {}),global.ng.core,global.ng.common));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdmlzdWFsaXphdGlvbi1wb2ludHMudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIudHMiLCJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLWV2YWx1YXRvci50cyIsIm5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvdmlzdWFsaXphdGlvbi1wb2ludHMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0geVtvcFswXSAmIDIgPyBcInJldHVyblwiIDogb3BbMF0gPyBcInRocm93XCIgOiBcIm5leHRcIl0pICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gWzAsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7ICB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAob1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWaXN1YWxpemF0aW9uUG9pbnQge1xyXG4gIGtleTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmdcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIHtcclxuICBwcml2YXRlIHBvaW50czogVmlzdWFsaXphdGlvblBvaW50W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICB0YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHM6YW55W10sIHJvb3Q6e30pIHtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBbXTtcclxuXHJcbiAgICBwb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgIGxldCBwSXRlbSA9IHJvb3Q7XHJcbiAgICAgIGxldCBmb3VuZEFycmF5ID0gZmFsc2U7XHJcblxyXG4gICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHBJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgZm91bmRBcnJheSA9IHRydWU7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZm91bmRBcnJheSkge1xyXG4gICAgICAgIHRhcmdldHMucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBvaW50KSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0YXJnZXRzO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVQb2ludHMocm9vdDoge30sIHBhdGg6IHN0cmluZywgY2xlYXI6IGJvb2xlYW4pIHtcclxuXHJcbiAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmIChyb290ICE9PSBudWxsKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHJvb3QpLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlubmVyUGF0aCA9IChwYXRoLmxlbmd0aCA/IChwYXRoICsgXCIuXCIgKyBrZXkpIDoga2V5KTtcclxuICBcclxuICAgICAgICBpZiAodHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiByb290W2tleV0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5OiBpbm5lclBhdGgsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAocm9vdFtrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290W2tleV07XHJcbiAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgIShub2RlWzBdIGluc3RhbmNlb2YgQXJyYXkpICYmICh0eXBlb2Ygbm9kZVswXSAhPT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVBvaW50cyhub2RlWzBdLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMocm9vdFtrZXldLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLi9nLCcgfiAnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14uLywgKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCkpO1xyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3Ige1xyXG4gIHByaXZhdGUgcHVzaElmTm90Q29udGFpbihhcnJheSwgZW50cnkpIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lLmluZGV4T2YoZW50cnkubmFtZSkgPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoSW5MaXN0KGxpc3QsIGl0ZW0sIG5vZGUsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCBkaXNwbGF5RGF0YSkge1xyXG4gICAgbGV0IGZvdW5kOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaXRlbSA9IGl0ZW0gaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW0uam9pbihcIlwiKSA6IGl0ZW07XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0udHJpbSgpLmxlbmd0aCA/IGl0ZW0gOiBcIkJMQU5LXCI7XHJcbiAgICB9ZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtPyBcInRydWVcIjpcImZhbHNlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtID0gaXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Lm1hcCggKHN1Ykl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3ViSXRlbS5uYW1lID09PSBpdGVtKSB7XHJcbiAgICAgICAgZm91bmQgPSBzdWJJdGVtO1xyXG4gICAgICAgIHRoaXMucHVzaElmTm90Q29udGFpbihzdWJJdGVtLmNoaWxkcmVuLCBkaXNwbGF5RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBpdGVtICE9PSBudWxsICkge1xyXG4gICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdyb3VwZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgZm91bmQuY2hpbGRyZW4ucHVzaChkaXNwbGF5RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd2R1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVsdWF0ZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBldmVsdWF0ZWROb2RlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlUG9pbnRzKGRhdGE6IGFueVtdLCBwaWNrUG9pbnRzOiBhbnlbXSwgcHJpbWFyeXM6IGFueVtdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcykge1xyXG5cclxuICAgIGNvbnN0IGlubmVyTWFwID0ge307XHJcblxyXG4gICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBpbm5lck1hcFtwb2ludC52YWx1ZV0gPSBbXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgZGlzcGxheURhdGE6IGFueSA9IFtdO1xyXG5cclxuICAgICAgcHJpbWFyeXMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgcEl0ZW0gPSBpdGVtO1xyXG5cclxuICAgICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gKHBJdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBwSXRlbSk7XHJcbiAgICAgICAgZGlzcGxheURhdGEucHVzaChTdHJpbmcocEl0ZW0pKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEubGVuZ3RoID8gZGlzcGxheURhdGEuam9pbihcIiwgXCIpIDogdW5kZWZpbmVkOyAgICAgIFxyXG5cclxuICAgICAgaWYgKGRpc3BsYXlEYXRhKSB7XHJcbiAgICAgICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gaW5uZXJNYXBbcG9pbnQudmFsdWVdO1xyXG4gICAgICAgICAgY29uc3QgcEl0ZW06IGFueSA9IHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBjb25zdCBub2RlczogYW55ID0gdGhpcy5ldmVsdWF0ZWROb2RlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBwSXRlbS5tYXAoIChwLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwLCBub2Rlc1tpbmRleF0sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwSXRlbSwgbm9kZXMsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgcm9vdExpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGlubmVyTWFwKS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgcm9vdExpc3QucHVzaCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5tYWtlV29yZHMoa2V5KSxcclxuICAgICAgICBjaGlsZHJlbjogaW5uZXJNYXBba2V5XVxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIi9cIixcclxuICAgICAgY2hpbGRyZW46IHJvb3RMaXN0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlcic7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3IgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLXBvaW50cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHByaXZhdGUgZXZhbHVhdGVkUG9pbnRzID0ge307XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcbiAgXHJcbiAgQElucHV0KFwic2V0dGluZ3NcIilcclxuICBzZXR0aW5nczogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImVuYWJsZUNvbmZpZ3VyYXRpb25cIilcclxuICBlbmFibGVDb25maWd1cmF0aW9uOiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiZDNDb250YWluZXJcIilcclxuICBkM0NvbnRhaW5lcjtcclxuXHJcbiAgcHJpdmF0ZSBzaXplVXAocG9pbnRzKSB7XHJcbiAgICBjb25zdCBzaXplID0gKHBvaW50cy5jaGlsZHJlbiAmJiBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoKSA/IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc2l6ZSkge1xyXG4gICAgICBwb2ludHMubmFtZSArPSBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoID4gMSA/IFwiIChcIiArIHNpemUgKyBcIilcIiA6IFwiXCI7XHJcbiAgICAgIHBvaW50cy5jaGlsZHJlbi5tYXAoIChwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaXplVXAocCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG4gIH1cclxuICBwcml2YXRlIHRyaWdnZXJFdmFsdWF0aW9uKHBvaW50cywgcHJpbWFyaWVzKSB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCAmJiBwcmltYXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmV2YWx1YXRlZFBvaW50cyA9IHRoaXMuZXZhbHVhdG9yLmV2YWx1YXRlUG9pbnRzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJpZXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzKTtcclxuICAgICAgY29uc3Qgc2l6ZWR1cFBvaW50cyA9IHRoaXMuc2l6ZVVwKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ldmFsdWF0ZWRQb2ludHMpKSk7XHJcbiAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKHNpemVkdXBQb2ludHMsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KHRoaXMuZXZhbHVhdGVkUG9pbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KFtdKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZURhdGFSZWZyZW5jZShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKSB7XHJcbiAgICB3aW5kb3dbJ3VwZGF0ZU5vZGVEYXRhUmVmcmVuY2UnXShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKVxyXG4gIH1cclxuICBzdGFydEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdGFydEJsaW5raW5nJ10odGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG4gIHN0b3BCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RvcEJsaW5raW5nJ10oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb2ludE1ha2VyOiBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsIFxyXG4gICAgcHJpdmF0ZSBldmFsdWF0b3I6IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG5cclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID11bmRlZmluZWQ7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbShhcnJheSk6IGFueSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgbGV0IG1heFNpemUgPSAwO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSk9PiB7XHJcbiAgICAgICBsZXQgeCA9IGl0ZW0gPyBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggOiAwO1xyXG4gICAgICAgaWYgKHggPiBtYXhTaXplKSB7XHJcbiAgICAgICAgbWF4U2l6ZSA9IHg7XHJcbiAgICAgICAgcmVzdWx0ID0gaXRlbTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5lbmFibGVDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKHRoaXMuZGF0YSk7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRNYWtlci5nZW5lcmF0ZVBvaW50cyhyb290LCBcIlwiLCB0cnVlKTtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHBvaW50cztcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID0gdGhpcy5wb2ludE1ha2VyLnRhcmdldEtleXNGcm9tR2VuZXJhdGVkUG9pbnRzKHBvaW50cywgcm9vdCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMuaW50ZXJlc3RpbmdQb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMudGFyZ2V0S2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAvLyBpZiAoIXNjcmlwdCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICBcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICAgIC8vIHNjcmlwdEVsZW1lbnQuaWQgPSBpZDtcclxuICAgICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcclxuICAgICAgLy8gfVxyXG5cdFx0fSlcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBzYW5pdGl6ZShsaXN0KSB7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRQb2ludHMgPSBbXTtcclxuICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIGxpc3QubWFwKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGlmIChwb2ludC5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgc2FuaXRpemVkUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBrZXkgOiBwb2ludC5rZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludC52YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzYW5pdGl6ZWRQb2ludHM7XHJcbiAgfVxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGV2ZW50LmFsbG93ZHVwbGljYXRlcztcclxuICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gZXZlbnQuZ3JvdXBkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IGV2ZW50LmNvbmZpZ3VyYXRpb247XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LnBvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQua2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEQzQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCB7XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiY29uZmlndXJhdGlvblwiKVxyXG4gIGNvbmZpZ3VyYXRpb246IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBibGlua0F0dHJpYnV0ZXNXYXRjaDogW10sXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0Ymx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJvcmFuZ2VcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgY2hhbmVEaXJlY3Rpb25hbGl0eShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLmRpcmVjdGlvbmFsaXR5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOb2RlVHlwZShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLm5vZGVUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG4gIGNoYW5nZUNvbG9yU2V0cyhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAzLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRzdGVlbGJsdWVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS41LFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5saW5rcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMS4yLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuMyxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmVlblwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCJcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5ub2RlcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcInllbGxvd1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNjYWQyZDJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDIuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS45LFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjbGljayhldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoaXRlbSA9PT0gXCJhbGxvd2R1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPyB0aGlzLmdyb3VwZHVwbGljYXRlcyA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcImdyb3VwZHVwbGljYXRlc1wiKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gaW5wdXQuY2hlY2tlZDtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPyB0cnVlIDogdGhpcy5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwidG9vbHRpcEVuYWJsZWRcIikge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udG9vbHRpcEVuYWJsZWQgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS5zZWxlY3RlZCA9IChpbnB1dC5jaGVja2VkKTtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG4gICAgICBwb2ludHM6IHRoaXMuaW50ZXJlc3RpbmdQb2ludHMsXHJcbiAgICAgIGtleXM6IHRoaXMudGFyZ2V0S2V5cyxcclxuICAgICAgYWxsb3dkdXBsaWNhdGVzOiB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgY29uZmlndXJhdGlvbjogdGhpcy5jb25maWd1cmF0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCxcclxuICAgIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlcixcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIlJlbmRlcmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7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QUFDLEVBQUUsQ0FBQzt3QkFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDOzRCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt3QkFDOUIsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQ3hELEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxH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
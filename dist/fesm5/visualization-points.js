import { Injectable, Component, Input, Output, ViewChild, EventEmitter, Renderer, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { __awaiter, __generator } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VisualizationPointsComponent = /** @class */ (function () {
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
        this.onVisualization = new EventEmitter();
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
                        if (!!window['initiateD3']) return [3 /*break*/, 2];
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
        { type: Component, args: [{
                    selector: 'visualization-points',
                    template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
                    styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
                }] }
    ];
    /** @nocollapse */
    VisualizationPointsComponent.ctorParameters = function () { return [
        { type: VisualizationPointsMaker },
        { type: VisualizationPointsEvaluator }
    ]; };
    VisualizationPointsComponent.propDecorators = {
        interestingPoints: [{ type: Input, args: ["interestingPoints",] }],
        targetKeys: [{ type: Input, args: ["targetKeys",] }],
        data: [{ type: Input, args: ["data",] }],
        allowduplicates: [{ type: Input, args: ["allowduplicates",] }],
        groupduplicates: [{ type: Input, args: ["groupduplicates",] }],
        settings: [{ type: Input, args: ["settings",] }],
        enableConfiguration: [{ type: Input, args: ["enableConfiguration",] }],
        onVisualization: [{ type: Output, args: ["onVisualization",] }],
        d3Container: [{ type: ViewChild, args: ["d3Container",] }]
    };
    return VisualizationPointsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VisualizationConfigurationComponent = /** @class */ (function () {
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
        this.onchange = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'visualization-configuration',
                    template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
                    styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
                }] }
    ];
    /** @nocollapse */
    VisualizationConfigurationComponent.ctorParameters = function () { return [
        { type: Renderer }
    ]; };
    VisualizationConfigurationComponent.propDecorators = {
        interestingPoints: [{ type: Input, args: ["interestingPoints",] }],
        targetKeys: [{ type: Input, args: ["targetKeys",] }],
        allowduplicates: [{ type: Input, args: ["allowduplicates",] }],
        configuration: [{ type: Input, args: ["configuration",] }],
        groupduplicates: [{ type: Input, args: ["groupduplicates",] }],
        onchange: [{ type: Output, args: ["onchange",] }]
    };
    return VisualizationConfigurationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var VisualizationPointsModule = /** @class */ (function () {
    function VisualizationPointsModule() {
    }
    VisualizationPointsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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
                    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

export { VisualizationPointsComponent, VisualizationConfigurationComponent, VisualizationPointsModule, VisualizationPointsEvaluator as ɵb, VisualizationPointsMaker as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuanMubWFwIiwic291cmNlcyI6WyJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIudHMiLCJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLnRzIiwibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnRzIiwibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlzdWFsaXphdGlvblBvaW50IHtcclxuICBrZXk6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB7XHJcbiAgcHJpdmF0ZSBwb2ludHM6IFZpc3VhbGl6YXRpb25Qb2ludFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgdGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzOmFueVtdLCByb290Ont9KSB7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gW107XHJcblxyXG4gICAgcG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICBsZXQgcEl0ZW0gPSByb290O1xyXG4gICAgICBsZXQgZm91bmRBcnJheSA9IGZhbHNlO1xyXG5cclxuICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGZvdW5kQXJyYXkgPSB0cnVlOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZvdW5kQXJyYXkpIHtcclxuICAgICAgICB0YXJnZXRzLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwb2ludCkpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0cztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUG9pbnRzKHJvb3Q6IHt9LCBwYXRoOiBzdHJpbmcsIGNsZWFyOiBib29sZWFuKSB7XHJcblxyXG4gICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAocm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhyb290KS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBpbm5lclBhdGggPSAocGF0aC5sZW5ndGggPyAocGF0aCArIFwiLlwiICsga2V5KSA6IGtleSk7XHJcbiAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290W2tleV0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHJvb3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0gcm9vdFtrZXldO1xyXG4gICAgICAgICAgaWYgKG5vZGUubGVuZ3RoICYmICEobm9kZVswXSBpbnN0YW5jZW9mIEFycmF5KSAmJiAodHlwZW9mIG5vZGVbMF0gIT09IFwic3RyaW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMobm9kZVswXSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICBrZXk6IGlubmVyUGF0aCxcclxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlUG9pbnRzKHJvb3Rba2V5XSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC4vZywnIH4gJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIHtcclxuICBwcml2YXRlIHB1c2hJZk5vdENvbnRhaW4oYXJyYXksIGVudHJ5KSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZS5pbmRleE9mKGVudHJ5Lm5hbWUpID4gLTEpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBhcnJheS5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaEluTGlzdChsaXN0LCBpdGVtLCBub2RlLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywgZGlzcGxheURhdGEpIHtcclxuICAgIGxldCBmb3VuZDogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGl0ZW0gPSBpdGVtIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtLmpvaW4oXCJcIikgOiBpdGVtO1xyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtLnRyaW0oKS5sZW5ndGggPyBpdGVtIDogXCJCTEFOS1wiO1xyXG4gICAgfWVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICBpdGVtID0gaXRlbT8gXCJ0cnVlXCI6XCJmYWxzZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbSA9IGl0ZW0gPT09IG51bGwgPyBcIk5VTExcIiA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdC5tYXAoIChzdWJJdGVtOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHN1Ykl0ZW0ubmFtZSA9PT0gaXRlbSkge1xyXG4gICAgICAgIGZvdW5kID0gc3ViSXRlbTtcclxuICAgICAgICB0aGlzLnB1c2hJZk5vdENvbnRhaW4oc3ViSXRlbS5jaGlsZHJlbiwgZGlzcGxheURhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICggaXRlbSAhPT0gbnVsbCApIHtcclxuICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChncm91cGR1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGZvdW5kLmNoaWxkcmVuLnB1c2goZGlzcGxheURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dkdXBsaWNhdGVzKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBpdGVtLCBkYXRhOiBub2RlLCBjaGlsZHJlbjogW2Rpc3BsYXlEYXRhXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbHVhdGUoIHBJdGVtOmFueSwgcGF0aDogYW55W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgZXZlbHVhdGVkTm9kZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi4vLCAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZVBvaW50cyhkYXRhOiBhbnlbXSwgcGlja1BvaW50czogYW55W10sIHByaW1hcnlzOiBhbnlbXSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMpIHtcclxuXHJcbiAgICBjb25zdCBpbm5lck1hcCA9IHt9O1xyXG5cclxuICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgaW5uZXJNYXBbcG9pbnQudmFsdWVdID0gW107XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGRpc3BsYXlEYXRhOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgIHByaW1hcnlzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHBJdGVtID0gaXRlbTtcclxuXHJcbiAgICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IChwSXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogcEl0ZW0pO1xyXG4gICAgICAgIGRpc3BsYXlEYXRhLnB1c2goU3RyaW5nKHBJdGVtKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5RGF0YSA9IGRpc3BsYXlEYXRhLmxlbmd0aCA/IGRpc3BsYXlEYXRhLmpvaW4oXCIsIFwiKSA6IHVuZGVmaW5lZDsgICAgICBcclxuXHJcbiAgICAgIGlmIChkaXNwbGF5RGF0YSkge1xyXG4gICAgICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGlubmVyTWFwW3BvaW50LnZhbHVlXTtcclxuICAgICAgICAgIGNvbnN0IHBJdGVtOiBhbnkgPSB0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgY29uc3Qgbm9kZXM6IGFueSA9IHRoaXMuZXZlbHVhdGVkTm9kZShpdGVtLCBwYXRoKTtcclxuICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcEl0ZW0ubWFwKCAocCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcCwgbm9kZXNbaW5kZXhdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcEl0ZW0sIG5vZGVzLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJvb3RMaXN0ID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhpbm5lck1hcCkubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgIHJvb3RMaXN0LnB1c2goe1xyXG4gICAgICAgIG5hbWU6IHRoaXMubWFrZVdvcmRzKGtleSksXHJcbiAgICAgICAgY2hpbGRyZW46IGlubmVyTWFwW2tleV1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCIvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiByb290TGlzdFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1wb2ludHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlZFBvaW50cyA9IHt9O1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG4gIFxyXG4gIEBJbnB1dChcInNldHRpbmdzXCIpXHJcbiAgc2V0dGluZ3M6IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVDb25maWd1cmF0aW9uXCIpXHJcbiAgZW5hYmxlQ29uZmlndXJhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dChcIm9uVmlzdWFsaXphdGlvblwiKVxyXG4gIG9uVmlzdWFsaXphdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImQzQ29udGFpbmVyXCIpXHJcbiAgZDNDb250YWluZXI7XHJcblxyXG4gIHByaXZhdGUgc2l6ZVVwKHBvaW50cykge1xyXG4gICAgY29uc3Qgc2l6ZSA9IChwb2ludHMuY2hpbGRyZW4gJiYgcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCkgPyBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoIDogdW5kZWZpbmVkO1xyXG4gICAgaWYgKHNpemUpIHtcclxuICAgICAgcG9pbnRzLm5hbWUgKz0gcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCA+IDEgPyBcIiAoXCIgKyBzaXplICsgXCIpXCIgOiBcIlwiO1xyXG4gICAgICBwb2ludHMuY2hpbGRyZW4ubWFwKCAocCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2l6ZVVwKHApO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxuICB9XHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHMsIHByaW1hcmllcykge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggJiYgcHJpbWFyaWVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5ldmFsdWF0ZWRQb2ludHMgPSB0aGlzLmV2YWx1YXRvci5ldmFsdWF0ZVBvaW50cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyaWVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyk7XHJcbiAgICAgIGNvbnN0IHNpemVkdXBQb2ludHMgPSB0aGlzLnNpemVVcChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZXZhbHVhdGVkUG9pbnRzKSkpO1xyXG4gICAgICB3aW5kb3dbJ2luaXRpYXRlRDMnXShzaXplZHVwUG9pbnRzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdCh0aGlzLmV2YWx1YXRlZFBvaW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdChbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVEYXRhUmVmcmVuY2Uob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSkge1xyXG4gICAgd2luZG93Wyd1cGRhdGVOb2RlRGF0YVJlZnJlbmNlJ10ob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSlcclxuICB9XHJcbiAgc3RhcnRCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RhcnRCbGlua2luZyddKHRoaXMuc2V0dGluZ3MpO1xyXG4gIH1cclxuICBzdG9wQmxpbmtpbmcoKSB7XHJcbiAgICB3aW5kb3dbJ3N0b3BCbGlua2luZyddKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcG9pbnRNYWtlcjogVmlzdWFsaXphdGlvblBvaW50c01ha2VyLCBcclxuICAgIHByaXZhdGUgZXZhbHVhdG9yOiBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuXHJcbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9dW5kZWZpbmVkO1xyXG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmdPbkluaXQuYmluZCh0aGlzKSwgMzMzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZFJlZmVyZW5jZVN0cnVjdHVyZUZyb20oYXJyYXkpOiBhbnkge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGxldCBtYXhTaXplID0gMDtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pPT4ge1xyXG4gICAgICAgbGV0IHggPSBpdGVtID8gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoIDogMDtcclxuICAgICAgIGlmICh4ID4gbWF4U2l6ZSkge1xyXG4gICAgICAgIG1heFNpemUgPSB4O1xyXG4gICAgICAgIHJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCAhKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRhdGEgPSBbdGhpcy5kYXRhXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoICYmIHRoaXMuZW5hYmxlQ29uZmlndXJhdGlvbikge1xyXG4gICAgICBjb25zdCByb290ID0gdGhpcy5maW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbSh0aGlzLmRhdGEpO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50TWFrZXIuZ2VuZXJhdGVQb2ludHMocm9vdCwgXCJcIiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSBwb2ludHM7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9IHRoaXMucG9pbnRNYWtlci50YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHMsIHJvb3QpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLmludGVyZXN0aW5nUG9pbnRzKSxcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLnRhcmdldEtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF3aW5kb3dbJ2luaXRpYXRlRDMnXSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoXCJhc3NldHMvZDMuanNcIiwgJ2QzanMnKTtcclxuICAgIH1cclxuIFx0fVxyXG4gICBcclxuXHRwcml2YXRlIGxvYWRTY3JpcHQodXJsLCBpZCkgeyAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgLy8gaWYgKCFzY3JpcHQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgXHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHVybDtcclxuICAgICAgICAvLyBzY3JpcHRFbGVtZW50LmlkID0gaWQ7XHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcbiAgICAgIC8vIH1cclxuXHRcdH0pXHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgc2FuaXRpemUobGlzdCkge1xyXG4gICAgY29uc3Qgc2FuaXRpemVkUG9pbnRzID0gW107XHJcbiAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICBsaXN0Lm1hcCgocG9pbnQpID0+IHtcclxuICAgICAgICBpZiAocG9pbnQuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHNhbml0aXplZFBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5IDogcG9pbnQua2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogcG9pbnQudmFsdWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2FuaXRpemVkUG9pbnRzO1xyXG4gIH1cclxuICBvbmNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBldmVudC5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGV2ZW50Lmdyb3VwZHVwbGljYXRlcztcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBldmVudC5jb25maWd1cmF0aW9uO1xyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZShldmVudC5wb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LmtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQge1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImNvbmZpZ3VyYXRpb25cIilcclxuICBjb25maWd1cmF0aW9uOiBEM0NvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICB0b29sdGlwRW5hYmxlZDogZmFsc2UsXHJcbiAgICBkaXJlY3Rpb25hbGl0eTogXCJMMlJcIixcclxuICAgIG5vZGVUeXBlOiBcIlBsYWluXCIsXHJcbiAgICB0YXJnZXREaXY6IFwiI2QzLWNvbnRhaW5lclwiLFxyXG4gICAgYmxpbmtBdHRyaWJ1dGVzV2F0Y2g6IFtdLFxyXG4gICAgc3R5bGVzOiB7XHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XHJcblxyXG4gIGtleXVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuXHRcdH1cclxuICB9XHJcblxyXG4gIGNoYW5lRGlyZWN0aW9uYWxpdHkoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5kaXJlY3Rpb25hbGl0eSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTm9kZVR5cGUoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5ub2RlVHlwZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBjaGFuZ2VDb2xvclNldHMoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT0gMSkge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLmxpbmtzID0ge1xyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJsaWdodHN0ZWVsYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLm5vZGVzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS4zLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEuMixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMi4yLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JlZW5cIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ5ZWxsb3dcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjY2FkMmQyXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjUsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuOSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2soZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGl0ZW0gPT09IFwiYWxsb3dkdXBsaWNhdGVzXCIpIHtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IHRoaXMuYWxsb3dkdXBsaWNhdGVzID8gdGhpcy5ncm91cGR1cGxpY2F0ZXMgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJncm91cGR1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID8gdHJ1ZSA6IHRoaXMuYWxsb3dkdXBsaWNhdGVzO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcInRvb2x0aXBFbmFibGVkXCIpIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnRvb2x0aXBFbmFibGVkID0gaW5wdXQuY2hlY2tlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAoaW5wdXQuY2hlY2tlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgcG9pbnRzOiB0aGlzLmludGVyZXN0aW5nUG9pbnRzLFxyXG4gICAgICBrZXlzOiB0aGlzLnRhcmdldEtleXMsXHJcbiAgICAgIGFsbG93ZHVwbGljYXRlczogdGhpcy5hbGxvd2R1cGxpY2F0ZXMsXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IHRoaXMuY29uZmlndXJhdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyJztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFpQkU7c0JBRnVDLEVBQUU7S0FHeEM7Ozs7OztJQUVELGdFQUE2Qjs7Ozs7SUFBN0IsVUFBOEIsTUFBWSxFQUFFLElBQU87O1FBQ2pELElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVuQixNQUFNLENBQUMsR0FBRyxDQUFFLFVBQUMsS0FBSzs7WUFDaEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBQ2xDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7WUFDakIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBRXZCLElBQUksQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHO2dCQUNaLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtvQkFDOUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztvQkFDbEIsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUNwQzthQUNGLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7S0FDaEI7Ozs7Ozs7SUFFRCxpREFBYzs7Ozs7O0lBQWQsVUFBZSxJQUFRLEVBQUUsSUFBWSxFQUFFLEtBQWM7UUFBckQsaUJBOEJDO1FBNUJDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDbEI7UUFDRCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHOztnQkFDekIsSUFBTSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFFM0QsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDcEcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQ2YsR0FBRyxFQUFFLFNBQVM7d0JBQ2QsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO3FCQUNqQyxDQUFDLENBQUE7aUJBQ0g7cUJBQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxFQUFFOztvQkFDckMsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLEVBQUU7d0JBQy9FLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDaEQ7eUJBQU07d0JBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7NEJBQ2YsR0FBRyxFQUFFLFNBQVM7NEJBQ2QsS0FBSyxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO3lCQUNqQyxDQUFDLENBQUE7cUJBQ0g7aUJBQ0Y7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNsRDthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OztJQUVPLDRDQUFTOzs7O2NBQUMsSUFBSTtRQUNwQixPQUFPLElBQUk7YUFDRixPQUFPLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQzthQUNwQixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQzthQUMxQixPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQzthQUNqQixPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQzthQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFBLENBQUMsQ0FBQzs7O2dCQXBFdEQsVUFBVTs7OzttQ0FiWDs7Ozs7Ozs7Ozs7Ozs7O0lDV1UsdURBQWdCOzs7OztjQUFDLEtBQUssRUFBRSxLQUFLOztRQUNuQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUk7WUFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDdEMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNkO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7Ozs7Ozs7Ozs7O0lBR0ssaURBQVU7Ozs7Ozs7OztjQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVzs7O1FBQ2hGLElBQUksS0FBSyxHQUFRLFNBQVMsQ0FBQztRQUUzQixJQUFJLEdBQUcsSUFBSSxZQUFZLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO1NBQzVDO2FBQUssSUFBSSxPQUFPLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxHQUFHLElBQUksR0FBRSxNQUFNLEdBQUMsT0FBTyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFDLE9BQVk7WUFDckIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDekIsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDdEQ7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFLLElBQUksS0FBSyxJQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNoRTtpQkFBTTtnQkFDTCxJQUFJLGVBQWUsRUFBRTtvQkFDbkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2xDO3FCQUFNLElBQUksZUFBZSxFQUFFO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDaEU7YUFDRjtTQUNGOzs7Ozs7O0lBR0ssK0NBQVE7Ozs7O2NBQUUsS0FBUyxFQUFFLElBQVc7O2dDQUM3QixDQUFDO1lBQ1IsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTs7Z0JBQzFCLElBQU0sTUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUk7b0JBQ2QsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0QsQ0FBQyxDQUFDO2dCQUNILEtBQUssR0FBRyxNQUFJLENBQUM7O2FBRWQ7O1FBVEgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2tDQUEzQixDQUFDOzs7U0FVVDtRQUNELE9BQU8sS0FBSyxDQUFDOzs7Ozs7O0lBRVAsb0RBQWE7Ozs7O2NBQUUsS0FBUyxFQUFFLElBQVc7O2dDQUNsQyxDQUFDO1lBQ1IsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTs7Z0JBQzFCLElBQU0sTUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUk7b0JBQ2QsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0QsQ0FBQyxDQUFDO2dCQUNILEtBQUssR0FBRyxNQUFJLENBQUM7O2FBRWQ7O1FBVEgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtrQ0FBL0IsQ0FBQzs7O1NBVVQ7UUFDRCxPQUFPLEtBQUssQ0FBQzs7Ozs7O0lBRVAsZ0RBQVM7Ozs7Y0FBQyxJQUFJO1FBQ3BCLE9BQU8sSUFBSTthQUNGLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUEsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBR3JELHFEQUFjOzs7Ozs7OztJQUFkLFVBQWUsSUFBVyxFQUFFLFVBQWlCLEVBQUUsUUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlO1FBQWhHLGlCQXFEQzs7UUFuREMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXBCLFVBQVUsQ0FBQyxHQUFHLENBQUUsVUFBQyxLQUFLO1lBQ3BCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUUsVUFBQyxJQUFJOztZQUNiLElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztZQUUxQixRQUFRLENBQUMsR0FBRyxDQUFFLFVBQUMsS0FBSzs7Z0JBQ2xCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUVqQixJQUFJLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRztvQkFDVixLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQ3RDLENBQUMsQ0FBQztnQkFDSCxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7WUFFdEUsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsVUFBVSxDQUFDLEdBQUcsQ0FBRSxVQUFDLEtBQUs7O29CQUNwQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7b0JBQ2xDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7O29CQUNuQyxJQUFNLEtBQUssR0FBUSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7b0JBQzdDLElBQU0sS0FBSyxHQUFRLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUdsRCxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7d0JBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxDQUFDLEVBQUUsS0FBSzs0QkFDbEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7eUJBQy9GLENBQUMsQ0FBQztxQkFDSjt5QkFBSzt3QkFDSixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztxQkFDNUY7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7U0FDRixDQUFDLENBQUM7O1FBRUgsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRztZQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDekIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNMLElBQUksRUFBRSxHQUFHO1lBQ1QsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztLQUNIOztnQkF0SUYsVUFBVTs7dUNBVFg7Ozs7Ozs7O0lDMkhFLHNDQUNVLFlBQ0E7UUFEQSxlQUFVLEdBQVYsVUFBVTtRQUNWLGNBQVMsR0FBVCxTQUFTOytCQXBHTyxFQUFFO2lDQUdSLEVBQUU7MEJBR1QsRUFBRTsrQkFNRyxLQUFLOytCQUdMLEtBQUs7d0JBR0s7WUFDMUIsY0FBYyxFQUFFLEtBQUs7WUFDckIsY0FBYyxFQUFFLEtBQUs7WUFDckIsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDTCxvQkFBb0IsRUFBRSxNQUFNO29CQUM1QixjQUFjLEVBQUUsQ0FBQztvQkFFakIsa0JBQWtCLEVBQUUsTUFBTTtvQkFDMUIsc0JBQXNCLEVBQUUsS0FBSztvQkFDN0IsWUFBWSxFQUFFLENBQUM7b0JBRWYscUJBQXFCLEVBQUUsS0FBSztvQkFDNUIsZUFBZSxFQUFFLENBQUM7aUJBQ25CO2dCQUNELEtBQUssRUFBRTtvQkFDTCwwQkFBMEIsRUFBRSxPQUFPO29CQUNuQyxvQkFBb0IsRUFBRSxPQUFPO29CQUM3QixjQUFjLEVBQUUsQ0FBQztvQkFFakIsd0JBQXdCLEVBQUUsV0FBVztvQkFDckMsa0JBQWtCLEVBQUUsU0FBUztvQkFDN0Isc0JBQXNCLEVBQUUsUUFBUTtvQkFDaEMsWUFBWSxFQUFFLEdBQUc7b0JBRWpCLDJCQUEyQixFQUFFLFFBQVE7b0JBQ3JDLHFCQUFxQixFQUFFLEtBQUs7b0JBQzVCLGVBQWUsRUFBRSxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7K0JBTWlCLElBQUksWUFBWSxFQUFFO0tBOENuQzs7Ozs7SUF6Q08sNkNBQU07Ozs7Y0FBQyxNQUFNOzs7UUFDbkIsSUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUM5RixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNuRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxVQUFDLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEIsQ0FBQyxDQUFBO1NBQ0g7UUFDRCxPQUFPLE1BQU0sQ0FBQzs7Ozs7OztJQUVSLHdEQUFpQjs7Ozs7Y0FBQyxNQUFNLEVBQUUsU0FBUztRQUN6QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQzFCLElBQUksQ0FBQyxJQUFJLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O1lBQ2hELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9COzs7Ozs7O0lBRUgsNkRBQXNCOzs7OztJQUF0QixVQUF1QixZQUFZLEVBQUUsaUJBQWlCO1FBQ3BELE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0tBQ2xFOzs7O0lBQ0Qsb0RBQWE7OztJQUFiO1FBQ0UsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUN4Qzs7OztJQUNELG1EQUFZOzs7SUFBWjtRQUNFLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO0tBQzFCOzs7OztJQVFELGtEQUFXOzs7O0lBQVgsVUFBWSxPQUFZO1FBRXRCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUUsU0FBUyxDQUFDO1lBQzNCLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMzQztLQUNGOzs7OztJQUVPLGlFQUEwQjs7OztjQUFDLEtBQUs7O1FBQ3RDLElBQUksTUFBTSxDQUFDOztRQUNYLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsSUFBSTs7WUFDYixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxHQUFHLE9BQU8sRUFBRTtnQkFDaEIsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDWixNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7U0FDSCxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQzs7Ozs7SUFHaEIsK0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFOztZQUNoRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN4RCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvRTtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQy9CLENBQUM7S0FDSDs7OztJQUVLLHNEQUFlOzs7SUFBckI7Ozs7OzZCQUNNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFyQix3QkFBcUI7d0JBQ3ZCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFBOzt3QkFBN0MsU0FBNkMsQ0FBQzs7Ozs7O0tBRWpEOzs7Ozs7SUFFTSxpREFBVTs7Ozs7Y0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07O1lBRy9CLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkQsYUFBYSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztZQUN2QyxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7WUFFeEIsYUFBYSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFFL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7O1NBRTlDLENBQUMsQ0FBQTs7Ozs7O0lBR00sK0NBQVE7Ozs7Y0FBQyxJQUFJOztRQUNuQixJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztnQkFDYixJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ2xCLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLEdBQUcsRUFBRyxLQUFLLENBQUMsR0FBRzt3QkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7cUJBQ25CLENBQUMsQ0FBQztpQkFDSjthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxlQUFlLENBQUM7Ozs7OztJQUV6QiwrQ0FBUTs7OztJQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUMxQixDQUFDO0tBQ0g7O2dCQWpNRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsNmdCQUFvRDs7aUJBRXJEOzs7O2dCQVJRLHdCQUF3QjtnQkFDeEIsNEJBQTRCOzs7b0NBWWxDLEtBQUssU0FBQyxtQkFBbUI7NkJBR3pCLEtBQUssU0FBQyxZQUFZO3VCQUdsQixLQUFLLFNBQUMsTUFBTTtrQ0FHWixLQUFLLFNBQUMsaUJBQWlCO2tDQUd2QixLQUFLLFNBQUMsaUJBQWlCOzJCQUd2QixLQUFLLFNBQUMsVUFBVTtzQ0FtQ2hCLEtBQUssU0FBQyxxQkFBcUI7a0NBRzNCLE1BQU0sU0FBQyxpQkFBaUI7OEJBR3hCLFNBQVMsU0FBQyxhQUFhOzt1Q0FuRjFCOzs7Ozs7O0FDR0E7SUFtRUUsNkNBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7aUNBbERsQixFQUFFOzBCQUdULEVBQUU7K0JBR0csS0FBSzs2QkFHVTtZQUMvQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0wsb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsY0FBYyxFQUFFLENBQUM7b0JBRWpCLGtCQUFrQixFQUFFLFNBQVM7b0JBQzdCLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLFlBQVksRUFBRSxHQUFHO29CQUVqQixxQkFBcUIsRUFBRSxLQUFLO29CQUM1QixlQUFlLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLDBCQUEwQixFQUFFLE9BQU87b0JBQ25DLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQix3QkFBd0IsRUFBRSxXQUFXO29CQUNyQyxrQkFBa0IsRUFBRSxTQUFTO29CQUM3QixzQkFBc0IsRUFBRSxRQUFRO29CQUNoQyxZQUFZLEVBQUUsR0FBRztvQkFFakIsMkJBQTJCLEVBQUUsUUFBUTtvQkFDckMscUJBQXFCLEVBQUUsS0FBSztvQkFDNUIsZUFBZSxFQUFFLENBQUM7aUJBQ25CO2FBQ0Y7U0FDRjsrQkFHaUIsS0FBSzt3QkFHWixJQUFJLFlBQVksRUFBRTtLQUVhOzs7OztJQUUxQyxtREFBSzs7OztJQUFMLFVBQU0sS0FBSzs7UUFDVCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1RDtLQUNBOzs7OztJQUVELGlFQUFtQjs7OztJQUFuQixVQUFvQixLQUFLO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7SUFFRCw0REFBYzs7OztJQUFkLFVBQWUsS0FBSztRQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7Ozs7O0lBQ0QsNkRBQWU7Ozs7SUFBZixVQUFnQixLQUFLO1FBQ25CLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRztnQkFDaEMsc0JBQXNCLEVBQUUsUUFBUTtnQkFFaEMsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLFlBQVksRUFBRSxDQUFDO2dCQUNmLGVBQWUsRUFBRSxDQUFDO2dCQUVsQixvQkFBb0IsRUFBRSxnQkFBZ0I7Z0JBQ3RDLGtCQUFrQixFQUFFLFNBQVM7Z0JBQzdCLHFCQUFxQixFQUFFLEtBQUs7YUFDN0IsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRztnQkFDaEMsMEJBQTBCLEVBQUUsT0FBTztnQkFDbkMsd0JBQXdCLEVBQUUsU0FBUztnQkFDbkMsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0IsMkJBQTJCLEVBQUUsZ0JBQWdCO2dCQUU3QyxjQUFjLEVBQUUsQ0FBQztnQkFDakIsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLGVBQWUsRUFBRSxHQUFHO2dCQUVwQixvQkFBb0IsRUFBRSxNQUFNO2dCQUM1QixrQkFBa0IsRUFBRSxPQUFPO2dCQUMzQixxQkFBcUIsRUFBRSxLQUFLO2dCQUU1QixxQkFBcUIsRUFBRSxPQUFPO2dCQUM5QixtQkFBbUIsRUFBRSxNQUFNO2dCQUMzQixzQkFBc0IsRUFBRSxLQUFLO2FBQzlCLENBQUE7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHO2dCQUNoQyx3QkFBd0IsRUFBRSxRQUFRO2dCQUVsQyxjQUFjLEVBQUUsR0FBRztnQkFDbkIsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLGVBQWUsRUFBRSxHQUFHO2dCQUVwQixvQkFBb0IsRUFBRSxPQUFPO2dCQUM3QixrQkFBa0IsRUFBRSxNQUFNO2dCQUMxQixxQkFBcUIsRUFBRSxTQUFTO2FBQ2pDLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUc7Z0JBQ2hDLDBCQUEwQixFQUFFLFFBQVE7Z0JBQ3BDLHdCQUF3QixFQUFFLEtBQUs7Z0JBQy9CLHdCQUF3QixFQUFFLFNBQVM7Z0JBQ25DLDJCQUEyQixFQUFFLE1BQU07Z0JBRW5DLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixZQUFZLEVBQUUsR0FBRztnQkFDakIsZUFBZSxFQUFFLEdBQUc7Z0JBRXBCLG9CQUFvQixFQUFFLEtBQUs7Z0JBQzNCLGtCQUFrQixFQUFFLE1BQU07Z0JBQzFCLHFCQUFxQixFQUFFLFNBQVM7Z0JBRWhDLHFCQUFxQixFQUFFLE9BQU87Z0JBQzlCLG1CQUFtQixFQUFFLE1BQU07Z0JBQzNCLHNCQUFzQixFQUFFLEtBQUs7YUFDOUIsQ0FBQTtTQUNGO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7Ozs7SUFFRCxtREFBSzs7Ozs7SUFBTCxVQUFNLEtBQUssRUFBRSxJQUFJOztRQUNmLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxJQUFJLEtBQUssaUJBQWlCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztTQUM1RTthQUFNLElBQUksSUFBSSxLQUFLLGlCQUFpQixFQUFFO1lBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDNUU7YUFBTSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7OztJQUNPLHdEQUFVOzs7O1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsaUJBQWlCO1lBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUMsQ0FBQzs7O2dCQWxLTixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsb2hJQUEyRDs7aUJBRTVEOzs7O2dCQVJDLFFBQVE7OztvQ0FXUCxLQUFLLFNBQUMsbUJBQW1COzZCQUd6QixLQUFLLFNBQUMsWUFBWTtrQ0FHbEIsS0FBSyxTQUFDLGlCQUFpQjtnQ0FHdkIsS0FBSyxTQUFDLGVBQWU7a0NBb0NyQixLQUFLLFNBQUMsaUJBQWlCOzJCQUd2QixNQUFNLFNBQUMsVUFBVTs7OENBbkVwQjs7Ozs7OztBQ0FBOzs7O2dCQVNDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osNEJBQTRCO3dCQUM1QixtQ0FBbUM7cUJBQ3BDO29CQUNELE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7d0JBQzVCLG1DQUFtQztxQkFDcEM7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLDRCQUE0Qjt3QkFDNUIsbUNBQW1DO3FCQUNwQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsd0JBQXdCO3dCQUN4Qiw0QkFBNEI7cUJBQzdCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lCQUNsQzs7b0NBOUJEOzs7Ozs7Ozs7Ozs7Ozs7In0=
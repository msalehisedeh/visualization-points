import * as tslib_1 from "tslib";
import { Injectable, Component, Input, Output, ViewChild, EventEmitter, Renderer, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';
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
     * @param {?} points
     * @param {?} root
     * @return {?}
     */
    VisualizationPointsMaker.prototype.targetKeysFromGeneratedPoints = function (points, root) {
        var /** @type {?} */ targets = [];
        points.map(function (point) {
            var /** @type {?} */ path = point.key.split(".");
            var /** @type {?} */ pItem = root;
            var /** @type {?} */ foundArray = false;
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
    VisualizationPointsMaker.prototype.generatePoints = function (root, path, clear) {
        var _this = this;
        if (clear) {
            this.points = [];
        }
        if (root !== null) {
            Object.keys(root).map(function (key) {
                var /** @type {?} */ innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    _this.points.push({
                        key: innerPath,
                        value: _this.makeWords(innerPath)
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
    VisualizationPointsMaker.prototype.makeWords = function (name) {
        return name
            .replace(/\./g, ' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    return VisualizationPointsMaker;
}());
VisualizationPointsMaker.decorators = [
    { type: Injectable },
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
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.pushIfNotContain = function (array, entry) {
        var /** @type {?} */ found = false;
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
    VisualizationPointsEvaluator.prototype.pushInList = function (list, item, node, allowduplicates, groupduplicates, displayData) {
        var _this = this;
        var /** @type {?} */ found = undefined;
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
    VisualizationPointsEvaluator.prototype.eveluate = function (pItem, path) {
        var _this = this;
        var _loop_1 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                var /** @type {?} */ list_1 = [];
                pItem.map(function (item) {
                    list_1.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_1;
                return "break";
            }
        };
        for (var /** @type {?} */ i = 0; i < path.length; i++) {
            var state_1 = _loop_1(/** @type {?} */ i);
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
    VisualizationPointsEvaluator.prototype.eveluatedNode = function (pItem, path) {
        var _this = this;
        var _loop_2 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                var /** @type {?} */ list_2 = [];
                pItem.map(function (item) {
                    list_2.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_2;
                return "break";
            }
        };
        for (var /** @type {?} */ i = 0; i < path.length - 1; i++) {
            var state_2 = _loop_2(/** @type {?} */ i);
            if (state_2 === "break")
                break;
        }
        return pItem;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    VisualizationPointsEvaluator.prototype.makeWords = function (name) {
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
    VisualizationPointsEvaluator.prototype.evaluatePoints = function (data, pickPoints, primarys, allowduplicates, groupduplicates) {
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
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map(function (point) {
                    var /** @type {?} */ path = point.key.split(".");
                    var /** @type {?} */ list = innerMap[point.value];
                    var /** @type {?} */ pItem = _this.eveluate(item, path);
                    var /** @type {?} */ nodes = _this.eveluatedNode(item, path);
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
        var /** @type {?} */ rootList = [];
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
    return VisualizationPointsEvaluator;
}());
VisualizationPointsEvaluator.decorators = [
    { type: Injectable },
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
        this.allowduplicates = false;
        this.groupduplicates = false;
        this.tooltipEnabled = false;
        this.directionality = "L2R";
        this.nodeType = "Plain";
        this.onVisualization = new EventEmitter();
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
            this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries, this.allowduplicates, this.groupduplicates);
            var /** @type {?} */ sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
            window['initiateD3'](sizedupPoints, {
                tooltipEnabled: this.tooltipEnabled,
                directionality: this.directionality,
                displayNodeType: this.nodeType,
                targetDiv: "#d3-container"
            });
            this.onVisualization.emit(this.evaluatedPoints);
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
            this.onVisualization.emit([]);
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
     * @param {?} array
     * @return {?}
     */
    VisualizationPointsComponent.prototype.findReferenceStructureFrom = function (array) {
        var /** @type {?} */ result;
        var /** @type {?} */ maxSize = 0;
        array.map(function (item) {
            var /** @type {?} */ x = item ? Object.keys(item).length : 0;
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
    VisualizationPointsComponent.prototype.ngOnInit = function () {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
        if (this.data.length && this.enableConfiguration) {
            var /** @type {?} */ root = this.findReferenceStructureFrom(this.data);
            var /** @type {?} */ points = this.pointMaker.generatePoints(root, "", true);
            this.interestingPoints = points;
            this.targetKeys = this.pointMaker.targetKeysFromGeneratedPoints(points, root);
        }
        this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
    };
    /**
     * @return {?}
     */
    VisualizationPointsComponent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
                scriptElement.type = "text/javascript";
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
    VisualizationPointsComponent.prototype.onchange = function (event) {
        this.allowduplicates = event.allowduplicates;
        this.groupduplicates = event.groupduplicates;
        this.directionality = event.directionality;
        this.nodeType = event.nodeType;
        this.tooltipEnabled = event.tooltipEnabled;
        this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
    };
    return VisualizationPointsComponent;
}());
VisualizationPointsComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualization-points',
                template: "\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\n    <visualization-configuration\n        [interestingPoints]=\"interestingPoints\"\n        [targetKeys]=\"targetKeys\"\n        [allowduplicates]=\"allowduplicates\"\n        [groupduplicates]=\"groupduplicates\"\n        (onchange)=\"onchange($event)\"></visualization-configuration>\n</div>\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\n",
                styles: [":host{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n  display:table;\n  position:relative;\n  width:100%; }\n  :host #d3-container{\n    border:1px solid #633;\n    padding:0 5px;\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border-radius:5px;\n    background-color:#fefefe;\n    margin:5px; }\n  :host ::ng-deep .node circle{\n    cursor:pointer;\n    fill:#fff;\n    stroke:steelblue;\n    stroke-width:1.5px; }\n  :host ::ng-deep .node rect{\n    cursor:pointer;\n    fill:#fff;\n    stroke:steelblue;\n    stroke-width:1.5px; }\n  :host ::ng-deep div.tooltip{\n    position:absolute;\n    padding:5px;\n    font:12px sans-serif;\n    background:#cfcfcf;\n    border:1px solid #3a3939;\n    border-radius:4px;\n    pointer-events:none; }\n  :host ::ng-deep .node text{\n    font-size:11px;\n    font-weight:bold; }\n  :host ::ng-deep path.link{\n    fill:none;\n    stroke:#ccc;\n    stroke-width:1.5px; }\n"],
            },] },
];
/** @nocollapse */
VisualizationPointsComponent.ctorParameters = function () { return [
    { type: VisualizationPointsMaker, },
    { type: VisualizationPointsEvaluator, },
]; };
VisualizationPointsComponent.propDecorators = {
    "interestingPoints": [{ type: Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: Input, args: ["targetKeys",] },],
    "data": [{ type: Input, args: ["data",] },],
    "allowduplicates": [{ type: Input, args: ["allowduplicates",] },],
    "groupduplicates": [{ type: Input, args: ["groupduplicates",] },],
    "tooltipEnabled": [{ type: Input, args: ["tooltipEnabled",] },],
    "directionality": [{ type: Input, args: ["directionality",] },],
    "nodeType": [{ type: Input, args: ["nodeType",] },],
    "enableConfiguration": [{ type: Input, args: ["enableConfiguration",] },],
    "onVisualization": [{ type: Output, args: ["onVisualization",] },],
    "d3Container": [{ type: ViewChild, args: ["d3Container",] },],
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
        this.allowduplicates = false;
        this.tooltipEnabled = false;
        this.directionality = "L2R";
        this.nodeType = "Plain";
        this.groupduplicates = false;
        this.onchange = new EventEmitter();
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
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.chaneDirectionality = function (event) {
        this.directionality = event.target.value;
        this.emitChange();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.changeNodeType = function (event) {
        this.nodeType = event.target.value;
        this.emitChange();
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.click = function (event, item) {
        var /** @type {?} */ input = event.target;
        if (item === "allowduplicates") {
            this.allowduplicates = input.checked;
            this.groupduplicates = this.allowduplicates ? this.groupduplicates : false;
        }
        else if (item === "groupduplicates") {
            this.groupduplicates = input.checked;
            this.allowduplicates = this.groupduplicates ? true : this.allowduplicates;
        }
        else if (item === "tooltipEnabled") {
            this.tooltipEnabled = input.checked;
        }
        else {
            item.selected = (input.checked);
        }
        this.emitChange();
    };
    /**
     * @return {?}
     */
    VisualizationConfigurationComponent.prototype.emitChange = function () {
        this.onchange.emit({
            points: this.interestingPoints,
            keys: this.targetKeys,
            directionality: this.directionality,
            // L2R, R2T, TD - Left 2 Right, R 2 L, Top Down.
            nodeType: this.nodeType,
            // Plain, Rectangle, Cricle
            allowduplicates: this.allowduplicates,
            tooltipEnabled: this.tooltipEnabled,
            groupduplicates: this.groupduplicates
        });
    };
    return VisualizationConfigurationComponent;
}());
VisualizationConfigurationComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualization-configuration',
                template: "<p class=\"info\">\n    <span>\n        Pick points are the attributes in which you want to evaluate.\n        Target keys are the attributes in which evaluated data will be presented on.\n    </span>\n    <span>\n        For example: if you are examining users and pick user age and city as pick points,\n        data will be evaluated on city and age. And if you pick user name and gender as target keys,\n        for each age and city reference, you will see the resulting data as name and age values.</span>\n</p>\n<fieldset class=\"pick-points\">\n    <legend>Target Keys:</legend>\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\n        <input\n            type=\"checkbox\"\n            name=\"targetKey\"\n            [id]=\"'targetKey' + i\"\n            [value]=\"x.value\"\n            [checked]=\"x.selected ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, x)\" />\n        <span [textContent]=\"x.value\"></span>\n    </label>\n</fieldset>\n<fieldset class=\"pick-points\">\n    <legend>Pick Points:</legend>\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\n        <input\n            type=\"checkbox\"\n            name=\"pickpoint\"\n            [id]=\"'pickpoint' + i\"\n            [value]=\"x.value\"\n            [checked]=\"x.selected ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, x)\" />\n        <span [textContent]=\"x.value\"></span>\n    </label>\n</fieldset>\n<fieldset class=\"pick-points default\">\n    <legend>Presentation:</legend>\n    <label for=\"directionality\">Directionality:</label>\n    <select name=\"directionality\"\n            id=\"directionality\"\n            (change)=\"chaneDirectionality($event)\">\n        <option value=\"L2R\">Left to Right</option>\n        <option value=\"R2L\">Right to Left</option>\n        <option value=\"TD\">Top Down</option>\n    </select>\n    <label for=\"nodeType\">Node Type:</label>\n    <select name=\"nodeType\"\n            id=\"nodeType\"\n            (change)=\"changeNodeType($event)\">\n        <option value=\"Plain\">Plain</option>\n        <option value=\"Rectangle\">Rectangle</option>\n        <option value=\"Circle\">Circle</option>\n    </select>\n    <label for=\"tooltip\">\n        <input\n            type=\"checkbox\"\n            name=\"tooltip\"\n            id=\"tooltip\"\n            [checked]=\"tooltipEnabled ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, 'tooltipEnabled')\" />\n        <span>Enable Tool tip</span>\n    </label>\n</fieldset>\n<fieldset class=\"pick-points\">\n    <legend>Duplicates In result set:</legend>\n    <label for=\"allowduplicates\">\n        <input\n            type=\"checkbox\"\n            name=\"allowduplicates\"\n            id=\"allowduplicates\"\n            [value]=\"allowduplicates\"\n            [checked]=\"allowduplicates ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, 'allowduplicates')\" />\n        <span>Allow Duplicates</span>\n    </label>\n    <label for=\"groupduplicates\">\n        <input\n            type=\"checkbox\"\n            name=\"groupduplicates\"\n            id=\"groupduplicates\"\n            [value]=\"groupduplicates\"\n            [checked]=\"groupduplicates ? true: null\"\n            (keyup)=\"keyup($event)\"\n            (click)=\"click($event, 'groupduplicates')\" />\n        <span>Group Duplicates</span>\n    </label>\n</fieldset>\n",
                styles: [":host{\n  -webkit-box-sizing:border-box;\n          box-sizing:border-box;\n  display:table;\n  padding:5px; }\n  :host .info{\n    padding:5px 0;\n    margin:0;\n    font-size:0.9em; }\n  :host .pick-points{\n    -webkit-box-sizing:border-box;\n            box-sizing:border-box;\n    border:1px solid #633;\n    display:block;\n    float:left;\n    padding:0 0 5px 0;\n    width:100%;\n    margin:0;\n    border-radius:5px;\n    background-color:#fefefe; }\n    :host .pick-points legend{\n      font-weight:bold;\n      margin-left:20px;\n      color:#633; }\n    :host .pick-points label{\n      display:inline-table;\n      width:24.33%; }\n      :host .pick-points label:hover{\n        color:#ca0000; }\n    :host .pick-points.default label{\n      width:15%;\n      text-align:right; }\n"],
            },] },
];
/** @nocollapse */
VisualizationConfigurationComponent.ctorParameters = function () { return [
    { type: Renderer, },
]; };
VisualizationConfigurationComponent.propDecorators = {
    "interestingPoints": [{ type: Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: Input, args: ["targetKeys",] },],
    "allowduplicates": [{ type: Input, args: ["allowduplicates",] },],
    "tooltipEnabled": [{ type: Input, args: ["tooltipEnabled",] },],
    "directionality": [{ type: Input, args: ["directionality",] },],
    "nodeType": [{ type: Input, args: ["nodeType",] },],
    "groupduplicates": [{ type: Input, args: ["groupduplicates",] },],
    "onchange": [{ type: Output, args: ["onchange",] },],
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
            },] },
];
/** @nocollapse */
VisualizationPointsModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */
export { VisualizationPointsComponent, VisualizationConfigurationComponent, VisualizationPointsModule, VisualizationPointsEvaluator as ɵb, VisualizationPointsMaker as ɵa };
//# sourceMappingURL=visualization-points.js.map

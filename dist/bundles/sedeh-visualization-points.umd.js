(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/visualization-points', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['visualization-points'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

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

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

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
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
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

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /*
     * This object will traverse through a given json object and finds all the attributes of
     * the object and its related associations within the json. The resulting structure would be
     * name of attributes and a pathway to reach the attribute deep in object heirarchy.
     */
    var VisualizationPointsMaker = /** @class */ (function () {
        function VisualizationPointsMaker() {
            this.points = [];
        }
        VisualizationPointsMaker.prototype.targetKeysFromGeneratedPoints = function (points, root) {
            var targets = [];
            points.map(function (point) {
                var path = point.key.split(".");
                var pItem = root;
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
        VisualizationPointsMaker.prototype.generatePoints = function (root, path, clear) {
            var _this = this;
            if (clear) {
                this.points = [];
            }
            if (root !== null) {
                Object.keys(root).map(function (key) {
                    var innerPath = (path.length ? (path + "." + key) : key);
                    if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                        _this.points.push({
                            key: innerPath,
                            value: _this.makeWords(innerPath)
                        });
                    }
                    else if (root[key] instanceof Array) {
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
        VisualizationPointsMaker.prototype.makeWords = function (name) {
            return name
                .replace(/\./g, ' ~ ')
                .replace(/([A-Z])/g, ' $1')
                .replace(/-/g, " ")
                .replace(/_/g, " ")
                .replace(/^./, function (str) { return str.toUpperCase(); });
        };
        VisualizationPointsMaker = __decorate([
            core.Injectable()
        ], VisualizationPointsMaker);
        return VisualizationPointsMaker;
    }());

    /*
     * This object will traverse through a given json object and finds all the attributes of
     * the object and its related associations within the json. The resulting structure would be
     * name of attributes and a pathway to reach the attribute deep in object heirarchy.
     */
    var VisualizationPointsEvaluator = /** @class */ (function () {
        function VisualizationPointsEvaluator() {
        }
        VisualizationPointsEvaluator.prototype.pushIfNotContain = function (array, entry) {
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
        VisualizationPointsEvaluator.prototype.pushInList = function (list, item, node, allowduplicates, groupduplicates, displayData) {
            var _this = this;
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
        VisualizationPointsEvaluator.prototype.eveluate = function (pItem, path) {
            var _this = this;
            var _loop_1 = function (i) {
                pItem = pItem ? pItem[path[i]] : pItem;
                if (pItem instanceof Array) {
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
        VisualizationPointsEvaluator.prototype.eveluatedNode = function (pItem, path) {
            var _this = this;
            var _loop_2 = function (i) {
                pItem = pItem ? pItem[path[i]] : pItem;
                if (pItem instanceof Array) {
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
        VisualizationPointsEvaluator.prototype.makeWords = function (name) {
            return name
                .replace(/([A-Z])/g, ' $1')
                .replace(/-/g, " ")
                .replace(/_/g, " ")
                .replace(/^./, function (str) { return str.toUpperCase(); });
        };
        VisualizationPointsEvaluator.prototype.evaluatePoints = function (data, pickPoints, primarys, allowduplicates, groupduplicates) {
            var _this = this;
            var innerMap = {};
            pickPoints.map(function (point) {
                innerMap[point.value] = [];
            });
            data.map(function (item) {
                var displayData = [];
                primarys.map(function (point) {
                    var path = point.key.split(".");
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
                        var path = point.key.split(".");
                        var list = innerMap[point.value];
                        var pItem = _this.eveluate(item, path);
                        var nodes = _this.eveluatedNode(item, path);
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
        VisualizationPointsEvaluator = __decorate([
            core.Injectable()
        ], VisualizationPointsEvaluator);
        return VisualizationPointsEvaluator;
    }());

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
            this.onVisualization = new core.EventEmitter();
        }
        VisualizationPointsComponent.prototype.sizeUp = function (points) {
            var _this = this;
            var size = (points.children && points.children.length) ? points.children.length : undefined;
            if (size) {
                points.name += points.children.length > 1 ? " (" + size + ")" : "";
                points.children.map(function (p) {
                    _this.sizeUp(p);
                });
            }
            return points;
        };
        VisualizationPointsComponent.prototype.triggerEvaluation = function (points, primaries) {
            if (points.length && primaries.length) {
                this.d3Container.nativeElement.innerHTML = "";
                this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries, this.allowduplicates, this.groupduplicates);
                var sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
                window['initiateD3'](sizedupPoints, this.settings);
                this.onVisualization.emit(this.evaluatedPoints);
            }
            else {
                this.d3Container.nativeElement.innerHTML = "";
                this.onVisualization.emit([]);
            }
        };
        VisualizationPointsComponent.prototype.updateNodeDataRefrence = function (originalNode, refrenceAttribute) {
            window['updateNodeDataRefrence'](originalNode, refrenceAttribute);
        };
        VisualizationPointsComponent.prototype.startBlinking = function () {
            window['startBlinking'](this.settings);
        };
        VisualizationPointsComponent.prototype.stopBlinking = function () {
            window['stopBlinking']();
        };
        VisualizationPointsComponent.prototype.ngOnChanges = function (changes) {
            if (changes.data) {
                this.interestingPoints = undefined;
                this.targetKeys = undefined;
                setTimeout(this.ngOnInit.bind(this), 333);
            }
        };
        VisualizationPointsComponent.prototype.findReferenceStructureFrom = function (array) {
            var result;
            var maxSize = 0;
            array.map(function (item) {
                var x = item ? Object.keys(item).length : 0;
                if (x > maxSize) {
                    maxSize = x;
                    result = item;
                }
            });
            return result;
        };
        VisualizationPointsComponent.prototype.ngOnInit = function () {
            if (!(this.data instanceof Array)) {
                this.data = [this.data];
            }
            if (this.data.length && this.enableConfiguration) {
                var root = this.findReferenceStructureFrom(this.data);
                var points = this.pointMaker.generatePoints(root, "", true);
                this.interestingPoints = points;
                this.targetKeys = this.pointMaker.targetKeysFromGeneratedPoints(points, root);
            }
            this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
        };
        VisualizationPointsComponent.prototype.ngAfterViewInit = function () {
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
        VisualizationPointsComponent.prototype.loadScript = function (url, id) {
            return new Promise(function (resolve, reject) {
                // const script = document.getElementById(id);
                // if (!script) {
                var scriptElement = document.createElement('script');
                scriptElement.type = "text/javascript";
                scriptElement.src = url;
                // scriptElement.id = id;
                scriptElement.onload = resolve;
                document.body.appendChild(scriptElement);
                // }
            });
        };
        VisualizationPointsComponent.prototype.sanitize = function (list) {
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
        VisualizationPointsComponent.prototype.onchange = function (event) {
            this.allowduplicates = event.allowduplicates;
            this.groupduplicates = event.groupduplicates;
            this.settings = event.configuration;
            this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
        };
        VisualizationPointsComponent.ctorParameters = function () { return [
            { type: VisualizationPointsMaker },
            { type: VisualizationPointsEvaluator }
        ]; };
        __decorate([
            core.Input("interestingPoints")
        ], VisualizationPointsComponent.prototype, "interestingPoints", void 0);
        __decorate([
            core.Input("targetKeys")
        ], VisualizationPointsComponent.prototype, "targetKeys", void 0);
        __decorate([
            core.Input("data")
        ], VisualizationPointsComponent.prototype, "data", void 0);
        __decorate([
            core.Input("allowduplicates")
        ], VisualizationPointsComponent.prototype, "allowduplicates", void 0);
        __decorate([
            core.Input("groupduplicates")
        ], VisualizationPointsComponent.prototype, "groupduplicates", void 0);
        __decorate([
            core.Input("settings")
        ], VisualizationPointsComponent.prototype, "settings", void 0);
        __decorate([
            core.Input("enableConfiguration")
        ], VisualizationPointsComponent.prototype, "enableConfiguration", void 0);
        __decorate([
            core.Output("onVisualization")
        ], VisualizationPointsComponent.prototype, "onVisualization", void 0);
        __decorate([
            core.ViewChild("d3Container", { static: false })
        ], VisualizationPointsComponent.prototype, "d3Container", void 0);
        VisualizationPointsComponent = __decorate([
            core.Component({
                selector: 'visualization-points',
                template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
                styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
            })
        ], VisualizationPointsComponent);
        return VisualizationPointsComponent;
    }());

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
            this.onchange = new core.EventEmitter();
        }
        VisualizationConfigurationComponent.prototype.keyup = function (event) {
            var code = event.which;
            if (code === 13) {
                this.renderer.invokeElementMethod(event.target, "click");
            }
        };
        VisualizationConfigurationComponent.prototype.chaneDirectionality = function (event) {
            this.configuration.directionality = event.target.value;
            this.emitChange();
        };
        VisualizationConfigurationComponent.prototype.changeNodeType = function (event) {
            this.configuration.nodeType = event.target.value;
            this.emitChange();
        };
        VisualizationConfigurationComponent.prototype.changeColorSets = function (event) {
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
        VisualizationConfigurationComponent.prototype.click = function (event, item) {
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
        VisualizationConfigurationComponent.prototype.emitChange = function () {
            this.onchange.emit({
                points: this.interestingPoints,
                keys: this.targetKeys,
                allowduplicates: this.allowduplicates,
                configuration: this.configuration
            });
        };
        VisualizationConfigurationComponent.ctorParameters = function () { return [
            { type: core.Renderer }
        ]; };
        __decorate([
            core.Input("interestingPoints")
        ], VisualizationConfigurationComponent.prototype, "interestingPoints", void 0);
        __decorate([
            core.Input("targetKeys")
        ], VisualizationConfigurationComponent.prototype, "targetKeys", void 0);
        __decorate([
            core.Input("allowduplicates")
        ], VisualizationConfigurationComponent.prototype, "allowduplicates", void 0);
        __decorate([
            core.Input("configuration")
        ], VisualizationConfigurationComponent.prototype, "configuration", void 0);
        __decorate([
            core.Input("groupduplicates")
        ], VisualizationConfigurationComponent.prototype, "groupduplicates", void 0);
        __decorate([
            core.Output("onchange")
        ], VisualizationConfigurationComponent.prototype, "onchange", void 0);
        VisualizationConfigurationComponent = __decorate([
            core.Component({
                selector: 'visualization-configuration',
                template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
                styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
            })
        ], VisualizationConfigurationComponent);
        return VisualizationConfigurationComponent;
    }());

    var VisualizationPointsModule = /** @class */ (function () {
        function VisualizationPointsModule() {
        }
        VisualizationPointsModule = __decorate([
            core.NgModule({
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
            })
        ], VisualizationPointsModule);
        return VisualizationPointsModule;
    }());

    exports.VisualizationConfigurationComponent = VisualizationConfigurationComponent;
    exports.VisualizationPointsComponent = VisualizationPointsComponent;
    exports.VisualizationPointsModule = VisualizationPointsModule;
    exports.ɵa = VisualizationPointsMaker;
    exports.ɵb = VisualizationPointsEvaluator;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-visualization-points.umd.js.map

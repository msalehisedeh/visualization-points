import { __decorate, __awaiter } from 'tslib';
import { Injectable, EventEmitter, Input, Output, ViewChild, Component, Renderer, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
let VisualizationPointsMaker = class VisualizationPointsMaker {
    constructor() {
        this.points = [];
    }
    targetKeysFromGeneratedPoints(points, root) {
        const targets = [];
        points.map((point) => {
            const path = point.key.split(".");
            let pItem = root;
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
    generatePoints(root, path, clear) {
        if (clear) {
            this.points = [];
        }
        if (root !== null) {
            Object.keys(root).map((key) => {
                const innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    this.points.push({
                        key: innerPath,
                        value: this.makeWords(innerPath)
                    });
                }
                else if (root[key] instanceof Array) {
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
    makeWords(name) {
        return name
            .replace(/\./g, ' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    }
};
VisualizationPointsMaker = __decorate([
    Injectable()
], VisualizationPointsMaker);

/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
let VisualizationPointsEvaluator = class VisualizationPointsEvaluator {
    pushIfNotContain(array, entry) {
        let found = false;
        array.map((item) => {
            if (item.name.indexOf(entry.name) > -1) {
                found = true;
            }
        });
        if (!found) {
            array.push(entry);
        }
    }
    pushInList(list, item, node, allowduplicates, groupduplicates, displayData) {
        let found = undefined;
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
        list.map((subItem) => {
            if (subItem.name === item) {
                found = subItem;
                this.pushIfNotContain(subItem.children, displayData);
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
    }
    eveluate(pItem, path) {
        for (let i = 0; i < path.length; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                const list = [];
                pItem.map((item) => {
                    list.push(this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list;
                break;
            }
        }
        return pItem;
    }
    eveluatedNode(pItem, path) {
        for (let i = 0; i < path.length - 1; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                const list = [];
                pItem.map((item) => {
                    list.push(this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list;
                break;
            }
        }
        return pItem;
    }
    makeWords(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    }
    evaluatePoints(data, pickPoints, primarys, allowduplicates, groupduplicates) {
        const innerMap = {};
        pickPoints.map((point) => {
            innerMap[point.value] = [];
        });
        data.map((item) => {
            let displayData = [];
            primarys.map((point) => {
                const path = point.key.split(".");
                let pItem = item;
                path.map((key) => {
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map((point) => {
                    const path = point.key.split(".");
                    const list = innerMap[point.value];
                    const pItem = this.eveluate(item, path);
                    const nodes = this.eveluatedNode(item, path);
                    let found = false;
                    if (pItem instanceof Array) {
                        pItem.map((p, index) => {
                            this.pushInList(list, p, nodes[index], allowduplicates, groupduplicates, { name: displayData });
                        });
                    }
                    else {
                        this.pushInList(list, pItem, nodes, allowduplicates, groupduplicates, { name: displayData });
                    }
                });
            }
        });
        const rootList = [];
        Object.keys(innerMap).map((key) => {
            rootList.push({
                name: this.makeWords(key),
                children: innerMap[key]
            });
        });
        return {
            name: "/",
            children: rootList
        };
    }
};
VisualizationPointsEvaluator = __decorate([
    Injectable()
], VisualizationPointsEvaluator);

let VisualizationPointsComponent = class VisualizationPointsComponent {
    constructor(pointMaker, evaluator) {
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
    sizeUp(points) {
        const size = (points.children && points.children.length) ? points.children.length : undefined;
        if (size) {
            points.name += points.children.length > 1 ? " (" + size + ")" : "";
            points.children.map((p) => {
                this.sizeUp(p);
            });
        }
        return points;
    }
    triggerEvaluation(points, primaries) {
        if (points.length && primaries.length) {
            this.d3Container.nativeElement.innerHTML = "";
            this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries, this.allowduplicates, this.groupduplicates);
            const sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
            window['initiateD3'](sizedupPoints, this.settings);
            this.onVisualization.emit(this.evaluatedPoints);
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
            this.onVisualization.emit([]);
        }
    }
    updateNodeDataRefrence(originalNode, refrenceAttribute) {
        window['updateNodeDataRefrence'](originalNode, refrenceAttribute);
    }
    startBlinking() {
        window['startBlinking'](this.settings);
    }
    stopBlinking() {
        window['stopBlinking']();
    }
    ngOnChanges(changes) {
        if (changes.data) {
            this.interestingPoints = undefined;
            this.targetKeys = undefined;
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    }
    findReferenceStructureFrom(array) {
        let result;
        let maxSize = 0;
        array.map((item) => {
            let x = item ? Object.keys(item).length : 0;
            if (x > maxSize) {
                maxSize = x;
                result = item;
            }
        });
        return result;
    }
    ngOnInit() {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
        if (this.data.length && this.enableConfiguration) {
            const root = this.findReferenceStructureFrom(this.data);
            const points = this.pointMaker.generatePoints(root, "", true);
            this.interestingPoints = points;
            this.targetKeys = this.pointMaker.targetKeysFromGeneratedPoints(points, root);
        }
        this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
    }
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!window['initiateD3']) {
                yield this.loadScript("assets/d3.js", 'd3js');
            }
        });
    }
    loadScript(url, id) {
        return new Promise((resolve, reject) => {
            // const script = document.getElementById(id);
            // if (!script) {
            const scriptElement = document.createElement('script');
            scriptElement.type = "text/javascript";
            scriptElement.src = url;
            // scriptElement.id = id;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
            // }
        });
    }
    sanitize(list) {
        const sanitizedPoints = [];
        if (list && list.length) {
            list.map((point) => {
                if (point.selected) {
                    sanitizedPoints.push({
                        key: point.key,
                        value: point.value
                    });
                }
            });
        }
        return sanitizedPoints;
    }
    onchange(event) {
        this.allowduplicates = event.allowduplicates;
        this.groupduplicates = event.groupduplicates;
        this.settings = event.configuration;
        this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
    }
};
VisualizationPointsComponent.ctorParameters = () => [
    { type: VisualizationPointsMaker },
    { type: VisualizationPointsEvaluator }
];
__decorate([
    Input("interestingPoints")
], VisualizationPointsComponent.prototype, "interestingPoints", void 0);
__decorate([
    Input("targetKeys")
], VisualizationPointsComponent.prototype, "targetKeys", void 0);
__decorate([
    Input("data")
], VisualizationPointsComponent.prototype, "data", void 0);
__decorate([
    Input("allowduplicates")
], VisualizationPointsComponent.prototype, "allowduplicates", void 0);
__decorate([
    Input("groupduplicates")
], VisualizationPointsComponent.prototype, "groupduplicates", void 0);
__decorate([
    Input("settings")
], VisualizationPointsComponent.prototype, "settings", void 0);
__decorate([
    Input("enableConfiguration")
], VisualizationPointsComponent.prototype, "enableConfiguration", void 0);
__decorate([
    Output("onVisualization")
], VisualizationPointsComponent.prototype, "onVisualization", void 0);
__decorate([
    ViewChild("d3Container", { static: false })
], VisualizationPointsComponent.prototype, "d3Container", void 0);
VisualizationPointsComponent = __decorate([
    Component({
        selector: 'visualization-points',
        template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
        styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
    })
], VisualizationPointsComponent);

let VisualizationConfigurationComponent = class VisualizationConfigurationComponent {
    constructor(renderer) {
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
    keyup(event) {
        const code = event.which;
        if (code === 13) {
            this.renderer.invokeElementMethod(event.target, "click");
        }
    }
    chaneDirectionality(event) {
        this.configuration.directionality = event.target.value;
        this.emitChange();
    }
    changeNodeType(event) {
        this.configuration.nodeType = event.target.value;
        this.emitChange();
    }
    changeColorSets(event) {
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
    }
    click(event, item) {
        const input = event.target;
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
    }
    emitChange() {
        this.onchange.emit({
            points: this.interestingPoints,
            keys: this.targetKeys,
            allowduplicates: this.allowduplicates,
            configuration: this.configuration
        });
    }
};
VisualizationConfigurationComponent.ctorParameters = () => [
    { type: Renderer }
];
__decorate([
    Input("interestingPoints")
], VisualizationConfigurationComponent.prototype, "interestingPoints", void 0);
__decorate([
    Input("targetKeys")
], VisualizationConfigurationComponent.prototype, "targetKeys", void 0);
__decorate([
    Input("allowduplicates")
], VisualizationConfigurationComponent.prototype, "allowduplicates", void 0);
__decorate([
    Input("configuration")
], VisualizationConfigurationComponent.prototype, "configuration", void 0);
__decorate([
    Input("groupduplicates")
], VisualizationConfigurationComponent.prototype, "groupduplicates", void 0);
__decorate([
    Output("onchange")
], VisualizationConfigurationComponent.prototype, "onchange", void 0);
VisualizationConfigurationComponent = __decorate([
    Component({
        selector: 'visualization-configuration',
        template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
        styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
    })
], VisualizationConfigurationComponent);

let VisualizationPointsModule = class VisualizationPointsModule {
};
VisualizationPointsModule = __decorate([
    NgModule({
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
    })
], VisualizationPointsModule);

/**
 * Generated bundle index. Do not edit.
 */

export { VisualizationConfigurationComponent, VisualizationPointsComponent, VisualizationPointsModule, VisualizationPointsMaker as ɵa, VisualizationPointsEvaluator as ɵb };
//# sourceMappingURL=sedeh-visualization-points.js.map

import { Injectable, Component, Input, Output, ViewChild, EventEmitter, Renderer, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { __awaiter } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizationPointsMaker {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizationPointsEvaluator {
    /**
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    pushIfNotContain(array, entry) {
        /** @type {?} */
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
    /**
     * @param {?} list
     * @param {?} item
     * @param {?} node
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @param {?} displayData
     * @return {?}
     */
    pushInList(list, item, node, allowduplicates, groupduplicates, displayData) {
        /** @type {?} */
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
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    eveluate(pItem, path) {
        for (let i = 0; i < path.length; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
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
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    eveluatedNode(pItem, path) {
        for (let i = 0; i < path.length - 1; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
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
    /**
     * @param {?} name
     * @return {?}
     */
    makeWords(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    }
    /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @return {?}
     */
    evaluatePoints(data, pickPoints, primarys, allowduplicates, groupduplicates) {
        /** @type {?} */
        const innerMap = {};
        pickPoints.map((point) => {
            innerMap[point.value] = [];
        });
        data.map((item) => {
            /** @type {?} */
            let displayData = [];
            primarys.map((point) => {
                /** @type {?} */
                const path = point.key.split(".");
                /** @type {?} */
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
                    /** @type {?} */
                    const path = point.key.split(".");
                    /** @type {?} */
                    const list = innerMap[point.value];
                    /** @type {?} */
                    const pItem = this.eveluate(item, path);
                    /** @type {?} */
                    const nodes = this.eveluatedNode(item, path);
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
        /** @type {?} */
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
}
VisualizationPointsEvaluator.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizationPointsComponent {
    /**
     * @param {?} pointMaker
     * @param {?} evaluator
     */
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
    /**
     * @param {?} points
     * @return {?}
     */
    sizeUp(points) {
        /** @type {?} */
        const size = (points.children && points.children.length) ? points.children.length : undefined;
        if (size) {
            points.name += points.children.length > 1 ? " (" + size + ")" : "";
            points.children.map((p) => {
                this.sizeUp(p);
            });
        }
        return points;
    }
    /**
     * @param {?} points
     * @param {?} primaries
     * @return {?}
     */
    triggerEvaluation(points, primaries) {
        if (points.length && primaries.length) {
            this.d3Container.nativeElement.innerHTML = "";
            this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries, this.allowduplicates, this.groupduplicates);
            /** @type {?} */
            const sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
            window['initiateD3'](sizedupPoints, this.settings);
            this.onVisualization.emit(this.evaluatedPoints);
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
            this.onVisualization.emit([]);
        }
    }
    /**
     * @param {?} originalNode
     * @param {?} refrenceAttribute
     * @return {?}
     */
    updateNodeDataRefrence(originalNode, refrenceAttribute) {
        window['updateNodeDataRefrence'](originalNode, refrenceAttribute);
    }
    /**
     * @return {?}
     */
    startBlinking() {
        window['startBlinking'](this.settings);
    }
    /**
     * @return {?}
     */
    stopBlinking() {
        window['stopBlinking']();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data) {
            this.interestingPoints = undefined;
            this.targetKeys = undefined;
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    }
    /**
     * @param {?} array
     * @return {?}
     */
    findReferenceStructureFrom(array) {
        /** @type {?} */
        let result;
        /** @type {?} */
        let maxSize = 0;
        array.map((item) => {
            /** @type {?} */
            let x = item ? Object.keys(item).length : 0;
            if (x > maxSize) {
                maxSize = x;
                result = item;
            }
        });
        return result;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!(this.data instanceof Array)) {
            this.data = [this.data];
        }
        if (this.data.length && this.enableConfiguration) {
            /** @type {?} */
            const root = this.findReferenceStructureFrom(this.data);
            /** @type {?} */
            const points = this.pointMaker.generatePoints(root, "", true);
            this.interestingPoints = points;
            this.targetKeys = this.pointMaker.targetKeysFromGeneratedPoints(points, root);
        }
        this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!window['initiateD3']) {
                yield this.loadScript("assets/d3.js", 'd3js');
            }
        });
    }
    /**
     * @param {?} url
     * @param {?} id
     * @return {?}
     */
    loadScript(url, id) {
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const scriptElement = document.createElement('script');
            scriptElement.type = "text/javascript";
            scriptElement.src = url;
            // scriptElement.id = id;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
            // }
        });
    }
    /**
     * @param {?} list
     * @return {?}
     */
    sanitize(list) {
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    onchange(event) {
        this.allowduplicates = event.allowduplicates;
        this.groupduplicates = event.groupduplicates;
        this.settings = event.configuration;
        this.triggerEvaluation(this.sanitize(event.points), this.sanitize(event.keys));
    }
}
VisualizationPointsComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualization-points',
                template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
                styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
            }] }
];
/** @nocollapse */
VisualizationPointsComponent.ctorParameters = () => [
    { type: VisualizationPointsMaker },
    { type: VisualizationPointsEvaluator }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizationConfigurationComponent {
    /**
     * @param {?} renderer
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            this.renderer.invokeElementMethod(event.target, "click");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    chaneDirectionality(event) {
        this.configuration.directionality = event.target.value;
        this.emitChange();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    changeNodeType(event) {
        this.configuration.nodeType = event.target.value;
        this.emitChange();
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    click(event, item) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    emitChange() {
        this.onchange.emit({
            points: this.interestingPoints,
            keys: this.targetKeys,
            allowduplicates: this.allowduplicates,
            configuration: this.configuration
        });
    }
}
VisualizationConfigurationComponent.decorators = [
    { type: Component, args: [{
                selector: 'visualization-configuration',
                template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
                styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
            }] }
];
/** @nocollapse */
VisualizationConfigurationComponent.ctorParameters = () => [
    { type: Renderer }
];
VisualizationConfigurationComponent.propDecorators = {
    interestingPoints: [{ type: Input, args: ["interestingPoints",] }],
    targetKeys: [{ type: Input, args: ["targetKeys",] }],
    allowduplicates: [{ type: Input, args: ["allowduplicates",] }],
    configuration: [{ type: Input, args: ["configuration",] }],
    groupduplicates: [{ type: Input, args: ["groupduplicates",] }],
    onchange: [{ type: Output, args: ["onchange",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class VisualizationPointsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { VisualizationPointsComponent, VisualizationConfigurationComponent, VisualizationPointsModule, VisualizationPointsEvaluator as ɵb, VisualizationPointsMaker as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtdmlzdWFsaXphdGlvbi1wb2ludHMuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyLnRzIiwibmc6Ly9Ac2VkZWgvdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3IudHMiLCJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWaXN1YWxpemF0aW9uUG9pbnQge1xyXG4gIGtleTogc3RyaW5nLFxyXG4gIHZhbHVlOiBzdHJpbmdcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIHtcclxuICBwcml2YXRlIHBvaW50czogVmlzdWFsaXphdGlvblBvaW50W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICB0YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHM6YW55W10sIHJvb3Q6e30pIHtcclxuICAgIGNvbnN0IHRhcmdldHMgPSBbXTtcclxuXHJcbiAgICBwb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgIGxldCBwSXRlbSA9IHJvb3Q7XHJcbiAgICAgIGxldCBmb3VuZEFycmF5ID0gZmFsc2U7XHJcblxyXG4gICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkubGVuZ3RoID09PSAwIHx8IHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHBJdGVtID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgZm91bmRBcnJheSA9IHRydWU7IFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZm91bmRBcnJheSkge1xyXG4gICAgICAgIHRhcmdldHMucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBvaW50KSkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0YXJnZXRzO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVQb2ludHMocm9vdDoge30sIHBhdGg6IHN0cmluZywgY2xlYXI6IGJvb2xlYW4pIHtcclxuXHJcbiAgICBpZiAoY2xlYXIpIHtcclxuICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmIChyb290ICE9PSBudWxsKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHJvb3QpLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlubmVyUGF0aCA9IChwYXRoLmxlbmd0aCA/IChwYXRoICsgXCIuXCIgKyBrZXkpIDoga2V5KTtcclxuICBcclxuICAgICAgICBpZiAodHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiByb290W2tleV0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5OiBpbm5lclBhdGgsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAocm9vdFtrZXldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSByb290W2tleV07XHJcbiAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgIShub2RlWzBdIGluc3RhbmNlb2YgQXJyYXkpICYmICh0eXBlb2Ygbm9kZVswXSAhPT0gXCJzdHJpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVBvaW50cyhub2RlWzBdLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiB0aGlzLm1ha2VXb3Jkcyhpbm5lclBhdGgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMocm9vdFtrZXldLCBpbm5lclBhdGgsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMucG9pbnRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLi9nLCcgfiAnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14uLywgKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCkpO1xyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3Ige1xyXG4gIHByaXZhdGUgcHVzaElmTm90Q29udGFpbihhcnJheSwgZW50cnkpIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lLmluZGV4T2YoZW50cnkubmFtZSkgPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoSW5MaXN0KGxpc3QsIGl0ZW0sIG5vZGUsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCBkaXNwbGF5RGF0YSkge1xyXG4gICAgbGV0IGZvdW5kOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaXRlbSA9IGl0ZW0gaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW0uam9pbihcIlwiKSA6IGl0ZW07XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0udHJpbSgpLmxlbmd0aCA/IGl0ZW0gOiBcIkJMQU5LXCI7XHJcbiAgICB9ZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtPyBcInRydWVcIjpcImZhbHNlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtID0gaXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Lm1hcCggKHN1Ykl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3ViSXRlbS5uYW1lID09PSBpdGVtKSB7XHJcbiAgICAgICAgZm91bmQgPSBzdWJJdGVtO1xyXG4gICAgICAgIHRoaXMucHVzaElmTm90Q29udGFpbihzdWJJdGVtLmNoaWxkcmVuLCBkaXNwbGF5RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBpdGVtICE9PSBudWxsICkge1xyXG4gICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdyb3VwZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgZm91bmQuY2hpbGRyZW4ucHVzaChkaXNwbGF5RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd2R1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVsdWF0ZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBldmVsdWF0ZWROb2RlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlUG9pbnRzKGRhdGE6IGFueVtdLCBwaWNrUG9pbnRzOiBhbnlbXSwgcHJpbWFyeXM6IGFueVtdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcykge1xyXG5cclxuICAgIGNvbnN0IGlubmVyTWFwID0ge307XHJcblxyXG4gICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBpbm5lck1hcFtwb2ludC52YWx1ZV0gPSBbXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgZGlzcGxheURhdGE6IGFueSA9IFtdO1xyXG5cclxuICAgICAgcHJpbWFyeXMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgcEl0ZW0gPSBpdGVtO1xyXG5cclxuICAgICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gKHBJdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBwSXRlbSk7XHJcbiAgICAgICAgZGlzcGxheURhdGEucHVzaChTdHJpbmcocEl0ZW0pKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEubGVuZ3RoID8gZGlzcGxheURhdGEuam9pbihcIiwgXCIpIDogdW5kZWZpbmVkOyAgICAgIFxyXG5cclxuICAgICAgaWYgKGRpc3BsYXlEYXRhKSB7XHJcbiAgICAgICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gaW5uZXJNYXBbcG9pbnQudmFsdWVdO1xyXG4gICAgICAgICAgY29uc3QgcEl0ZW06IGFueSA9IHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBjb25zdCBub2RlczogYW55ID0gdGhpcy5ldmVsdWF0ZWROb2RlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBwSXRlbS5tYXAoIChwLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwLCBub2Rlc1tpbmRleF0sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwSXRlbSwgbm9kZXMsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgcm9vdExpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGlubmVyTWFwKS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgcm9vdExpc3QucHVzaCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5tYWtlV29yZHMoa2V5KSxcclxuICAgICAgICBjaGlsZHJlbjogaW5uZXJNYXBba2V5XVxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIi9cIixcclxuICAgICAgY2hpbGRyZW46IHJvb3RMaXN0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlcic7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3IgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLXBvaW50cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHByaXZhdGUgZXZhbHVhdGVkUG9pbnRzID0ge307XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcbiAgXHJcbiAgQElucHV0KFwic2V0dGluZ3NcIilcclxuICBzZXR0aW5nczogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImVuYWJsZUNvbmZpZ3VyYXRpb25cIilcclxuICBlbmFibGVDb25maWd1cmF0aW9uOiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiZDNDb250YWluZXJcIilcclxuICBkM0NvbnRhaW5lcjtcclxuXHJcbiAgcHJpdmF0ZSBzaXplVXAocG9pbnRzKSB7XHJcbiAgICBjb25zdCBzaXplID0gKHBvaW50cy5jaGlsZHJlbiAmJiBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoKSA/IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc2l6ZSkge1xyXG4gICAgICBwb2ludHMubmFtZSArPSBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoID4gMSA/IFwiIChcIiArIHNpemUgKyBcIilcIiA6IFwiXCI7XHJcbiAgICAgIHBvaW50cy5jaGlsZHJlbi5tYXAoIChwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaXplVXAocCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG4gIH1cclxuICBwcml2YXRlIHRyaWdnZXJFdmFsdWF0aW9uKHBvaW50cywgcHJpbWFyaWVzKSB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCAmJiBwcmltYXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmV2YWx1YXRlZFBvaW50cyA9IHRoaXMuZXZhbHVhdG9yLmV2YWx1YXRlUG9pbnRzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJpZXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzKTtcclxuICAgICAgY29uc3Qgc2l6ZWR1cFBvaW50cyA9IHRoaXMuc2l6ZVVwKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ldmFsdWF0ZWRQb2ludHMpKSk7XHJcbiAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKHNpemVkdXBQb2ludHMsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KHRoaXMuZXZhbHVhdGVkUG9pbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KFtdKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZURhdGFSZWZyZW5jZShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKSB7XHJcbiAgICB3aW5kb3dbJ3VwZGF0ZU5vZGVEYXRhUmVmcmVuY2UnXShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKVxyXG4gIH1cclxuICBzdGFydEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdGFydEJsaW5raW5nJ10odGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG4gIHN0b3BCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RvcEJsaW5raW5nJ10oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb2ludE1ha2VyOiBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsIFxyXG4gICAgcHJpdmF0ZSBldmFsdWF0b3I6IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG5cclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID11bmRlZmluZWQ7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbShhcnJheSk6IGFueSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgbGV0IG1heFNpemUgPSAwO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSk9PiB7XHJcbiAgICAgICBsZXQgeCA9IGl0ZW0gPyBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggOiAwO1xyXG4gICAgICAgaWYgKHggPiBtYXhTaXplKSB7XHJcbiAgICAgICAgbWF4U2l6ZSA9IHg7XHJcbiAgICAgICAgcmVzdWx0ID0gaXRlbTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5lbmFibGVDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKHRoaXMuZGF0YSk7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRNYWtlci5nZW5lcmF0ZVBvaW50cyhyb290LCBcIlwiLCB0cnVlKTtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHBvaW50cztcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID0gdGhpcy5wb2ludE1ha2VyLnRhcmdldEtleXNGcm9tR2VuZXJhdGVkUG9pbnRzKHBvaW50cywgcm9vdCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMuaW50ZXJlc3RpbmdQb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMudGFyZ2V0S2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAvLyBpZiAoIXNjcmlwdCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICBcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICAgIC8vIHNjcmlwdEVsZW1lbnQuaWQgPSBpZDtcclxuICAgICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcclxuICAgICAgLy8gfVxyXG5cdFx0fSlcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBzYW5pdGl6ZShsaXN0KSB7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRQb2ludHMgPSBbXTtcclxuICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIGxpc3QubWFwKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGlmIChwb2ludC5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgc2FuaXRpemVkUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBrZXkgOiBwb2ludC5rZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludC52YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzYW5pdGl6ZWRQb2ludHM7XHJcbiAgfVxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGV2ZW50LmFsbG93ZHVwbGljYXRlcztcclxuICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gZXZlbnQuZ3JvdXBkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IGV2ZW50LmNvbmZpZ3VyYXRpb247XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LnBvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQua2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEQzQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCB7XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiY29uZmlndXJhdGlvblwiKVxyXG4gIGNvbmZpZ3VyYXRpb246IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBibGlua0F0dHJpYnV0ZXNXYXRjaDogW10sXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0Ymx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJvcmFuZ2VcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgY2hhbmVEaXJlY3Rpb25hbGl0eShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLmRpcmVjdGlvbmFsaXR5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOb2RlVHlwZShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLm5vZGVUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG4gIGNoYW5nZUNvbG9yU2V0cyhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAzLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRzdGVlbGJsdWVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS41LFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5saW5rcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMS4yLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuMyxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmVlblwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCJcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5ub2RlcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcInllbGxvd1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNjYWQyZDJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDIuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS45LFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjbGljayhldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoaXRlbSA9PT0gXCJhbGxvd2R1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPyB0aGlzLmdyb3VwZHVwbGljYXRlcyA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcImdyb3VwZHVwbGljYXRlc1wiKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gaW5wdXQuY2hlY2tlZDtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPyB0cnVlIDogdGhpcy5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwidG9vbHRpcEVuYWJsZWRcIikge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udG9vbHRpcEVuYWJsZWQgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS5zZWxlY3RlZCA9IChpbnB1dC5jaGVja2VkKTtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG4gICAgICBwb2ludHM6IHRoaXMuaW50ZXJlc3RpbmdQb2ludHMsXHJcbiAgICAgIGtleXM6IHRoaXMudGFyZ2V0S2V5cyxcclxuICAgICAgYWxsb3dkdXBsaWNhdGVzOiB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgY29uZmlndXJhdGlvbjogdGhpcy5jb25maWd1cmF0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCxcclxuICAgIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlcixcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpb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
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuanMubWFwIiwic291cmNlcyI6WyJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIudHMiLCJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3NyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLnRzIiwibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnRzIiwibmc6Ly92aXN1YWxpemF0aW9uLXBvaW50cy9zcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvc3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlzdWFsaXphdGlvblBvaW50IHtcclxuICBrZXk6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB7XHJcbiAgcHJpdmF0ZSBwb2ludHM6IFZpc3VhbGl6YXRpb25Qb2ludFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgdGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzOmFueVtdLCByb290Ont9KSB7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gW107XHJcblxyXG4gICAgcG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICBsZXQgcEl0ZW0gPSByb290O1xyXG4gICAgICBsZXQgZm91bmRBcnJheSA9IGZhbHNlO1xyXG5cclxuICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGZvdW5kQXJyYXkgPSB0cnVlOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZvdW5kQXJyYXkpIHtcclxuICAgICAgICB0YXJnZXRzLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwb2ludCkpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0cztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUG9pbnRzKHJvb3Q6IHt9LCBwYXRoOiBzdHJpbmcsIGNsZWFyOiBib29sZWFuKSB7XHJcblxyXG4gICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAocm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhyb290KS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBpbm5lclBhdGggPSAocGF0aC5sZW5ndGggPyAocGF0aCArIFwiLlwiICsga2V5KSA6IGtleSk7XHJcbiAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290W2tleV0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHJvb3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0gcm9vdFtrZXldO1xyXG4gICAgICAgICAgaWYgKG5vZGUubGVuZ3RoICYmICEobm9kZVswXSBpbnN0YW5jZW9mIEFycmF5KSAmJiAodHlwZW9mIG5vZGVbMF0gIT09IFwic3RyaW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMobm9kZVswXSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICBrZXk6IGlubmVyUGF0aCxcclxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlUG9pbnRzKHJvb3Rba2V5XSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC4vZywnIH4gJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIHtcclxuICBwcml2YXRlIHB1c2hJZk5vdENvbnRhaW4oYXJyYXksIGVudHJ5KSB7XHJcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZS5pbmRleE9mKGVudHJ5Lm5hbWUpID4gLTEpIHtcclxuICAgICAgICBmb3VuZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICBhcnJheS5wdXNoKGVudHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaEluTGlzdChsaXN0LCBpdGVtLCBub2RlLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywgZGlzcGxheURhdGEpIHtcclxuICAgIGxldCBmb3VuZDogYW55ID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGl0ZW0gPSBpdGVtIGluc3RhbmNlb2YgQXJyYXkgPyBpdGVtLmpvaW4oXCJcIikgOiBpdGVtO1xyXG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtLnRyaW0oKS5sZW5ndGggPyBpdGVtIDogXCJCTEFOS1wiO1xyXG4gICAgfWVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICBpdGVtID0gaXRlbT8gXCJ0cnVlXCI6XCJmYWxzZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbSA9IGl0ZW0gPT09IG51bGwgPyBcIk5VTExcIiA6IGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdC5tYXAoIChzdWJJdGVtOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHN1Ykl0ZW0ubmFtZSA9PT0gaXRlbSkge1xyXG4gICAgICAgIGZvdW5kID0gc3ViSXRlbTtcclxuICAgICAgICB0aGlzLnB1c2hJZk5vdENvbnRhaW4oc3ViSXRlbS5jaGlsZHJlbiwgZGlzcGxheURhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICggaXRlbSAhPT0gbnVsbCApIHtcclxuICAgICAgaWYgKCFmb3VuZCkge1xyXG4gICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChncm91cGR1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGZvdW5kLmNoaWxkcmVuLnB1c2goZGlzcGxheURhdGEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dkdXBsaWNhdGVzKSB7XHJcbiAgICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBpdGVtLCBkYXRhOiBub2RlLCBjaGlsZHJlbjogW2Rpc3BsYXlEYXRhXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbHVhdGUoIHBJdGVtOmFueSwgcGF0aDogYW55W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgZXZlbHVhdGVkTm9kZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1bcGF0aFtpXV0gOiBwSXRlbTtcclxuICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gW107XHJcbiAgICAgICAgcEl0ZW0ubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aC5zbGljZShpKzEscGF0aC5sZW5ndGgpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSBsaXN0O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcEl0ZW07XHJcbiAgfVxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW0EtWl0pL2csICcgJDEnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXy9nLFwiIFwiKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXi4vLCAoc3RyKSA9PiBzdHIudG9VcHBlckNhc2UoKSk7XHJcbiAgfVxyXG5cclxuICBldmFsdWF0ZVBvaW50cyhkYXRhOiBhbnlbXSwgcGlja1BvaW50czogYW55W10sIHByaW1hcnlzOiBhbnlbXSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMpIHtcclxuXHJcbiAgICBjb25zdCBpbm5lck1hcCA9IHt9O1xyXG5cclxuICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgaW5uZXJNYXBbcG9pbnQudmFsdWVdID0gW107XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgbGV0IGRpc3BsYXlEYXRhOiBhbnkgPSBbXTtcclxuXHJcbiAgICAgIHByaW1hcnlzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IHBJdGVtID0gaXRlbTtcclxuXHJcbiAgICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IChwSXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogcEl0ZW0pO1xyXG4gICAgICAgIGRpc3BsYXlEYXRhLnB1c2goU3RyaW5nKHBJdGVtKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBkaXNwbGF5RGF0YSA9IGRpc3BsYXlEYXRhLmxlbmd0aCA/IGRpc3BsYXlEYXRhLmpvaW4oXCIsIFwiKSA6IHVuZGVmaW5lZDsgICAgICBcclxuXHJcbiAgICAgIGlmIChkaXNwbGF5RGF0YSkge1xyXG4gICAgICAgIHBpY2tQb2ludHMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGlubmVyTWFwW3BvaW50LnZhbHVlXTtcclxuICAgICAgICAgIGNvbnN0IHBJdGVtOiBhbnkgPSB0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgY29uc3Qgbm9kZXM6IGFueSA9IHRoaXMuZXZlbHVhdGVkTm9kZShpdGVtLCBwYXRoKTtcclxuICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gIFxyXG4gICAgICAgICAgaWYgKHBJdGVtIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgcEl0ZW0ubWFwKCAocCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcCwgbm9kZXNbaW5kZXhdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnB1c2hJbkxpc3QobGlzdCwgcEl0ZW0sIG5vZGVzLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcywge25hbWU6IGRpc3BsYXlEYXRhfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJvb3RMaXN0ID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhpbm5lck1hcCkubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgIHJvb3RMaXN0LnB1c2goe1xyXG4gICAgICAgIG5hbWU6IHRoaXMubWFrZVdvcmRzKGtleSksXHJcbiAgICAgICAgY2hpbGRyZW46IGlubmVyTWFwW2tleV1cclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogXCIvXCIsXHJcbiAgICAgIGNoaWxkcmVuOiByb290TGlzdFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1wb2ludHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlZFBvaW50cyA9IHt9O1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG4gIFxyXG4gIEBJbnB1dChcInNldHRpbmdzXCIpXHJcbiAgc2V0dGluZ3M6IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVDb25maWd1cmF0aW9uXCIpXHJcbiAgZW5hYmxlQ29uZmlndXJhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dChcIm9uVmlzdWFsaXphdGlvblwiKVxyXG4gIG9uVmlzdWFsaXphdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImQzQ29udGFpbmVyXCIpXHJcbiAgZDNDb250YWluZXI7XHJcblxyXG4gIHByaXZhdGUgc2l6ZVVwKHBvaW50cykge1xyXG4gICAgY29uc3Qgc2l6ZSA9IChwb2ludHMuY2hpbGRyZW4gJiYgcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCkgPyBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoIDogdW5kZWZpbmVkO1xyXG4gICAgaWYgKHNpemUpIHtcclxuICAgICAgcG9pbnRzLm5hbWUgKz0gcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCA+IDEgPyBcIiAoXCIgKyBzaXplICsgXCIpXCIgOiBcIlwiO1xyXG4gICAgICBwb2ludHMuY2hpbGRyZW4ubWFwKCAocCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2l6ZVVwKHApO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBvaW50cztcclxuICB9XHJcbiAgcHJpdmF0ZSB0cmlnZ2VyRXZhbHVhdGlvbihwb2ludHMsIHByaW1hcmllcykge1xyXG4gICAgaWYgKHBvaW50cy5sZW5ndGggJiYgcHJpbWFyaWVzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5ldmFsdWF0ZWRQb2ludHMgPSB0aGlzLmV2YWx1YXRvci5ldmFsdWF0ZVBvaW50cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyaWVzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyk7XHJcbiAgICAgIGNvbnN0IHNpemVkdXBQb2ludHMgPSB0aGlzLnNpemVVcChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZXZhbHVhdGVkUG9pbnRzKSkpO1xyXG4gICAgICB3aW5kb3dbJ2luaXRpYXRlRDMnXShzaXplZHVwUG9pbnRzLCB0aGlzLnNldHRpbmdzKTtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdCh0aGlzLmV2YWx1YXRlZFBvaW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmQzQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5vblZpc3VhbGl6YXRpb24uZW1pdChbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVEYXRhUmVmcmVuY2Uob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSkge1xyXG4gICAgd2luZG93Wyd1cGRhdGVOb2RlRGF0YVJlZnJlbmNlJ10ob3JpZ2luYWxOb2RlLCByZWZyZW5jZUF0dHJpYnV0ZSlcclxuICB9XHJcbiAgc3RhcnRCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RhcnRCbGlua2luZyddKHRoaXMuc2V0dGluZ3MpO1xyXG4gIH1cclxuICBzdG9wQmxpbmtpbmcoKSB7XHJcbiAgICB3aW5kb3dbJ3N0b3BCbGlua2luZyddKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcG9pbnRNYWtlcjogVmlzdWFsaXphdGlvblBvaW50c01ha2VyLCBcclxuICAgIHByaXZhdGUgZXZhbHVhdG9yOiBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcclxuXHJcbiAgICBpZiAoY2hhbmdlcy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSB1bmRlZmluZWQ7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9dW5kZWZpbmVkO1xyXG4gICAgICBzZXRUaW1lb3V0KHRoaXMubmdPbkluaXQuYmluZCh0aGlzKSwgMzMzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZFJlZmVyZW5jZVN0cnVjdHVyZUZyb20oYXJyYXkpOiBhbnkge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGxldCBtYXhTaXplID0gMDtcclxuICAgIGFycmF5Lm1hcCggKGl0ZW0pPT4ge1xyXG4gICAgICAgbGV0IHggPSBpdGVtID8gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoIDogMDtcclxuICAgICAgIGlmICh4ID4gbWF4U2l6ZSkge1xyXG4gICAgICAgIG1heFNpemUgPSB4O1xyXG4gICAgICAgIHJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmKCAhKHRoaXMuZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICB0aGlzLmRhdGEgPSBbdGhpcy5kYXRhXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoICYmIHRoaXMuZW5hYmxlQ29uZmlndXJhdGlvbikge1xyXG4gICAgICBjb25zdCByb290ID0gdGhpcy5maW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbSh0aGlzLmRhdGEpO1xyXG4gICAgICBjb25zdCBwb2ludHMgPSB0aGlzLnBvaW50TWFrZXIuZ2VuZXJhdGVQb2ludHMocm9vdCwgXCJcIiwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuaW50ZXJlc3RpbmdQb2ludHMgPSBwb2ludHM7XHJcbiAgICAgIHRoaXMudGFyZ2V0S2V5cyA9IHRoaXMucG9pbnRNYWtlci50YXJnZXRLZXlzRnJvbUdlbmVyYXRlZFBvaW50cyhwb2ludHMsIHJvb3QpO1xyXG4gICAgfVxyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLmludGVyZXN0aW5nUG9pbnRzKSxcclxuICAgICAgdGhpcy5zYW5pdGl6ZSh0aGlzLnRhcmdldEtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF3aW5kb3dbJ2luaXRpYXRlRDMnXSkge1xyXG4gICAgICBhd2FpdCB0aGlzLmxvYWRTY3JpcHQoXCJhc3NldHMvZDMuanNcIiwgJ2QzanMnKTtcclxuICAgIH1cclxuIFx0fVxyXG4gICBcclxuXHRwcml2YXRlIGxvYWRTY3JpcHQodXJsLCBpZCkgeyAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgLy8gaWYgKCFzY3JpcHQpIHtcclxuICAgICAgICBjb25zdCBzY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgXHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnNyYyA9IHVybDtcclxuICAgICAgICAvLyBzY3JpcHRFbGVtZW50LmlkID0gaWQ7XHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC5vbmxvYWQgPSByZXNvbHZlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbWVudCk7XHJcbiAgICAgIC8vIH1cclxuXHRcdH0pXHJcbiAgfVxyXG4gIFxyXG4gIHByaXZhdGUgc2FuaXRpemUobGlzdCkge1xyXG4gICAgY29uc3Qgc2FuaXRpemVkUG9pbnRzID0gW107XHJcbiAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICBsaXN0Lm1hcCgocG9pbnQpID0+IHtcclxuICAgICAgICBpZiAocG9pbnQuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHNhbml0aXplZFBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAga2V5IDogcG9pbnQua2V5LFxyXG4gICAgICAgICAgICB2YWx1ZTogcG9pbnQudmFsdWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2FuaXRpemVkUG9pbnRzO1xyXG4gIH1cclxuICBvbmNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBldmVudC5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGV2ZW50Lmdyb3VwZHVwbGljYXRlcztcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBldmVudC5jb25maWd1cmF0aW9uO1xyXG4gICAgdGhpcy50cmlnZ2VyRXZhbHVhdGlvbihcclxuICAgICAgdGhpcy5zYW5pdGl6ZShldmVudC5wb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LmtleXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBSZW5kZXJlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQge1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImNvbmZpZ3VyYXRpb25cIilcclxuICBjb25maWd1cmF0aW9uOiBEM0NvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICB0b29sdGlwRW5hYmxlZDogZmFsc2UsXHJcbiAgICBkaXJlY3Rpb25hbGl0eTogXCJMMlJcIixcclxuICAgIG5vZGVUeXBlOiBcIlBsYWluXCIsXHJcbiAgICB0YXJnZXREaXY6IFwiI2QzLWNvbnRhaW5lclwiLFxyXG4gICAgYmxpbmtBdHRyaWJ1dGVzV2F0Y2g6IFtdLFxyXG4gICAgc3R5bGVzOiB7XHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KFwib25jaGFuZ2VcIilcclxuICBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHt9XHJcblxyXG4gIGtleXVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgXCJjbGlja1wiKTtcclxuXHRcdH1cclxuICB9XHJcblxyXG4gIGNoYW5lRGlyZWN0aW9uYWxpdHkoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5kaXJlY3Rpb25hbGl0eSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTm9kZVR5cGUoZXZlbnQpIHtcclxuICAgIHRoaXMuY29uZmlndXJhdGlvbi5ub2RlVHlwZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBjaGFuZ2VDb2xvclNldHMoZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQudmFsdWUgPT0gMSkge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLmxpbmtzID0ge1xyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJsaWdodHN0ZWVsYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLm5vZGVzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS4zLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEuMixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMi4yLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JlZW5cIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ5ZWxsb3dcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCIjY2FkMmQyXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjUsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuOSxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwiI2Y1OGMyNFwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGFiZWwtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiaG92ZXItbGFiZWwtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1sYWJlbC1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2soZXZlbnQsIGl0ZW0pIHtcclxuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgaWYgKGl0ZW0gPT09IFwiYWxsb3dkdXBsaWNhdGVzXCIpIHtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IHRoaXMuYWxsb3dkdXBsaWNhdGVzID8gdGhpcy5ncm91cGR1cGxpY2F0ZXMgOiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJncm91cGR1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmdyb3VwZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID8gdHJ1ZSA6IHRoaXMuYWxsb3dkdXBsaWNhdGVzO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcInRvb2x0aXBFbmFibGVkXCIpIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnRvb2x0aXBFbmFibGVkID0gaW5wdXQuY2hlY2tlZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAoaW5wdXQuY2hlY2tlZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBlbWl0Q2hhbmdlKCkge1xyXG4gICAgdGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuICAgICAgcG9pbnRzOiB0aGlzLmludGVyZXN0aW5nUG9pbnRzLFxyXG4gICAgICBrZXlzOiB0aGlzLnRhcmdldEtleXMsXHJcbiAgICAgIGFsbG93ZHVwbGljYXRlczogdGhpcy5hbGxvd2R1cGxpY2F0ZXMsXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IHRoaXMuY29uZmlndXJhdGlvblxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyJztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUFpQkU7c0JBRnVDLEVBQUU7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
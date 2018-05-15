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
        const /** @type {?} */ targets = [];
        points.map((point) => {
            const /** @type {?} */ path = point.key.split(".");
            let /** @type {?} */ pItem = root;
            let /** @type {?} */ foundArray = false;
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
                const /** @type {?} */ innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    this.points.push({
                        key: innerPath,
                        value: this.makeWords(innerPath)
                    });
                }
                else if (root[key] instanceof Array) {
                    const /** @type {?} */ node = root[key];
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
    { type: Injectable },
];
/** @nocollapse */
VisualizationPointsMaker.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
class VisualizationPointsEvaluator {
    /**
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    pushIfNotContain(array, entry) {
        let /** @type {?} */ found = false;
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
        let /** @type {?} */ found = undefined;
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
        for (let /** @type {?} */ i = 0; i < path.length; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                const /** @type {?} */ list = [];
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
        for (let /** @type {?} */ i = 0; i < path.length - 1; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                const /** @type {?} */ list = [];
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
        const /** @type {?} */ innerMap = {};
        pickPoints.map((point) => {
            innerMap[point.value] = [];
        });
        data.map((item) => {
            let /** @type {?} */ displayData = [];
            primarys.map((point) => {
                const /** @type {?} */ path = point.key.split(".");
                let /** @type {?} */ pItem = item;
                path.map((key) => {
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map((point) => {
                    const /** @type {?} */ path = point.key.split(".");
                    const /** @type {?} */ list = innerMap[point.value];
                    const /** @type {?} */ pItem = this.eveluate(item, path);
                    const /** @type {?} */ nodes = this.eveluatedNode(item, path);
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
        const /** @type {?} */ rootList = [];
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
    { type: Injectable },
];
/** @nocollapse */
VisualizationPointsEvaluator.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ size = (points.children && points.children.length) ? points.children.length : undefined;
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
            const /** @type {?} */ sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
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
        let /** @type {?} */ result;
        let /** @type {?} */ maxSize = 0;
        array.map((item) => {
            let /** @type {?} */ x = item ? Object.keys(item).length : 0;
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
            const /** @type {?} */ root = this.findReferenceStructureFrom(this.data);
            const /** @type {?} */ points = this.pointMaker.generatePoints(root, "", true);
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
            // const script = document.getElementById(id);
            // if (!script) {
            const /** @type {?} */ scriptElement = document.createElement('script');
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
        const /** @type {?} */ sanitizedPoints = [];
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
                template: `
<div class="configuration" *ngIf="enableConfiguration && interestingPoints">
    <visualization-configuration
        [interestingPoints]="interestingPoints"
        [targetKeys]="targetKeys"
        [configuration]="settings"
        [allowduplicates]="allowduplicates"
        [groupduplicates]="groupduplicates"
        (onchange)="onchange($event)"></visualization-configuration>
</div>
<div class="d3-container" id="d3-container" #d3Container></div>
`,
                styles: [`:host{
  -webkit-box-sizing:border-box;
          box-sizing:border-box;
  display:table;
  position:relative;
  width:100%; }
  :host #d3-container{
    border:1px solid #633;
    padding:0 5px;
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border-radius:5px;
    background-color:#fefefe;
    margin:5px; }
  :host ::ng-deep .node circle{
    cursor:pointer; }
  :host ::ng-deep .node rect{
    cursor:pointer; }
  :host ::ng-deep div.tooltip{
    position:absolute;
    padding:5px;
    font:12px sans-serif;
    background:#cfcfcf;
    border:1px solid #3a3939;
    border-radius:4px;
    pointer-events:none;
    z-index:5; }
  :host ::ng-deep .node text{
    font-size:11px;
    font-weight:bold; }
  :host ::ng-deep path{
    fill:none; }
`],
            },] },
];
/** @nocollapse */
VisualizationPointsComponent.ctorParameters = () => [
    { type: VisualizationPointsMaker, },
    { type: VisualizationPointsEvaluator, },
];
VisualizationPointsComponent.propDecorators = {
    "interestingPoints": [{ type: Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: Input, args: ["targetKeys",] },],
    "data": [{ type: Input, args: ["data",] },],
    "allowduplicates": [{ type: Input, args: ["allowduplicates",] },],
    "groupduplicates": [{ type: Input, args: ["groupduplicates",] },],
    "settings": [{ type: Input, args: ["settings",] },],
    "enableConfiguration": [{ type: Input, args: ["enableConfiguration",] },],
    "onVisualization": [{ type: Output, args: ["onVisualization",] },],
    "d3Container": [{ type: ViewChild, args: ["d3Container",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
        const /** @type {?} */ code = event.which;
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
        const /** @type {?} */ input = event.target;
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
                template: `<p class="info">
    <span>
        Pick points are the attributes in which you want to evaluate.
        Target keys are the attributes in which evaluated data will be presented on.
    </span>
    <span>
        For example: if you are examining users and pick user age and city as pick points,
        data will be evaluated on city and age. And if you pick user name and gender as target keys,
        for each age and city reference, you will see the resulting data as name and age values.</span>
</p>
<fieldset class="pick-points">
    <legend>Target Keys:</legend>
    <label *ngFor="let x of targetKeys; let i = index" [for]="'targetKey' + i">
        <input
            type="checkbox"
            name="targetKey"
            [id]="'targetKey' + i"
            [value]="x.value"
            [checked]="x.selected ? true: null"
            (keyup)="keyup($event)"
            (click)="click($event, x)" />
        <span [textContent]="x.value"></span>
    </label>
</fieldset>
<fieldset class="pick-points">
    <legend>Pick Points:</legend>
    <label *ngFor="let x of interestingPoints; let i = index" [for]="'pickpoint' + i">
        <input
            type="checkbox"
            name="pickpoint"
            [id]="'pickpoint' + i"
            [value]="x.value"
            [checked]="x.selected ? true: null"
            (keyup)="keyup($event)"
            (click)="click($event, x)" />
        <span [textContent]="x.value"></span>
    </label>
</fieldset>
<fieldset class="pick-points default">
    <legend>Presentation:</legend>
    <label for="directionality">Directionality:</label>
    <select name="directionality"
            id="directionality"
            (change)="chaneDirectionality($event)">
        <option value="L2R">Left to Right</option>
        <option value="R2L">Right to Left</option>
        <option value="TD">Top Down</option>
    </select>
    <label for="nodeType">Node Type:</label>
    <select name="nodeType"
            id="nodeType"
            (change)="changeNodeType($event)">
        <option value="Plain">Plain</option>
        <option value="Rectangle">Rectangle</option>
        <option value="Circle">Circle</option>
    </select>
    <label for="colorSets">Color sets:</label>
    <select name="colorSets"
            id="colorSets"
            (change)="changeColorSets($event)">
        <option value="1">Sample 1</option>
        <option value="2">Sample 2</option>
    </select>
    <label for="tooltip">
        <input
            type="checkbox"
            name="tooltip"
            id="tooltip"
            [checked]="tooltipEnabled ? true: null"
            (keyup)="keyup($event)"
            (click)="click($event, 'tooltipEnabled')" />
        <span>Enable Tool tip</span>
    </label>
</fieldset>
<fieldset class="pick-points">
    <legend>Duplicates In result set:</legend>
    <label for="allowduplicates">
        <input
            type="checkbox"
            name="allowduplicates"
            id="allowduplicates"
            [value]="allowduplicates"
            [checked]="allowduplicates ? true: null"
            (keyup)="keyup($event)"
            (click)="click($event, 'allowduplicates')" />
        <span>Allow Duplicates</span>
    </label>
    <label for="groupduplicates">
        <input
            type="checkbox"
            name="groupduplicates"
            id="groupduplicates"
            [value]="groupduplicates"
            [checked]="groupduplicates ? true: null"
            (keyup)="keyup($event)"
            (click)="click($event, 'groupduplicates')" />
        <span>Group Duplicates</span>
    </label>
</fieldset>
`,
                styles: [`:host{
  -webkit-box-sizing:border-box;
          box-sizing:border-box;
  display:table;
  padding:5px; }
  :host .info{
    padding:5px 0;
    margin:0;
    font-size:0.9em; }
  :host .pick-points{
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border:1px solid #633;
    display:block;
    float:left;
    padding:0 0 5px 0;
    width:100%;
    margin:0;
    border-radius:5px;
    background-color:#fefefe; }
    :host .pick-points legend{
      font-weight:bold;
      margin-left:20px;
      color:#633; }
    :host .pick-points label{
      display:inline-table;
      width:24.33%; }
      :host .pick-points label:hover{
        color:#ca0000; }
    :host .pick-points.default label{
      width:15%;
      text-align:right; }
`],
            },] },
];
/** @nocollapse */
VisualizationConfigurationComponent.ctorParameters = () => [
    { type: Renderer, },
];
VisualizationConfigurationComponent.propDecorators = {
    "interestingPoints": [{ type: Input, args: ["interestingPoints",] },],
    "targetKeys": [{ type: Input, args: ["targetKeys",] },],
    "allowduplicates": [{ type: Input, args: ["allowduplicates",] },],
    "configuration": [{ type: Input, args: ["configuration",] },],
    "groupduplicates": [{ type: Input, args: ["groupduplicates",] },],
    "onchange": [{ type: Output, args: ["onchange",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
            },] },
];
/** @nocollapse */
VisualizationPointsModule.ctorParameters = () => [];

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

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
     * @param {?} root
     * @param {?} path
     * @param {?} clear
     * @return {?}
     */
    generatePoints(root, path, clear) {
        if (clear) {
            this.points = [];
        }
        Object.keys(root).map((key) => {
            const /** @type {?} */ innerPath = (path.length ? (path + "." + key) : key);
            if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                this.points.push({
                    key: innerPath,
                    value: innerPath.replace(/\./g, ' ')
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
                        value: innerPath.replace(/\./g, ' ')
                    });
                }
            }
            else {
                this.generatePoints(root[key], innerPath, false);
            }
        });
        return this.points;
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
     * @param {?} list
     * @param {?} item
     * @param {?} displayData
     * @return {?}
     */
    pushInList(list, item, displayData) {
        let /** @type {?} */ found = false;
        list.map((subItem) => {
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
    }
    /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @return {?}
     */
    evaluatePoints(data, pickPoints, primarys) {
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
                    pItem = pItem[key];
                });
                displayData.push(pItem);
            });
            displayData = displayData.join(", ");
            pickPoints.map((point) => {
                const /** @type {?} */ path = point.key.split(".");
                const /** @type {?} */ list = innerMap[point.value];
                let /** @type {?} */ pItem = item;
                path.map((key) => {
                    pItem = pItem[key];
                });
                if (pItem instanceof Array) {
                    pItem.map((p) => {
                        this.pushInList(list, p, { name: displayData });
                    });
                }
                else if (pItem) {
                    this.pushInList(list, pItem, { name: displayData });
                }
                else {
                    list.push({ name: displayData });
                }
            });
        });
        const /** @type {?} */ rootList = [];
        Object.keys(innerMap).map((key) => {
            rootList.push({
                name: key,
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
            this.displayHeight += size;
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
            this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries);
            this.displayHeight = 0;
            const /** @type {?} */ sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
            this.displayHeight = this.displayHeight * 22;
            window['initiateD3'](sizedupPoints, "#d3-container", this.displayHeight);
            this.onVisualization.emit(this.evaluatedPoints);
        }
        else {
            this.d3Container.nativeElement.innerHTML = "";
        }
    }
    /**
     * @param {?} chages
     * @return {?}
     */
    ngOnChanges(chages) {
        if (chages.data) {
            this.interestingPoints = undefined;
            this.targetKeys = undefined;
            setTimeout(this.ngOnInit.bind(this), 333);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.data.length && this.enableConfiguration) {
            const /** @type {?} */ root = (this.data instanceof Array) ? this.data[0] : this.data;
            const /** @type {?} */ points = this.pointMaker.generatePoints(root, "", true);
            this.interestingPoints = points;
            this.targetKeys = JSON.parse(JSON.stringify(points));
        }
        this.triggerEvaluation(this.sanitize(this.interestingPoints), this.sanitize(this.targetKeys));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadScript("assets/d3.js", 'd3js');
        });
    }
    /**
     * @param {?} url
     * @param {?} id
     * @return {?}
     */
    loadScript(url, id) {
        return new Promise((resolve, reject) => {
            const /** @type {?} */ script = document.getElementById(id);
            if (!script) {
                const /** @type {?} */ scriptElement = document.createElement('script');
                scriptElement.src = url;
                scriptElement.id = id;
                scriptElement.onload = resolve;
                document.body.appendChild(scriptElement);
            }
        });
    }
    /**
     * @param {?} list
     * @return {?}
     */
    sanitize(list) {
        const /** @type {?} */ sanitizedPoints = [];
        if (!list || list.length) {
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
    border:1px solid #ddd;
    padding:5px;
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border-radius:5px;
    background-color:#fefefe; }
  :host ::ng-deep .node circle{
    cursor:pointer;
    fill:#fff;
    stroke:steelblue;
    stroke-width:1.5px; }
  :host ::ng-deep .node text{
    font-size:11px;
    font-weight:bold; }
  :host ::ng-deep path.link{
    fill:none;
    stroke:#ccc;
    stroke-width:1.5px; }
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
     * @param {?} item
     * @return {?}
     */
    click(event, item) {
        const /** @type {?} */ input = event.target;
        item.selected = (input.checked);
        this.onchange.emit({
            points: this.interestingPoints,
            keys: this.targetKeys
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
</fieldset>`,
                styles: [`:host{
  -webkit-box-sizing:border-box;
          box-sizing:border-box;
  display:table;
  padding:5px; }
  :host .info{
    padding:5px;
    margin:5px; }
  :host .pick-points{
    -webkit-box-sizing:border-box;
            box-sizing:border-box;
    border:1px solid #444;
    display:block;
    float:left;
    padding:0;
    width:49%; }
    :host .pick-points label{
      padding:2px 0;
      display:inline-table;
      width:33%; }
      :host .pick-points label:hover{
        color:#933; }
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

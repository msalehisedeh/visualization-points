/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { VisualizationPointsMaker } from '../injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from '../injectables/visualization-points-evaluator';
export class VisualizationPointsComponent {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
if (false) {
    /** @type {?} */
    VisualizationPointsComponent.prototype.evaluatedPoints;
    /** @type {?} */
    VisualizationPointsComponent.prototype.interestingPoints;
    /** @type {?} */
    VisualizationPointsComponent.prototype.targetKeys;
    /** @type {?} */
    VisualizationPointsComponent.prototype.data;
    /** @type {?} */
    VisualizationPointsComponent.prototype.allowduplicates;
    /** @type {?} */
    VisualizationPointsComponent.prototype.groupduplicates;
    /** @type {?} */
    VisualizationPointsComponent.prototype.settings;
    /** @type {?} */
    VisualizationPointsComponent.prototype.enableConfiguration;
    /** @type {?} */
    VisualizationPointsComponent.prototype.onVisualization;
    /** @type {?} */
    VisualizationPointsComponent.prototype.d3Container;
    /** @type {?} */
    VisualizationPointsComponent.prototype.pointMaker;
    /** @type {?} */
    VisualizationPointsComponent.prototype.evaluator;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFDTCxTQUFTLEVBSVQsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBUTdGLE1BQU07Ozs7O0lBb0dKLFlBQ1UsWUFDQTtRQURBLGVBQVUsR0FBVixVQUFVO1FBQ1YsY0FBUyxHQUFULFNBQVM7K0JBcEdPLEVBQUU7aUNBR1IsRUFBRTswQkFHVCxFQUFFOytCQU1HLEtBQUs7K0JBR0wsS0FBSzt3QkFHSztZQUMxQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQixzQkFBc0IsRUFBRSxLQUFLO29CQUM3QixZQUFZLEVBQUUsQ0FBQztvQkFFZixxQkFBcUIsRUFBRSxLQUFLO29CQUM1QixlQUFlLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLDBCQUEwQixFQUFFLE9BQU87b0JBQ25DLG9CQUFvQixFQUFFLE9BQU87b0JBQzdCLGNBQWMsRUFBRSxDQUFDO29CQUVqQix3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RUFBRyxLQUFLLENBQUMsR0FBRzt3QkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7cUJBQ25CLENBQUMsQ0FBQztpQkFDSjthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7Ozs7O0lBRXpCLFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQzFCLENBQUM7S0FDSDs7O1lBak1GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyw2Z0JBQW9EOzthQUVyRDs7OztZQVJRLHdCQUF3QjtZQUN4Qiw0QkFBNEI7OztnQ0FZbEMsS0FBSyxTQUFDLG1CQUFtQjt5QkFHekIsS0FBSyxTQUFDLFlBQVk7bUJBR2xCLEtBQUssU0FBQyxNQUFNOzhCQUdaLEtBQUssU0FBQyxpQkFBaUI7OEJBR3ZCLEtBQUssU0FBQyxpQkFBaUI7dUJBR3ZCLEtBQUssU0FBQyxVQUFVO2tDQW1DaEIsS0FBSyxTQUFDLHFCQUFxQjs4QkFHM0IsTUFBTSxTQUFDLGlCQUFpQjswQkFHeEIsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlcic7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3IgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLXBvaW50cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHByaXZhdGUgZXZhbHVhdGVkUG9pbnRzID0ge307XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcbiAgXHJcbiAgQElucHV0KFwic2V0dGluZ3NcIilcclxuICBzZXR0aW5nczogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImVuYWJsZUNvbmZpZ3VyYXRpb25cIilcclxuICBlbmFibGVDb25maWd1cmF0aW9uOiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiZDNDb250YWluZXJcIilcclxuICBkM0NvbnRhaW5lcjtcclxuXHJcbiAgcHJpdmF0ZSBzaXplVXAocG9pbnRzKSB7XHJcbiAgICBjb25zdCBzaXplID0gKHBvaW50cy5jaGlsZHJlbiAmJiBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoKSA/IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc2l6ZSkge1xyXG4gICAgICBwb2ludHMubmFtZSArPSBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoID4gMSA/IFwiIChcIiArIHNpemUgKyBcIilcIiA6IFwiXCI7XHJcbiAgICAgIHBvaW50cy5jaGlsZHJlbi5tYXAoIChwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaXplVXAocCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG4gIH1cclxuICBwcml2YXRlIHRyaWdnZXJFdmFsdWF0aW9uKHBvaW50cywgcHJpbWFyaWVzKSB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCAmJiBwcmltYXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmV2YWx1YXRlZFBvaW50cyA9IHRoaXMuZXZhbHVhdG9yLmV2YWx1YXRlUG9pbnRzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJpZXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzKTtcclxuICAgICAgY29uc3Qgc2l6ZWR1cFBvaW50cyA9IHRoaXMuc2l6ZVVwKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ldmFsdWF0ZWRQb2ludHMpKSk7XHJcbiAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKHNpemVkdXBQb2ludHMsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KHRoaXMuZXZhbHVhdGVkUG9pbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KFtdKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZURhdGFSZWZyZW5jZShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKSB7XHJcbiAgICB3aW5kb3dbJ3VwZGF0ZU5vZGVEYXRhUmVmcmVuY2UnXShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKVxyXG4gIH1cclxuICBzdGFydEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdGFydEJsaW5raW5nJ10odGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG4gIHN0b3BCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RvcEJsaW5raW5nJ10oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb2ludE1ha2VyOiBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsIFxyXG4gICAgcHJpdmF0ZSBldmFsdWF0b3I6IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG5cclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID11bmRlZmluZWQ7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbShhcnJheSk6IGFueSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgbGV0IG1heFNpemUgPSAwO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSk9PiB7XHJcbiAgICAgICBsZXQgeCA9IGl0ZW0gPyBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggOiAwO1xyXG4gICAgICAgaWYgKHggPiBtYXhTaXplKSB7XHJcbiAgICAgICAgbWF4U2l6ZSA9IHg7XHJcbiAgICAgICAgcmVzdWx0ID0gaXRlbTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5lbmFibGVDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKHRoaXMuZGF0YSk7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRNYWtlci5nZW5lcmF0ZVBvaW50cyhyb290LCBcIlwiLCB0cnVlKTtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHBvaW50cztcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID0gdGhpcy5wb2ludE1ha2VyLnRhcmdldEtleXNGcm9tR2VuZXJhdGVkUG9pbnRzKHBvaW50cywgcm9vdCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMuaW50ZXJlc3RpbmdQb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMudGFyZ2V0S2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAvLyBpZiAoIXNjcmlwdCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICBcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICAgIC8vIHNjcmlwdEVsZW1lbnQuaWQgPSBpZDtcclxuICAgICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcclxuICAgICAgLy8gfVxyXG5cdFx0fSlcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBzYW5pdGl6ZShsaXN0KSB7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRQb2ludHMgPSBbXTtcclxuICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIGxpc3QubWFwKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGlmIChwb2ludC5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgc2FuaXRpemVkUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBrZXkgOiBwb2ludC5rZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludC52YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzYW5pdGl6ZWRQb2ludHM7XHJcbiAgfVxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGV2ZW50LmFsbG93ZHVwbGljYXRlcztcclxuICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gZXZlbnQuZ3JvdXBkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IGV2ZW50LmNvbmZpZ3VyYXRpb247XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LnBvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQua2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
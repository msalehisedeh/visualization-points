/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { VisualizationPointsMaker } from '../injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from '../injectables/visualization-points-evaluator';
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
export { VisualizationPointsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUNMLFNBQVMsRUFJVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDckYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sK0NBQStDLENBQUM7O0lBNEczRixzQ0FDVSxZQUNBO1FBREEsZUFBVSxHQUFWLFVBQVU7UUFDVixjQUFTLEdBQVQsU0FBUzsrQkFwR08sRUFBRTtpQ0FHUixFQUFFOzBCQUdULEVBQUU7K0JBTUcsS0FBSzsrQkFHTCxLQUFLO3dCQUdLO1lBQzFCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0wsb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsY0FBYyxFQUFFLENBQUM7b0JBRWpCLGtCQUFrQixFQUFFLE1BQU07b0JBQzFCLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLFlBQVksRUFBRSxDQUFDO29CQUVmLHFCQUFxQixFQUFFLEtBQUs7b0JBQzVCLGVBQWUsRUFBRSxDQUFDO2lCQUNuQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsMEJBQTBCLEVBQUUsT0FBTztvQkFDbkMsb0JBQW9CLEVBQUUsT0FBTztvQkFDN0IsY0FBYyxFQUFFLENBQUM7b0JBRWpCLHdCQUF3QixFQUFFLFdBQVc7b0JB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LENBQUM7d0JBQ25CLEdBQUcsRUFBRyxLQUFLLENBQUMsR0FBRzt3QkFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7cUJBQ25CLENBQUMsQ0FBQztpQkFDSjthQUNGLENBQUMsQ0FBQztTQUNKO1FBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQzs7Ozs7O0lBRXpCLCtDQUFROzs7O0lBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQzFCLENBQUM7S0FDSDs7Z0JBak1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyw2Z0JBQW9EOztpQkFFckQ7Ozs7Z0JBUlEsd0JBQXdCO2dCQUN4Qiw0QkFBNEI7OztvQ0FZbEMsS0FBSyxTQUFDLG1CQUFtQjs2QkFHekIsS0FBSyxTQUFDLFlBQVk7dUJBR2xCLEtBQUssU0FBQyxNQUFNO2tDQUdaLEtBQUssU0FBQyxpQkFBaUI7a0NBR3ZCLEtBQUssU0FBQyxpQkFBaUI7MkJBR3ZCLEtBQUssU0FBQyxVQUFVO3NDQW1DaEIsS0FBSyxTQUFDLHFCQUFxQjtrQ0FHM0IsTUFBTSxTQUFDLGlCQUFpQjs4QkFHeEIsU0FBUyxTQUFDLGFBQWE7O3VDQW5GMUI7O1NBdUJhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHRvb2wgdG8gZGlzcGxheSByZXN1bHQgb2YgYSBzZWFyY2ggb24gc2V0IG9mIHBvaW50cyBvZiBpbnRlcmVzdHMgb24gb2JqZWN0cy5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgQWZ0ZXJWaWV3SW5pdCAsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB9IGZyb20gJy4uL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyJztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB9IGZyb20gJy4uL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLWV2YWx1YXRvcic7XHJcbmltcG9ydCB7IEQzQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6YXRpb24tcG9pbnRzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMgIHtcclxuXHJcbiAgcHJpdmF0ZSBldmFsdWF0ZWRQb2ludHMgPSB7fTtcclxuICBcclxuICBASW5wdXQoXCJpbnRlcmVzdGluZ1BvaW50c1wiKVxyXG4gIGludGVyZXN0aW5nUG9pbnRzID0gW107XHJcblxyXG4gIEBJbnB1dChcInRhcmdldEtleXNcIilcclxuICB0YXJnZXRLZXlzID0gW107XHJcblxyXG4gIEBJbnB1dChcImRhdGFcIilcclxuICBkYXRhOiBhbnk7XHJcblxyXG4gIEBJbnB1dChcImFsbG93ZHVwbGljYXRlc1wiKVxyXG4gIGFsbG93ZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoXCJncm91cGR1cGxpY2F0ZXNcIilcclxuICBncm91cGR1cGxpY2F0ZXMgPSBmYWxzZTtcclxuICBcclxuICBASW5wdXQoXCJzZXR0aW5nc1wiKVxyXG4gIHNldHRpbmdzOiBEM0NvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICB0b29sdGlwRW5hYmxlZDogZmFsc2UsXHJcbiAgICBkaXJlY3Rpb25hbGl0eTogXCJMMlJcIixcclxuICAgIG5vZGVUeXBlOiBcIlBsYWluXCIsXHJcbiAgICB0YXJnZXREaXY6IFwiI2QzLWNvbnRhaW5lclwiLFxyXG4gICAgc3R5bGVzOiB7XHJcbiAgICAgIGxpbmtzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmF5XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAzLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vZGVzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0Ymx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJvcmFuZ2VcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KFwiZW5hYmxlQ29uZmlndXJhdGlvblwiKVxyXG4gIGVuYWJsZUNvbmZpZ3VyYXRpb246IGJvb2xlYW47XHJcblxyXG4gIEBPdXRwdXQoXCJvblZpc3VhbGl6YXRpb25cIilcclxuICBvblZpc3VhbGl6YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoXCJkM0NvbnRhaW5lclwiKVxyXG4gIGQzQ29udGFpbmVyO1xyXG5cclxuICBwcml2YXRlIHNpemVVcChwb2ludHMpIHtcclxuICAgIGNvbnN0IHNpemUgPSAocG9pbnRzLmNoaWxkcmVuICYmIHBvaW50cy5jaGlsZHJlbi5sZW5ndGgpID8gcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCA6IHVuZGVmaW5lZDtcclxuICAgIGlmIChzaXplKSB7XHJcbiAgICAgIHBvaW50cy5uYW1lICs9IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggPiAxID8gXCIgKFwiICsgc2l6ZSArIFwiKVwiIDogXCJcIjtcclxuICAgICAgcG9pbnRzLmNoaWxkcmVuLm1hcCggKHApID0+IHtcclxuICAgICAgICB0aGlzLnNpemVVcChwKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG4gIHByaXZhdGUgdHJpZ2dlckV2YWx1YXRpb24ocG9pbnRzLCBwcmltYXJpZXMpIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoICYmIHByaW1hcmllcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuZXZhbHVhdGVkUG9pbnRzID0gdGhpcy5ldmFsdWF0b3IuZXZhbHVhdGVQb2ludHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcmllcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMpO1xyXG4gICAgICBjb25zdCBzaXplZHVwUG9pbnRzID0gdGhpcy5zaXplVXAoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmV2YWx1YXRlZFBvaW50cykpKTtcclxuICAgICAgd2luZG93Wydpbml0aWF0ZUQzJ10oc2l6ZWR1cFBvaW50cywgdGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgIHRoaXMub25WaXN1YWxpemF0aW9uLmVtaXQodGhpcy5ldmFsdWF0ZWRQb2ludHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMub25WaXN1YWxpemF0aW9uLmVtaXQoW10pO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVOb2RlRGF0YVJlZnJlbmNlKG9yaWdpbmFsTm9kZSwgcmVmcmVuY2VBdHRyaWJ1dGUpIHtcclxuICAgIHdpbmRvd1sndXBkYXRlTm9kZURhdGFSZWZyZW5jZSddKG9yaWdpbmFsTm9kZSwgcmVmcmVuY2VBdHRyaWJ1dGUpXHJcbiAgfVxyXG4gIHN0YXJ0QmxpbmtpbmcoKSB7XHJcbiAgICB3aW5kb3dbJ3N0YXJ0QmxpbmtpbmcnXSh0aGlzLnNldHRpbmdzKTtcclxuICB9XHJcbiAgc3RvcEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdG9wQmxpbmtpbmcnXSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBvaW50TWFrZXI6IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciwgXHJcbiAgICBwcml2YXRlIGV2YWx1YXRvcjogVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvclxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZGF0YSkge1xyXG4gICAgICB0aGlzLmludGVyZXN0aW5nUG9pbnRzID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnRhcmdldEtleXMgPXVuZGVmaW5lZDtcclxuICAgICAgc2V0VGltZW91dCh0aGlzLm5nT25Jbml0LmJpbmQodGhpcyksIDMzMyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKGFycmF5KTogYW55IHtcclxuICAgIGxldCByZXN1bHQ7XHJcbiAgICBsZXQgbWF4U2l6ZSA9IDA7XHJcbiAgICBhcnJheS5tYXAoIChpdGVtKT0+IHtcclxuICAgICAgIGxldCB4ID0gaXRlbSA/IE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA6IDA7XHJcbiAgICAgICBpZiAoeCA+IG1heFNpemUpIHtcclxuICAgICAgICBtYXhTaXplID0geDtcclxuICAgICAgICByZXN1bHQgPSBpdGVtO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiggISh0aGlzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgdGhpcy5kYXRhID0gW3RoaXMuZGF0YV07XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCAmJiB0aGlzLmVuYWJsZUNvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZmluZFJlZmVyZW5jZVN0cnVjdHVyZUZyb20odGhpcy5kYXRhKTtcclxuICAgICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludE1ha2VyLmdlbmVyYXRlUG9pbnRzKHJvb3QsIFwiXCIsIHRydWUpO1xyXG4gICAgICB0aGlzLmludGVyZXN0aW5nUG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICB0aGlzLnRhcmdldEtleXMgPSB0aGlzLnBvaW50TWFrZXIudGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzLCByb290KTtcclxuICAgIH1cclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oXHJcbiAgICAgIHRoaXMuc2FuaXRpemUodGhpcy5pbnRlcmVzdGluZ1BvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUodGhpcy50YXJnZXRLZXlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICghd2luZG93Wydpbml0aWF0ZUQzJ10pIHtcclxuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KFwiYXNzZXRzL2QzLmpzXCIsICdkM2pzJyk7XHJcbiAgICB9XHJcbiBcdH1cclxuICAgXHJcblx0cHJpdmF0ZSBsb2FkU2NyaXB0KHVybCwgaWQpIHsgICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgIC8vIGlmICghc2NyaXB0KSB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgIFxyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC5zcmMgPSB1cmw7XHJcbiAgICAgICAgLy8gc2NyaXB0RWxlbWVudC5pZCA9IGlkO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG4gICAgICAvLyB9XHJcblx0XHR9KVxyXG4gIH1cclxuICBcclxuICBwcml2YXRlIHNhbml0aXplKGxpc3QpIHtcclxuICAgIGNvbnN0IHNhbml0aXplZFBvaW50cyA9IFtdO1xyXG4gICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGgpIHtcclxuICAgICAgbGlzdC5tYXAoKHBvaW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBvaW50LnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICBzYW5pdGl6ZWRQb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleSA6IHBvaW50LmtleSxcclxuICAgICAgICAgICAgdmFsdWU6IHBvaW50LnZhbHVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNhbml0aXplZFBvaW50cztcclxuICB9XHJcbiAgb25jaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gZXZlbnQuYWxsb3dkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSBldmVudC5ncm91cGR1cGxpY2F0ZXM7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gZXZlbnQuY29uZmlndXJhdGlvbjtcclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQucG9pbnRzKSxcclxuICAgICAgdGhpcy5zYW5pdGl6ZShldmVudC5rZXlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
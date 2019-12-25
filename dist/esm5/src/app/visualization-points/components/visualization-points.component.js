import * as tslib_1 from "tslib";
/*
 * tool to display result of a search on set of points of interests on objects.
 */
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
    tslib_1.__decorate([
        Input("interestingPoints")
    ], VisualizationPointsComponent.prototype, "interestingPoints", void 0);
    tslib_1.__decorate([
        Input("targetKeys")
    ], VisualizationPointsComponent.prototype, "targetKeys", void 0);
    tslib_1.__decorate([
        Input("data")
    ], VisualizationPointsComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Input("allowduplicates")
    ], VisualizationPointsComponent.prototype, "allowduplicates", void 0);
    tslib_1.__decorate([
        Input("groupduplicates")
    ], VisualizationPointsComponent.prototype, "groupduplicates", void 0);
    tslib_1.__decorate([
        Input("settings")
    ], VisualizationPointsComponent.prototype, "settings", void 0);
    tslib_1.__decorate([
        Input("enableConfiguration")
    ], VisualizationPointsComponent.prototype, "enableConfiguration", void 0);
    tslib_1.__decorate([
        Output("onVisualization")
    ], VisualizationPointsComponent.prototype, "onVisualization", void 0);
    tslib_1.__decorate([
        ViewChild("d3Container", { static: false })
    ], VisualizationPointsComponent.prototype, "d3Container", void 0);
    VisualizationPointsComponent = tslib_1.__decorate([
        Component({
            selector: 'visualization-points',
            template: "\r\n\r\n<div class=\"configuration\" *ngIf=\"enableConfiguration && interestingPoints\">\r\n    <visualization-configuration\r\n        [interestingPoints]=\"interestingPoints\"\r\n        [targetKeys]=\"targetKeys\"\r\n        [configuration]=\"settings\"\r\n        [allowduplicates]=\"allowduplicates\"\r\n        [groupduplicates]=\"groupduplicates\"\r\n        (onchange)=\"onchange($event)\"></visualization-configuration>\r\n</div>\r\n<div class=\"d3-container\" id=\"d3-container\" #d3Container></div>\r\n",
            styles: [":host{box-sizing:border-box;display:table;position:relative;width:100%}:host #d3-container{border:1px solid #633;padding:0 5px;box-sizing:border-box;border-radius:5px;background-color:#fefefe;margin:5px}:host ::ng-deep .node circle{cursor:pointer}:host ::ng-deep .node rect{cursor:pointer}:host ::ng-deep div.tooltip{position:absolute;padding:5px;font:12px sans-serif;background:#cfcfcf;border:1px solid #3a3939;border-radius:4px;pointer-events:none;z-index:5}:host ::ng-deep .node text{font-size:11px;font-weight:700}:host ::ng-deep path{fill:none}"]
        })
    ], VisualizationPointsComponent);
    return VisualizationPointsComponent;
}());
export { VisualizationPointsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQVE3RjtJQW9HRSxzQ0FDVSxVQUFvQyxFQUNwQyxTQUF1QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQXBHekMsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFHN0Isc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBR3ZCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFNaEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsYUFBUSxHQUFvQjtZQUMxQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQixzQkFBc0IsRUFBRSxLQUFLO29CQUM3QixZQUFZLEVBQUUsQ0FBQztvQkFFZixxQkFBcUIsRUFBRSxLQUFLO29CQUM1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QUM5QjtJQTdERCw0QkFBNEI7UUFMeEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyw2Z0JBQW9EOztTQUVyRCxDQUFDO09BQ1csNEJBQTRCLENBOEx4QztJQUFELG1DQUFDO0NBQUEsQUE5TEQsSUE4TEM7U0E5TFksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogdG9vbCB0byBkaXNwbGF5IHJlc3VsdCBvZiBhIHNlYXJjaCBvbiBzZXQgb2YgcG9pbnRzIG9mIGludGVyZXN0cyBvbiBvYmplY3RzLlxyXG4gKi9cclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBBZnRlclZpZXdJbml0ICxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1wb2ludHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyAge1xyXG5cclxuICBwcml2YXRlIGV2YWx1YXRlZFBvaW50cyA9IHt9O1xyXG4gIFxyXG4gIEBJbnB1dChcImludGVyZXN0aW5nUG9pbnRzXCIpXHJcbiAgaW50ZXJlc3RpbmdQb2ludHMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwidGFyZ2V0S2V5c1wiKVxyXG4gIHRhcmdldEtleXMgPSBbXTtcclxuXHJcbiAgQElucHV0KFwiZGF0YVwiKVxyXG4gIGRhdGE6IGFueTtcclxuXHJcbiAgQElucHV0KFwiYWxsb3dkdXBsaWNhdGVzXCIpXHJcbiAgYWxsb3dkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dChcImdyb3VwZHVwbGljYXRlc1wiKVxyXG4gIGdyb3VwZHVwbGljYXRlcyA9IGZhbHNlO1xyXG4gIFxyXG4gIEBJbnB1dChcInNldHRpbmdzXCIpXHJcbiAgc2V0dGluZ3M6IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfSxcclxuICAgICAgbm9kZXM6IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibGFja1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJlbmFibGVDb25maWd1cmF0aW9uXCIpXHJcbiAgZW5hYmxlQ29uZmlndXJhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dChcIm9uVmlzdWFsaXphdGlvblwiKVxyXG4gIG9uVmlzdWFsaXphdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQFZpZXdDaGlsZChcImQzQ29udGFpbmVyXCIsIHtzdGF0aWM6IGZhbHNlfSlcclxuICBkM0NvbnRhaW5lcjtcclxuXHJcbiAgcHJpdmF0ZSBzaXplVXAocG9pbnRzKSB7XHJcbiAgICBjb25zdCBzaXplID0gKHBvaW50cy5jaGlsZHJlbiAmJiBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoKSA/IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggOiB1bmRlZmluZWQ7XHJcbiAgICBpZiAoc2l6ZSkge1xyXG4gICAgICBwb2ludHMubmFtZSArPSBwb2ludHMuY2hpbGRyZW4ubGVuZ3RoID4gMSA/IFwiIChcIiArIHNpemUgKyBcIilcIiA6IFwiXCI7XHJcbiAgICAgIHBvaW50cy5jaGlsZHJlbi5tYXAoIChwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaXplVXAocCk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcG9pbnRzO1xyXG4gIH1cclxuICBwcml2YXRlIHRyaWdnZXJFdmFsdWF0aW9uKHBvaW50cywgcHJpbWFyaWVzKSB7XHJcbiAgICBpZiAocG9pbnRzLmxlbmd0aCAmJiBwcmltYXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLmV2YWx1YXRlZFBvaW50cyA9IHRoaXMuZXZhbHVhdG9yLmV2YWx1YXRlUG9pbnRzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJpZXMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzKTtcclxuICAgICAgY29uc3Qgc2l6ZWR1cFBvaW50cyA9IHRoaXMuc2l6ZVVwKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ldmFsdWF0ZWRQb2ludHMpKSk7XHJcbiAgICAgIHdpbmRvd1snaW5pdGlhdGVEMyddKHNpemVkdXBQb2ludHMsIHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KHRoaXMuZXZhbHVhdGVkUG9pbnRzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZDNDb250YWluZXIubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICB0aGlzLm9uVmlzdWFsaXphdGlvbi5lbWl0KFtdKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZURhdGFSZWZyZW5jZShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKSB7XHJcbiAgICB3aW5kb3dbJ3VwZGF0ZU5vZGVEYXRhUmVmcmVuY2UnXShvcmlnaW5hbE5vZGUsIHJlZnJlbmNlQXR0cmlidXRlKVxyXG4gIH1cclxuICBzdGFydEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdGFydEJsaW5raW5nJ10odGhpcy5zZXR0aW5ncyk7XHJcbiAgfVxyXG4gIHN0b3BCbGlua2luZygpIHtcclxuICAgIHdpbmRvd1snc3RvcEJsaW5raW5nJ10oKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb2ludE1ha2VyOiBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsIFxyXG4gICAgcHJpdmF0ZSBldmFsdWF0b3I6IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICApIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xyXG5cclxuICAgIGlmIChjaGFuZ2VzLmRhdGEpIHtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID11bmRlZmluZWQ7XHJcbiAgICAgIHNldFRpbWVvdXQodGhpcy5uZ09uSW5pdC5iaW5kKHRoaXMpLCAzMzMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kUmVmZXJlbmNlU3RydWN0dXJlRnJvbShhcnJheSk6IGFueSB7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG4gICAgbGV0IG1heFNpemUgPSAwO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSk9PiB7XHJcbiAgICAgICBsZXQgeCA9IGl0ZW0gPyBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggOiAwO1xyXG4gICAgICAgaWYgKHggPiBtYXhTaXplKSB7XHJcbiAgICAgICAgbWF4U2l6ZSA9IHg7XHJcbiAgICAgICAgcmVzdWx0ID0gaXRlbTtcclxuICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYoICEodGhpcy5kYXRhIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IFt0aGlzLmRhdGFdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggJiYgdGhpcy5lbmFibGVDb25maWd1cmF0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSB0aGlzLmZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKHRoaXMuZGF0YSk7XHJcbiAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMucG9pbnRNYWtlci5nZW5lcmF0ZVBvaW50cyhyb290LCBcIlwiLCB0cnVlKTtcclxuICAgICAgdGhpcy5pbnRlcmVzdGluZ1BvaW50cyA9IHBvaW50cztcclxuICAgICAgdGhpcy50YXJnZXRLZXlzID0gdGhpcy5wb2ludE1ha2VyLnRhcmdldEtleXNGcm9tR2VuZXJhdGVkUG9pbnRzKHBvaW50cywgcm9vdCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMuaW50ZXJlc3RpbmdQb2ludHMpLFxyXG4gICAgICB0aGlzLnNhbml0aXplKHRoaXMudGFyZ2V0S2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAoIXdpbmRvd1snaW5pdGlhdGVEMyddKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMubG9hZFNjcmlwdChcImFzc2V0cy9kMy5qc1wiLCAnZDNqcycpO1xyXG4gICAgfVxyXG4gXHR9XHJcbiAgIFxyXG5cdHByaXZhdGUgbG9hZFNjcmlwdCh1cmwsIGlkKSB7ICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgICAvLyBpZiAoIXNjcmlwdCkge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICBcclxuICAgICAgICBzY3JpcHRFbGVtZW50LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQuc3JjID0gdXJsO1xyXG4gICAgICAgIC8vIHNjcmlwdEVsZW1lbnQuaWQgPSBpZDtcclxuICAgICAgICBzY3JpcHRFbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcclxuICAgICAgLy8gfVxyXG5cdFx0fSlcclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBzYW5pdGl6ZShsaXN0KSB7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRQb2ludHMgPSBbXTtcclxuICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgIGxpc3QubWFwKChwb2ludCkgPT4ge1xyXG4gICAgICAgIGlmIChwb2ludC5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgc2FuaXRpemVkUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBrZXkgOiBwb2ludC5rZXksXHJcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludC52YWx1ZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBzYW5pdGl6ZWRQb2ludHM7XHJcbiAgfVxyXG4gIG9uY2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGV2ZW50LmFsbG93ZHVwbGljYXRlcztcclxuICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gZXZlbnQuZ3JvdXBkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IGV2ZW50LmNvbmZpZ3VyYXRpb247XHJcbiAgICB0aGlzLnRyaWdnZXJFdmFsdWF0aW9uKFxyXG4gICAgICB0aGlzLnNhbml0aXplKGV2ZW50LnBvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQua2V5cylcclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=
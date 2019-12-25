import * as tslib_1 from "tslib";
/*
 * tool to display result of a search on set of points of interests on objects.
 */
import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { VisualizationPointsMaker } from '../injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from '../injectables/visualization-points-evaluator';
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
export { VisualizationPointsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7QUFDSCxPQUFPLEVBQ0wsU0FBUyxFQUlULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQVE3RixJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE0QjtJQW9HdkMsWUFDVSxVQUFvQyxFQUNwQyxTQUF1QztRQUR2QyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUNwQyxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQXBHekMsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFHN0Isc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBR3ZCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFNaEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsYUFBUSxHQUFvQjtZQUMxQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQixrQkFBa0IsRUFBRSxNQUFNO29CQUMxQixzQkFBc0IsRUFBRSxLQUFLO29CQUM3QixZQUFZLEVBQUUsQ0FB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UyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyw2Z0JBQW9EOztLQUVyRCxDQUFDO0dBQ1csNEJBQTRCLENBOEx4QztTQTlMWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIEFmdGVyVmlld0luaXQgLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlcic7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3IgfSBmcm9tICcuLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5pbXBvcnQgeyBEM0NvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd2aXN1YWxpemF0aW9uLXBvaW50cycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XHJcblxyXG4gIHByaXZhdGUgZXZhbHVhdGVkUG9pbnRzID0ge307XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgZGF0YTogYW55O1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcbiAgXHJcbiAgQElucHV0KFwic2V0dGluZ3NcIilcclxuICBzZXR0aW5nczogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMyxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICBcclxuICAgICAgICBcImhvdmVyLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjEsXHJcbiAgICAgICAgXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwib3JhbmdlXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDFcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIEBJbnB1dChcImVuYWJsZUNvbmZpZ3VyYXRpb25cIilcclxuICBlbmFibGVDb25maWd1cmF0aW9uOiBib29sZWFuO1xyXG5cclxuICBAT3V0cHV0KFwib25WaXN1YWxpemF0aW9uXCIpXHJcbiAgb25WaXN1YWxpemF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAVmlld0NoaWxkKFwiZDNDb250YWluZXJcIiwge3N0YXRpYzogZmFsc2V9KVxyXG4gIGQzQ29udGFpbmVyO1xyXG5cclxuICBwcml2YXRlIHNpemVVcChwb2ludHMpIHtcclxuICAgIGNvbnN0IHNpemUgPSAocG9pbnRzLmNoaWxkcmVuICYmIHBvaW50cy5jaGlsZHJlbi5sZW5ndGgpID8gcG9pbnRzLmNoaWxkcmVuLmxlbmd0aCA6IHVuZGVmaW5lZDtcclxuICAgIGlmIChzaXplKSB7XHJcbiAgICAgIHBvaW50cy5uYW1lICs9IHBvaW50cy5jaGlsZHJlbi5sZW5ndGggPiAxID8gXCIgKFwiICsgc2l6ZSArIFwiKVwiIDogXCJcIjtcclxuICAgICAgcG9pbnRzLmNoaWxkcmVuLm1hcCggKHApID0+IHtcclxuICAgICAgICB0aGlzLnNpemVVcChwKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiBwb2ludHM7XHJcbiAgfVxyXG4gIHByaXZhdGUgdHJpZ2dlckV2YWx1YXRpb24ocG9pbnRzLCBwcmltYXJpZXMpIHtcclxuICAgIGlmIChwb2ludHMubGVuZ3RoICYmIHByaW1hcmllcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuZXZhbHVhdGVkUG9pbnRzID0gdGhpcy5ldmFsdWF0b3IuZXZhbHVhdGVQb2ludHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcmllcywgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMpO1xyXG4gICAgICBjb25zdCBzaXplZHVwUG9pbnRzID0gdGhpcy5zaXplVXAoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmV2YWx1YXRlZFBvaW50cykpKTtcclxuICAgICAgd2luZG93Wydpbml0aWF0ZUQzJ10oc2l6ZWR1cFBvaW50cywgdGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgIHRoaXMub25WaXN1YWxpemF0aW9uLmVtaXQodGhpcy5ldmFsdWF0ZWRQb2ludHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kM0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMub25WaXN1YWxpemF0aW9uLmVtaXQoW10pO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVOb2RlRGF0YVJlZnJlbmNlKG9yaWdpbmFsTm9kZSwgcmVmcmVuY2VBdHRyaWJ1dGUpIHtcclxuICAgIHdpbmRvd1sndXBkYXRlTm9kZURhdGFSZWZyZW5jZSddKG9yaWdpbmFsTm9kZSwgcmVmcmVuY2VBdHRyaWJ1dGUpXHJcbiAgfVxyXG4gIHN0YXJ0QmxpbmtpbmcoKSB7XHJcbiAgICB3aW5kb3dbJ3N0YXJ0QmxpbmtpbmcnXSh0aGlzLnNldHRpbmdzKTtcclxuICB9XHJcbiAgc3RvcEJsaW5raW5nKCkge1xyXG4gICAgd2luZG93WydzdG9wQmxpbmtpbmcnXSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBvaW50TWFrZXI6IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciwgXHJcbiAgICBwcml2YXRlIGV2YWx1YXRvcjogVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvclxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZGF0YSkge1xyXG4gICAgICB0aGlzLmludGVyZXN0aW5nUG9pbnRzID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnRhcmdldEtleXMgPXVuZGVmaW5lZDtcclxuICAgICAgc2V0VGltZW91dCh0aGlzLm5nT25Jbml0LmJpbmQodGhpcyksIDMzMyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRSZWZlcmVuY2VTdHJ1Y3R1cmVGcm9tKGFycmF5KTogYW55IHtcclxuICAgIGxldCByZXN1bHQ7XHJcbiAgICBsZXQgbWF4U2l6ZSA9IDA7XHJcbiAgICBhcnJheS5tYXAoIChpdGVtKT0+IHtcclxuICAgICAgIGxldCB4ID0gaXRlbSA/IE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA6IDA7XHJcbiAgICAgICBpZiAoeCA+IG1heFNpemUpIHtcclxuICAgICAgICBtYXhTaXplID0geDtcclxuICAgICAgICByZXN1bHQgPSBpdGVtO1xyXG4gICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiggISh0aGlzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgdGhpcy5kYXRhID0gW3RoaXMuZGF0YV07XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCAmJiB0aGlzLmVuYWJsZUNvbmZpZ3VyYXRpb24pIHtcclxuICAgICAgY29uc3Qgcm9vdCA9IHRoaXMuZmluZFJlZmVyZW5jZVN0cnVjdHVyZUZyb20odGhpcy5kYXRhKTtcclxuICAgICAgY29uc3QgcG9pbnRzID0gdGhpcy5wb2ludE1ha2VyLmdlbmVyYXRlUG9pbnRzKHJvb3QsIFwiXCIsIHRydWUpO1xyXG4gICAgICB0aGlzLmludGVyZXN0aW5nUG9pbnRzID0gcG9pbnRzO1xyXG4gICAgICB0aGlzLnRhcmdldEtleXMgPSB0aGlzLnBvaW50TWFrZXIudGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzLCByb290KTtcclxuICAgIH1cclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oXHJcbiAgICAgIHRoaXMuc2FuaXRpemUodGhpcy5pbnRlcmVzdGluZ1BvaW50cyksXHJcbiAgICAgIHRoaXMuc2FuaXRpemUodGhpcy50YXJnZXRLZXlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIGlmICghd2luZG93Wydpbml0aWF0ZUQzJ10pIHtcclxuICAgICAgYXdhaXQgdGhpcy5sb2FkU2NyaXB0KFwiYXNzZXRzL2QzLmpzXCIsICdkM2pzJyk7XHJcbiAgICB9XHJcbiBcdH1cclxuICAgXHJcblx0cHJpdmF0ZSBsb2FkU2NyaXB0KHVybCwgaWQpIHsgICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICAgIC8vIGlmICghc2NyaXB0KSB7XHJcbiAgICAgICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgIFxyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiAgICAgICAgc2NyaXB0RWxlbWVudC5zcmMgPSB1cmw7XHJcbiAgICAgICAgLy8gc2NyaXB0RWxlbWVudC5pZCA9IGlkO1xyXG4gICAgICAgIHNjcmlwdEVsZW1lbnQub25sb2FkID0gcmVzb2x2ZTtcclxuICAgICAgICBcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xyXG4gICAgICAvLyB9XHJcblx0XHR9KVxyXG4gIH1cclxuICBcclxuICBwcml2YXRlIHNhbml0aXplKGxpc3QpIHtcclxuICAgIGNvbnN0IHNhbml0aXplZFBvaW50cyA9IFtdO1xyXG4gICAgaWYgKGxpc3QgJiYgbGlzdC5sZW5ndGgpIHtcclxuICAgICAgbGlzdC5tYXAoKHBvaW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHBvaW50LnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICBzYW5pdGl6ZWRQb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleSA6IHBvaW50LmtleSxcclxuICAgICAgICAgICAgdmFsdWU6IHBvaW50LnZhbHVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNhbml0aXplZFBvaW50cztcclxuICB9XHJcbiAgb25jaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gZXZlbnQuYWxsb3dkdXBsaWNhdGVzO1xyXG4gICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSBldmVudC5ncm91cGR1cGxpY2F0ZXM7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gZXZlbnQuY29uZmlndXJhdGlvbjtcclxuICAgIHRoaXMudHJpZ2dlckV2YWx1YXRpb24oXHJcbiAgICAgIHRoaXMuc2FuaXRpemUoZXZlbnQucG9pbnRzKSxcclxuICAgICAgdGhpcy5zYW5pdGl6ZShldmVudC5rZXlzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==
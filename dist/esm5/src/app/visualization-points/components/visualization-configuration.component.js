import * as tslib_1 from "tslib";
/*
 * tool to display result of a search on set of points of interests on objects.
 */
import { Component, Input, Output, EventEmitter, Renderer } from '@angular/core';
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
        this.onchange = new EventEmitter();
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
        { type: Renderer }
    ]; };
    tslib_1.__decorate([
        Input("interestingPoints")
    ], VisualizationConfigurationComponent.prototype, "interestingPoints", void 0);
    tslib_1.__decorate([
        Input("targetKeys")
    ], VisualizationConfigurationComponent.prototype, "targetKeys", void 0);
    tslib_1.__decorate([
        Input("allowduplicates")
    ], VisualizationConfigurationComponent.prototype, "allowduplicates", void 0);
    tslib_1.__decorate([
        Input("configuration")
    ], VisualizationConfigurationComponent.prototype, "configuration", void 0);
    tslib_1.__decorate([
        Input("groupduplicates")
    ], VisualizationConfigurationComponent.prototype, "groupduplicates", void 0);
    tslib_1.__decorate([
        Output("onchange")
    ], VisualizationConfigurationComponent.prototype, "onchange", void 0);
    VisualizationConfigurationComponent = tslib_1.__decorate([
        Component({
            selector: 'visualization-configuration',
            template: "<p class=\"info\">\r\n    <span>\r\n        Pick points are the attributes in which you want to evaluate. \r\n        Target keys are the attributes in which evaluated data will be presented on.\r\n    </span>\r\n    <span>\r\n        For example: if you are examining users and pick user age and city as pick points, \r\n        data will be evaluated on city and age. And if you pick user name and gender as target keys, \r\n        for each age and city reference, you will see the resulting data as name and age values.</span>\r\n</p>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Target Keys:</legend>\r\n    <label *ngFor=\"let x of targetKeys; let i = index\" [for]=\"'targetKey' + i\">\r\n        <input \r\n            type=\"checkbox\" \r\n            name=\"targetKey\" \r\n            [id]=\"'targetKey' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" /> \r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>   \r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Pick Points:</legend>\r\n    <label *ngFor=\"let x of interestingPoints; let i = index\" [for]=\"'pickpoint' + i\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"pickpoint\" \r\n            [id]=\"'pickpoint' + i\" \r\n            [value]=\"x.value\" \r\n            [checked]=\"x.selected ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, x)\" />\r\n        <span [textContent]=\"x.value\"></span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points default\">\r\n    <legend>Presentation:</legend>\r\n    <label for=\"directionality\">Directionality:</label>\r\n    <select name=\"directionality\" \r\n            id=\"directionality\" \r\n            (change)=\"chaneDirectionality($event)\">\r\n        <option value=\"L2R\">Left to Right</option>\r\n        <option value=\"R2L\">Right to Left</option>\r\n        <option value=\"TD\">Top Down</option>\r\n    </select>\r\n    <label for=\"nodeType\">Node Type:</label>\r\n    <select name=\"nodeType\" \r\n            id=\"nodeType\" \r\n            (change)=\"changeNodeType($event)\">\r\n        <option value=\"Plain\">Plain</option>\r\n        <option value=\"Rectangle\">Rectangle</option>\r\n        <option value=\"Circle\">Circle</option>\r\n    </select>\r\n    <label for=\"colorSets\">Color sets:</label>\r\n    <select name=\"colorSets\" \r\n            id=\"colorSets\" \r\n            (change)=\"changeColorSets($event)\">\r\n        <option value=\"1\">Sample 1</option>\r\n        <option value=\"2\">Sample 2</option>\r\n    </select>\r\n    <label for=\"tooltip\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"tooltip\" \r\n            id=\"tooltip\" \r\n            [checked]=\"configuration.tooltipEnabled ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'tooltipEnabled')\" />\r\n        <span>Enable Tool tip</span>\r\n    </label>\r\n</fieldset>\r\n<fieldset class=\"pick-points\">\r\n    <legend>Duplicates In result set:</legend>\r\n    <label for=\"allowduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"allowduplicates\" \r\n            id=\"allowduplicates\" \r\n            [value]=\"allowduplicates\" \r\n            [checked]=\"allowduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'allowduplicates')\" />\r\n        <span>Allow Duplicates</span>\r\n    </label>\r\n    <label for=\"groupduplicates\">\r\n        <input\r\n            type=\"checkbox\" \r\n            name=\"groupduplicates\" \r\n            id=\"groupduplicates\" \r\n            [value]=\"groupduplicates\" \r\n            [checked]=\"groupduplicates ? true: null\" \r\n            (keyup)=\"keyup($event)\"\r\n            (click)=\"click($event, 'groupduplicates')\" />\r\n        <span>Group Duplicates</span>\r\n    </label>\r\n</fieldset>\r\n",
            styles: [":host{box-sizing:border-box;display:table;padding:5px}:host .info{padding:5px 0;margin:0;font-size:.9em}:host .pick-points{box-sizing:border-box;border:1px solid #633;display:block;float:left;padding:0 0 5px;width:100%;margin:0;border-radius:5px;background-color:#fefefe}:host .pick-points legend{font-weight:700;margin-left:20px;color:#633}:host .pick-points label{display:inline-table;width:24.33%}:host .pick-points label:hover{color:#ca0000}:host .pick-points.default label{width:15%;text-align:right}"]
        })
    ], VisualizationConfigurationComponent);
    return VisualizationConfigurationComponent;
}());
export { VisualizationConfigurationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRztBQUNILE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBUXZCO0lBcURFLDZDQUFvQixRQUFrQjtRQUFsQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBbER0QyxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFHdkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUdoQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixrQkFBYSxHQUFvQjtZQUMvQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0wsb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsY0FBYyxFQUFFLENBQUM7b0JBRWpCLGtCQUFrQixFQUFFLFNBQVM7b0JBQzdCLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLFlBQVksRUFBRSxHQUFHO29CQUVqQixxQkFBcUIsRUFBRSxLQUFLO29CQUM1QixlQUFlLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLDBCQUEwQixFQUFFLE9BQU87b0JBQ25DLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQix3QkFBd0IsRUFBRSxXQUFXO29CQUNyQyxrQkFB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O1lBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXpHNkIsUUFBUTs7SUFsRHRDO1FBREMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO2tGQUNKO0lBR3ZCO1FBREMsS0FBSyxDQUFDLFlBQVksQ0FBQzsyRUFDSjtJQUdoQjtRQURDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztnRkFDRDtJQUd4QjtRQURDLEtBQUssQ0FBQyxlQUFlLENBQUM7OEVBa0NyQjtJQUdGO1FBREMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO2dGQUNEO0lBR3hCO1FBREMsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5RUFDVztJQW5EbkIsbUNBQW1DO1FBTC9DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsb2hJQUEyRDs7U0FFNUQsQ0FBQztPQUNXLG1DQUFtQyxDQStKL0M7SUFBRCwwQ0FBQztDQUFBLEFBL0pELElBK0pDO1NBL0pZLG1DQUFtQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHRvb2wgdG8gZGlzcGxheSByZXN1bHQgb2YgYSBzZWFyY2ggb24gc2V0IG9mIHBvaW50cyBvZiBpbnRlcmVzdHMgb24gb2JqZWN0cy5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgUmVuZGVyZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IHtcclxuICBcclxuICBASW5wdXQoXCJpbnRlcmVzdGluZ1BvaW50c1wiKVxyXG4gIGludGVyZXN0aW5nUG9pbnRzID0gW107XHJcblxyXG4gIEBJbnB1dChcInRhcmdldEtleXNcIilcclxuICB0YXJnZXRLZXlzID0gW107XHJcblxyXG4gIEBJbnB1dChcImFsbG93ZHVwbGljYXRlc1wiKVxyXG4gIGFsbG93ZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoXCJjb25maWd1cmF0aW9uXCIpXHJcbiAgY29uZmlndXJhdGlvbjogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIGJsaW5rQXR0cmlidXRlc1dhdGNoOiBbXSxcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vZGVzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJncm91cGR1cGxpY2F0ZXNcIilcclxuICBncm91cGR1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dChcIm9uY2hhbmdlXCIpXHJcbiAgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxyXG5cclxuICBrZXl1cChldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKGNvZGUgPT09IDEzKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsIFwiY2xpY2tcIik7XHJcblx0XHR9XHJcbiAgfVxyXG5cclxuICBjaGFuZURpcmVjdGlvbmFsaXR5KGV2ZW50KSB7XHJcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24uZGlyZWN0aW9uYWxpdHkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU5vZGVUeXBlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubm9kZVR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcbiAgY2hhbmdlQ29sb3JTZXRzKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09IDEpIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5saW5rcyA9IHtcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwibGlnaHRzdGVlbGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5ub2RlcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodHN0ZWVsYmx1ZVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjUsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuMyxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxhYmVsLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcImhvdmVyLWxhYmVsLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGFiZWwtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLmxpbmtzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLjIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDIuMixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS4zLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyZWVuXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcIiNmNThjMjRcIlxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLm5vZGVzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwieWVsbG93XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI2NhZDJkMlwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcImJsdWVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMi41LFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjksXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcIiNmNThjMjRcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxhYmVsLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcImhvdmVyLWxhYmVsLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGFiZWwtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNsaWNrKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChpdGVtID09PSBcImFsbG93ZHVwbGljYXRlc1wiKSB7XHJcbiAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gaW5wdXQuY2hlY2tlZDtcclxuICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSB0aGlzLmFsbG93ZHVwbGljYXRlcyA/IHRoaXMuZ3JvdXBkdXBsaWNhdGVzIDogZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwiZ3JvdXBkdXBsaWNhdGVzXCIpIHtcclxuICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9ICB0aGlzLmdyb3VwZHVwbGljYXRlcyA/IHRydWUgOiB0aGlzLmFsbG93ZHVwbGljYXRlcztcclxuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJ0b29sdGlwRW5hYmxlZFwiKSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi50b29sdGlwRW5hYmxlZCA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gKGlucHV0LmNoZWNrZWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgZW1pdENoYW5nZSgpIHtcclxuICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcbiAgICAgIHBvaW50czogdGhpcy5pbnRlcmVzdGluZ1BvaW50cyxcclxuICAgICAga2V5czogdGhpcy50YXJnZXRLZXlzLFxyXG4gICAgICBhbGxvd2R1cGxpY2F0ZXM6IHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICBjb25maWd1cmF0aW9uOiB0aGlzLmNvbmZpZ3VyYXRpb25cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
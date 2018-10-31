/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, Renderer } from '@angular/core';
export class VisualizationConfigurationComponent {
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
if (false) {
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.interestingPoints;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.targetKeys;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.allowduplicates;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.configuration;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.groupduplicates;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.onchange;
    /** @type {?} */
    VisualizationConfigurationComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBUXZCLE1BQU07Ozs7SUFxREosWUFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtpQ0FsRGxCLEVBQUU7MEJBR1QsRUFBRTsrQkFHRyxLQUFLOzZCQUdVO1lBQy9CLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLG9CQUFvQixFQUFFLEVBQUU7WUFDeEIsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRTtvQkFDTCxvQkFBb0IsRUFBRSxNQUFNO29CQUM1QixjQUFjLEVBQUUsQ0FBQztvQkFFakIsa0JBQWtCLEVBQUUsU0FBUztvQkFDN0Isc0JBQXNCLEVBQUUsS0FBSztvQkFDN0IsWUFBWSxFQUFFLEdBQUc7b0JBRWpCLHFCQUFxQixFQUFFLEtBQUs7b0JBQzVCLGVBQWUsRUFBRSxDQUFDO2lCQUNuQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsMEJBQTBCLEVBQUUsT0FBTztvQkFDbkMsb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsY0FBYyxFQUFFLENBQUM7b0JBRWpCLHdCQUF3QixFQUFFLFdBQVc7b0JBQ3JDLGtCQUFrQixFQUFFLFNBQVM7b0JBQzdCLHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLFlBQVksRUFBRSxHQUFHO29CQUVqQiwy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QyxpQkFBaUI7WUFDOUIsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDbEMsQ0FBQyxDQUFDOzs7O1lBbEtOLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxvaElBQTJEOzthQUU1RDs7OztZQVJDLFFBQVE7OztnQ0FXUCxLQUFLLFNBQUMsbUJBQW1CO3lCQUd6QixLQUFLLFNBQUMsWUFBWTs4QkFHbEIsS0FBSyxTQUFDLGlCQUFpQjs0QkFHdkIsS0FBSyxTQUFDLGVBQWU7OEJBb0NyQixLQUFLLFNBQUMsaUJBQWlCO3VCQUd2QixNQUFNLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIHRvb2wgdG8gZGlzcGxheSByZXN1bHQgb2YgYSBzZWFyY2ggb24gc2V0IG9mIHBvaW50cyBvZiBpbnRlcmVzdHMgb24gb2JqZWN0cy5cclxuICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgUmVuZGVyZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRDNDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IHtcclxuICBcclxuICBASW5wdXQoXCJpbnRlcmVzdGluZ1BvaW50c1wiKVxyXG4gIGludGVyZXN0aW5nUG9pbnRzID0gW107XHJcblxyXG4gIEBJbnB1dChcInRhcmdldEtleXNcIilcclxuICB0YXJnZXRLZXlzID0gW107XHJcblxyXG4gIEBJbnB1dChcImFsbG93ZHVwbGljYXRlc1wiKVxyXG4gIGFsbG93ZHVwbGljYXRlcyA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoXCJjb25maWd1cmF0aW9uXCIpXHJcbiAgY29uZmlndXJhdGlvbjogRDNDb25maWd1cmF0aW9uID0ge1xyXG4gICAgdG9vbHRpcEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZGlyZWN0aW9uYWxpdHk6IFwiTDJSXCIsXHJcbiAgICBub2RlVHlwZTogXCJQbGFpblwiLFxyXG4gICAgdGFyZ2V0RGl2OiBcIiNkMy1jb250YWluZXJcIixcclxuICAgIGJsaW5rQXR0cmlidXRlc1dhdGNoOiBbXSxcclxuICAgIHN0eWxlczoge1xyXG4gICAgICBsaW5rczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vZGVzOiB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiZ3JheVwiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS4xLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcIm9yYW5nZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBASW5wdXQoXCJncm91cGR1cGxpY2F0ZXNcIilcclxuICBncm91cGR1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQE91dHB1dChcIm9uY2hhbmdlXCIpXHJcbiAgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyKSB7fVxyXG5cclxuICBrZXl1cChldmVudCkge1xyXG4gICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG4gICAgaWYgKGNvZGUgPT09IDEzKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsIFwiY2xpY2tcIik7XHJcblx0XHR9XHJcbiAgfVxyXG5cclxuICBjaGFuZURpcmVjdGlvbmFsaXR5KGV2ZW50KSB7XHJcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24uZGlyZWN0aW9uYWxpdHkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU5vZGVUeXBlKGV2ZW50KSB7XHJcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb24ubm9kZVR5cGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcbiAgY2hhbmdlQ29sb3JTZXRzKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlID09IDEpIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5saW5rcyA9IHtcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDMsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwibGlnaHRzdGVlbGJsdWVcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtY29sb3JcIjogXCIjZmNiMmIyXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5ub2RlcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1kYXNoYXJyYXlcIjogXCI1LDVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJsaWdodHN0ZWVsYmx1ZVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAxLjUsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuMyxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxhYmVsLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcImhvdmVyLWxhYmVsLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGFiZWwtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLmxpbmtzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLjIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDIuMixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS4zLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyZWVuXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcIiNmNThjMjRcIlxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc3R5bGVzLm5vZGVzID0ge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwieWVsbG93XCIsXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI2NhZDJkMlwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvclwiOiBcImJsdWVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMi41LFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjksXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcIiNmNThjMjRcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxhYmVsLWNvbG9yXCI6IFwiYmxhY2tcIixcclxuICAgICAgICBcImhvdmVyLWxhYmVsLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGFiZWwtY29sb3JcIjogXCJyZWRcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmVtaXRDaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIGNsaWNrKGV2ZW50LCBpdGVtKSB7XHJcbiAgICBjb25zdCBpbnB1dCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmIChpdGVtID09PSBcImFsbG93ZHVwbGljYXRlc1wiKSB7XHJcbiAgICAgIHRoaXMuYWxsb3dkdXBsaWNhdGVzID0gaW5wdXQuY2hlY2tlZDtcclxuICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSB0aGlzLmFsbG93ZHVwbGljYXRlcyA/IHRoaXMuZ3JvdXBkdXBsaWNhdGVzIDogZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwiZ3JvdXBkdXBsaWNhdGVzXCIpIHtcclxuICAgICAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9ICB0aGlzLmdyb3VwZHVwbGljYXRlcyA/IHRydWUgOiB0aGlzLmFsbG93ZHVwbGljYXRlcztcclxuICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJ0b29sdGlwRW5hYmxlZFwiKSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi50b29sdGlwRW5hYmxlZCA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLnNlbGVjdGVkID0gKGlucHV0LmNoZWNrZWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgZW1pdENoYW5nZSgpIHtcclxuICAgIHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcbiAgICAgIHBvaW50czogdGhpcy5pbnRlcmVzdGluZ1BvaW50cyxcclxuICAgICAga2V5czogdGhpcy50YXJnZXRLZXlzLFxyXG4gICAgICBhbGxvd2R1cGxpY2F0ZXM6IHRoaXMuYWxsb3dkdXBsaWNhdGVzLFxyXG4gICAgICBjb25maWd1cmF0aW9uOiB0aGlzLmNvbmZpZ3VyYXRpb25cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=
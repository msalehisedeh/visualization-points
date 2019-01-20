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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BzZWRlaC92aXN1YWxpemF0aW9uLXBvaW50cy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlzdWFsaXphdGlvbi1wb2ludHMvY29tcG9uZW50cy92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQVF2QixNQUFNOzs7O0lBcURKLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7aUNBbERsQixFQUFFOzBCQUdULEVBQUU7K0JBR0csS0FBSzs2QkFHVTtZQUMvQixjQUFjLEVBQUUsS0FBSztZQUNyQixjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsZUFBZTtZQUMxQixvQkFBb0IsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUU7b0JBQ0wsb0JBQW9CLEVBQUUsTUFBTTtvQkFDNUIsY0FBYyxFQUFFLENBQUM7b0JBRWpCLGtCQUFrQixFQUFFLFNBQVM7b0JBQzdCLHNCQUFzQixFQUFFLEtBQUs7b0JBQzdCLFlBQVksRUFBRSxHQUFHO29CQUVqQixxQkFBcUIsRUFBRSxLQUFLO29CQUM1QixlQUFlLEVBQUUsQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLDBCQUEwQixFQUFFLE9BQU87b0JBQ25DLG9CQUFvQixFQUFFLE1BQU07b0JBQzVCLGNBQWMsRUFBRSxDQUFDO29CQUVqQix3QkFBd0IsRUFBRSxXQUFXO29CQUNyQyxrQkFBa0IsRUFBRSxTQUFTO29CQUM3QixzQkFBc0IsRUFBRSxRQUFRO29CQUNoQyxZQUFZLEVBQUUsR0FBRztv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QUFJLENBQUMsaUJBQWlCO1lBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtZQUNyQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ2xDLENBQUMsQ0FBQzs7OztZQWxLTixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsb2hJQUEyRDs7YUFFNUQ7Ozs7WUFSQyxRQUFROzs7Z0NBV1AsS0FBSyxTQUFDLG1CQUFtQjt5QkFHekIsS0FBSyxTQUFDLFlBQVk7OEJBR2xCLEtBQUssU0FBQyxpQkFBaUI7NEJBR3ZCLEtBQUssU0FBQyxlQUFlOzhCQW9DckIsS0FBSyxTQUFDLGlCQUFpQjt1QkFHdkIsTUFBTSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiB0b29sIHRvIGRpc3BsYXkgcmVzdWx0IG9mIGEgc2VhcmNoIG9uIHNldCBvZiBwb2ludHMgb2YgaW50ZXJlc3RzIG9uIG9iamVjdHMuXHJcbiAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFJlbmRlcmVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEQzQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCB7XHJcbiAgXHJcbiAgQElucHV0KFwiaW50ZXJlc3RpbmdQb2ludHNcIilcclxuICBpbnRlcmVzdGluZ1BvaW50cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJ0YXJnZXRLZXlzXCIpXHJcbiAgdGFyZ2V0S2V5cyA9IFtdO1xyXG5cclxuICBASW5wdXQoXCJhbGxvd2R1cGxpY2F0ZXNcIilcclxuICBhbGxvd2R1cGxpY2F0ZXMgPSBmYWxzZTtcclxuXHJcbiAgQElucHV0KFwiY29uZmlndXJhdGlvblwiKVxyXG4gIGNvbmZpZ3VyYXRpb246IEQzQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHRvb2x0aXBFbmFibGVkOiBmYWxzZSxcclxuICAgIGRpcmVjdGlvbmFsaXR5OiBcIkwyUlwiLFxyXG4gICAgbm9kZVR5cGU6IFwiUGxhaW5cIixcclxuICAgIHRhcmdldERpdjogXCIjZDMtY29udGFpbmVyXCIsXHJcbiAgICBibGlua0F0dHJpYnV0ZXNXYXRjaDogW10sXHJcbiAgICBzdHlsZXM6IHtcclxuICAgICAgbGlua3M6IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9LFxyXG4gICAgICBub2Rlczoge1xyXG4gICAgICAgIFwiZGVmYXVsdC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwid2hpdGVcIixcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImdyYXlcIixcclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gIFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcImxpZ2h0Ymx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSwxMCw1XCIsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDEuMSxcclxuICAgICAgICBcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJvcmFuZ2VcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCJyZWRcIixcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgQElucHV0KFwiZ3JvdXBkdXBsaWNhdGVzXCIpXHJcbiAgZ3JvdXBkdXBsaWNhdGVzID0gZmFsc2U7XHJcblxyXG4gIEBPdXRwdXQoXCJvbmNoYW5nZVwiKVxyXG4gIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcikge31cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuICAgIGlmIChjb2RlID09PSAxMykge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QoZXZlbnQudGFyZ2V0LCBcImNsaWNrXCIpO1xyXG5cdFx0fVxyXG4gIH1cclxuXHJcbiAgY2hhbmVEaXJlY3Rpb25hbGl0eShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLmRpcmVjdGlvbmFsaXR5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VOb2RlVHlwZShldmVudCkge1xyXG4gICAgdGhpcy5jb25maWd1cmF0aW9uLm5vZGVUeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG4gIGNoYW5nZUNvbG9yU2V0cyhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubGlua3MgPSB7XHJcbiAgICAgICAgXCJob3Zlci1saW5lLWRhc2hhcnJheVwiOiBcIjUsMTAsNVwiLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtc2l6ZVwiOiAxLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAzLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcImxpZ2h0c3RlZWxibHVlXCIsXHJcbiAgICAgICAgXCJob3Zlci1saW5lLWNvbG9yXCI6IFwiI2ZjYjJiMlwiLFxyXG4gICAgICAgIFwic2VsZWN0ZWQtbGluZS1jb2xvclwiOiBcInJlZFwiXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zdHlsZXMubm9kZXMgPSB7XHJcbiAgICAgICAgXCJkZWZhdWx0LWJhY2tncm91bmQtY29sb3JcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNmY2IyYjJcIixcclxuICAgICAgICBcImhvdmVyLWxpbmUtZGFzaGFycmF5XCI6IFwiNSw1XCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yXCI6IFwibGlnaHRzdGVlbGJsdWVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMSxcclxuICAgICAgICBcImhvdmVyLXNpemVcIjogMS41LFxyXG4gICAgICAgIFwic2VsZWN0ZWQtc2l6ZVwiOiAxLjMsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWNvbG9yXCI6IFwiYmx1ZVwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1saW5lLWNvbG9yXCI6IFwicmVkXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5saW5rcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtbGluZS1kYXNoYXJyYXlcIjogXCI1LDEwLDVcIixcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LXNpemVcIjogMS4yLFxyXG4gICAgICAgIFwiaG92ZXItc2l6ZVwiOiAyLjIsXHJcbiAgICAgICAgXCJzZWxlY3RlZC1zaXplXCI6IDEuMyxcclxuXHJcbiAgICAgICAgXCJkZWZhdWx0LWxpbmUtY29sb3JcIjogXCJncmVlblwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCJcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnN0eWxlcy5ub2RlcyA9IHtcclxuICAgICAgICBcImRlZmF1bHQtYmFja2dyb3VuZC1jb2xvclwiOiBcInllbGxvd1wiLFxyXG4gICAgICAgIFwiZGVmYXVsdC1saW5lLWRhc2hhcnJheVwiOiBcIjUsNVwiLFxyXG4gICAgICAgIFwiaG92ZXItYmFja2dyb3VuZC1jb2xvclwiOiBcIiNjYWQyZDJcIixcclxuICAgICAgICBcInNlbGVjdGVkLWJhY2tncm91bmQtY29sb3JcIjogXCJibHVlXCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1zaXplXCI6IDEsXHJcbiAgICAgICAgXCJob3Zlci1zaXplXCI6IDIuNSxcclxuICAgICAgICBcInNlbGVjdGVkLXNpemVcIjogMS45LFxyXG5cclxuICAgICAgICBcImRlZmF1bHQtbGluZS1jb2xvclwiOiBcInJlZFwiLFxyXG4gICAgICAgIFwiaG92ZXItbGluZS1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxpbmUtY29sb3JcIjogXCIjZjU4YzI0XCIsXHJcblxyXG4gICAgICAgIFwiZGVmYXVsdC1sYWJlbC1jb2xvclwiOiBcImJsYWNrXCIsXHJcbiAgICAgICAgXCJob3Zlci1sYWJlbC1jb2xvclwiOiBcImJsdWVcIixcclxuICAgICAgICBcInNlbGVjdGVkLWxhYmVsLWNvbG9yXCI6IFwicmVkXCJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0Q2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBjbGljayhldmVudCwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICBpZiAoaXRlbSA9PT0gXCJhbGxvd2R1cGxpY2F0ZXNcIikge1xyXG4gICAgICB0aGlzLmFsbG93ZHVwbGljYXRlcyA9IGlucHV0LmNoZWNrZWQ7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPyB0aGlzLmdyb3VwZHVwbGljYXRlcyA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtID09PSBcImdyb3VwZHVwbGljYXRlc1wiKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBkdXBsaWNhdGVzID0gaW5wdXQuY2hlY2tlZDtcclxuICAgICAgdGhpcy5hbGxvd2R1cGxpY2F0ZXMgPSAgdGhpcy5ncm91cGR1cGxpY2F0ZXMgPyB0cnVlIDogdGhpcy5hbGxvd2R1cGxpY2F0ZXM7XHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwidG9vbHRpcEVuYWJsZWRcIikge1xyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24udG9vbHRpcEVuYWJsZWQgPSBpbnB1dC5jaGVja2VkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbS5zZWxlY3RlZCA9IChpbnB1dC5jaGVja2VkKTtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdENoYW5nZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIGVtaXRDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG4gICAgICBwb2ludHM6IHRoaXMuaW50ZXJlc3RpbmdQb2ludHMsXHJcbiAgICAgIGtleXM6IHRoaXMudGFyZ2V0S2V5cyxcclxuICAgICAgYWxsb3dkdXBsaWNhdGVzOiB0aGlzLmFsbG93ZHVwbGljYXRlcyxcclxuICAgICAgY29uZmlndXJhdGlvbjogdGhpcy5jb25maWd1cmF0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
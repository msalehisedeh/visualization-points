/*
 * tool to display result of a search on set of points of interests on objects.
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer
} from '@angular/core';
import { D3Configuration } from '../interfaces/interfaces';

@Component({
  selector: 'visualization-configuration',
  templateUrl: './visualization-configuration.component.html',
  styleUrls: ['./visualization-configuration.component.scss'],
})
export class VisualizationConfigurationComponent {
  
  @Input("interestingPoints")
  interestingPoints = [];

  @Input("targetKeys")
  targetKeys = [];

  @Input("allowduplicates")
  allowduplicates = false;

  @Input("configuration")
  configuration: D3Configuration = {
    tooltipEnabled: false,
    directionality: "L2R",
    nodeType: "Plain",
    targetDiv: "#d3-container",
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

  @Input("groupduplicates")
  groupduplicates = false;

  @Output("onchange")
  onchange = new EventEmitter();

  constructor(private renderer: Renderer) {}

  keyup(event) {
    const code = event.which;
    if (code === 13) {
      this.renderer.invokeElementMethod(event.target, "click");
		}
  }

  chaneDirectionality(event) {
    this.configuration.directionality = event.target.value;
    this.emitChange();
  }

  changeNodeType(event) {
    this.configuration.nodeType = event.target.value;
    this.emitChange();
  }
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
      }
    } else {
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
      }
    }
    this.emitChange();
  }

  click(event, item) {
    const input = event.target;
    if (item === "allowduplicates") {
      this.allowduplicates = input.checked;
      this.groupduplicates = this.allowduplicates ? this.groupduplicates : false;
    } else if (item === "groupduplicates") {
      this.groupduplicates = input.checked;
      this.allowduplicates =  this.groupduplicates ? true : this.allowduplicates;
    } else if (item === "tooltipEnabled") {
      this.configuration.tooltipEnabled = input.checked;
    } else {
      item.selected = (input.checked);
    }
    this.emitChange();
  }
  private emitChange() {
    this.onchange.emit({
      points: this.interestingPoints,
      keys: this.targetKeys,
      allowduplicates: this.allowduplicates,
      configuration: this.configuration
    });
  }
}

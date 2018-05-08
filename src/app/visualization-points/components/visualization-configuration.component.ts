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
        colors: {
          default: "gray",
          hover: "#fcb2b2",
          selected: "red"
        }
      },
      nodes: {
        colors: {
          default: "#fff",
          hover: "#fcb2b2",
          selected: "lightsteelblue"
        }
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
      this.configuration.styles.links.colors = {
        default: "gray",
        hover: "#fcb2b2",
        selected: "red"
      };
      this.configuration.styles.nodes.colors = {
          default: "#fff",
          hover: "#fcb2b2",
          selected: "lightsteelblue"
      }
    } else {
      this.configuration.styles.links.colors = {
        default: "green",
        hover: "#cad2d2",
        selected: "#f58c24"
      };
      this.configuration.styles.nodes.colors = {
          default: "yellow",
          hover: "#cad2d2",
          selected: "blue"
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

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

  @Input("tooltipEnabled")
  tooltipEnabled = false;

  @Input("directionality")
  directionality = "L2R";

  @Input("nodeType")
  nodeType = "Plain";

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
    this.directionality = event.target.value;
    this.emitChange();
  }

  changeNodeType(event) {
    this.nodeType = event.target.value;
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
      this.tooltipEnabled = input.checked;
    } else {
      item.selected = (input.checked);
    }
    this.emitChange();
  }
  private emitChange() {
    this.onchange.emit({
      points: this.interestingPoints,
      keys: this.targetKeys,
      directionality: this.directionality, // L2R, R2T, TD - Left 2 Right, R 2 L, Top Down.
      nodeType: this.nodeType, // Plain, Rectangle, Cricle
      allowduplicates: this.allowduplicates,
      tooltipEnabled: this.tooltipEnabled,
      groupduplicates: this.groupduplicates
    });
  }
}

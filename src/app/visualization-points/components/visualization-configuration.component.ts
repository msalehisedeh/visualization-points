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

  click(event, item) {
    const input = event.target;
    if (item === "allowduplicates") {
      this.allowduplicates = input.checked;
      this.groupduplicates = this.allowduplicates ? this.groupduplicates : false;
    } else if (item === "groupduplicates") {
      this.groupduplicates = input.checked;
      this.allowduplicates =  this.groupduplicates ? true : this.allowduplicates;
    }else {
      item.selected = (input.checked);
    }
    this.onchange.emit({
      points: this.interestingPoints,
      keys: this.targetKeys,
      allowduplicates: this.allowduplicates,
      groupduplicates: this.groupduplicates
    });
  }
}

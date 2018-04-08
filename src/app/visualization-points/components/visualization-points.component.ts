/*
 * tool to display result of a search on set of points of interests on objects.
 */
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit ,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { VisualizationPointsMaker } from '../injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from '../injectables/visualization-points-evaluator';

@Component({
  selector: 'visualization-points',
  templateUrl: './visualization-points.component.html',
  styleUrls: ['./visualization-points.component.scss'],
})
export class VisualizationPointsComponent implements OnInit, AfterViewInit, OnChanges  {

  private evaluatedPoints = {};
  private displayHeight: number;
  
  @Input("interestingPoints")
  interestingPoints = [];

  @Input("targetKeys")
  targetKeys = [];

  @Input("data")
  data: any;

  @Input("enableConfiguration")
  enableConfiguration: boolean;

  @Output("onVisualization")
  onVisualization = new EventEmitter();

  @ViewChild("d3Container")
  d3Container;

  private sizeUp(points) {
    const size = (points.children && points.children.length) ? points.children.length : undefined;
    if (size) {
      points.name += points.children.length > 1 ? " (" + size + ")" : "";
      points.children.map( (p) => {
        this.sizeUp(p);
      })
      this.displayHeight += size;
    }
    return points;
  }
  private triggerEvaluation(points, primaries) {
    if (points.length && primaries.length) {
      this.d3Container.nativeElement.innerHTML = "";
      this.evaluatedPoints = this.evaluator.evaluatePoints(this.data, points, primaries);
      this.displayHeight = 0;
      const sizedupPoints = this.sizeUp(JSON.parse(JSON.stringify(this.evaluatedPoints)));
      this.displayHeight = this.displayHeight * 22;
      window['initiateD3'](sizedupPoints, "#d3-container", this.displayHeight);
      this.onVisualization.emit(this.evaluatedPoints);
    } else {
      this.d3Container.nativeElement.innerHTML = "";
    }
  }

  constructor(
    private pointMaker: VisualizationPointsMaker, 
    private evaluator: VisualizationPointsEvaluator
  ) {
  }

  ngOnChanges(chages) {

    if (chages.data) {
      this.interestingPoints = undefined;
      this.targetKeys =undefined;
      setTimeout(this.ngOnInit.bind(this), 333);
    }
  }

  ngOnInit() {
    if (this.data.length && this.enableConfiguration) {
      const root = (this.data instanceof Array) ? this.data[0] : this.data;
      const points = this.pointMaker.generatePoints(root, "", true);
      this.interestingPoints = points;
      this.targetKeys = JSON.parse(JSON.stringify(points));
    }
    this.triggerEvaluation(
      this.sanitize(this.interestingPoints),
      this.sanitize(this.targetKeys)
    );
  }

  async ngAfterViewInit() {
    await this.loadScript("assets/d3.js", 'd3js');
 	}
   
	private loadScript(url, id) {    
    return new Promise((resolve, reject) => {
      const script = document.getElementById(id);
      if (!script) {
        const scriptElement = document.createElement('script');
     
        scriptElement.type = "text/javascript";
        scriptElement.src = url;
        scriptElement.id = id;
        scriptElement.onload = resolve;
        
        document.body.appendChild(scriptElement);
      }
		})
  }
  
  private sanitize(list) {
    const sanitizedPoints = [];
    if (!list || list.length) {
      list.map((point) => {
        if (point.selected) {
          sanitizedPoints.push({
            key : point.key,
            value: point.value
          });
        }
      });
    }
    return sanitizedPoints;
  }
  onchange(event) {
    this.triggerEvaluation(
      this.sanitize(event.points),
      this.sanitize(event.keys)
    );
  }

}

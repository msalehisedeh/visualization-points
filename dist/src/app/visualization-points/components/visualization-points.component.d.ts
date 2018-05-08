import { OnInit, OnChanges, AfterViewInit, EventEmitter } from '@angular/core';
import { VisualizationPointsMaker } from '../injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from '../injectables/visualization-points-evaluator';
import { D3Configuration } from '../interfaces/interfaces';
export declare class VisualizationPointsComponent implements OnInit, AfterViewInit, OnChanges {
    private pointMaker;
    private evaluator;
    private evaluatedPoints;
    interestingPoints: any[];
    targetKeys: any[];
    data: any;
    allowduplicates: boolean;
    groupduplicates: boolean;
    settings: D3Configuration;
    enableConfiguration: boolean;
    onVisualization: EventEmitter<{}>;
    d3Container: any;
    private sizeUp(points);
    private triggerEvaluation(points, primaries);
    constructor(pointMaker: VisualizationPointsMaker, evaluator: VisualizationPointsEvaluator);
    ngOnChanges(chages: any): void;
    private findReferenceStructureFrom(array);
    ngOnInit(): void;
    ngAfterViewInit(): Promise<void>;
    private loadScript(url, id);
    private sanitize(list);
    onchange(event: any): void;
}

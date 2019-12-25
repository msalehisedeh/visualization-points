import { EventEmitter, Renderer } from '@angular/core';
import { D3Configuration } from '../interfaces/interfaces';
export declare class VisualizationConfigurationComponent {
    private renderer;
    interestingPoints: any[];
    targetKeys: any[];
    allowduplicates: boolean;
    configuration: D3Configuration;
    groupduplicates: boolean;
    onchange: EventEmitter<any>;
    constructor(renderer: Renderer);
    keyup(event: any): void;
    chaneDirectionality(event: any): void;
    changeNodeType(event: any): void;
    changeColorSets(event: any): void;
    click(event: any, item: any): void;
    private emitChange;
}

import { EventEmitter, Renderer } from '@angular/core';
export declare class VisualizationConfigurationComponent {
    private renderer;
    interestingPoints: any[];
    targetKeys: any[];
    allowduplicates: boolean;
    tooltipEnabled: boolean;
    directionality: string;
    nodeType: string;
    groupduplicates: boolean;
    onchange: EventEmitter<{}>;
    constructor(renderer: Renderer);
    keyup(event: any): void;
    chaneDirectionality(event: any): void;
    changeNodeType(event: any): void;
    click(event: any, item: any): void;
    private emitChange();
}

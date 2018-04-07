import { EventEmitter, Renderer } from '@angular/core';
export declare class VisualizationConfigurationComponent {
    private renderer;
    interestingPoints: any[];
    targetKeys: any[];
    onchange: EventEmitter<{}>;
    constructor(renderer: Renderer);
    keyup(event: any): void;
    click(event: any, item: any): void;
}

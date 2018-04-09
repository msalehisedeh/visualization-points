export interface VisualizationPoint {
    key: string;
    value: string;
}
export declare class VisualizationPointsMaker {
    private points;
    constructor();
    generatePoints(root: {}, path: string, clear: boolean): VisualizationPoint[];
    private makeWords(name);
}

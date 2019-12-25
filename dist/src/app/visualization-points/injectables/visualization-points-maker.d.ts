export interface VisualizationPoint {
    key: string;
    value: string;
}
export declare class VisualizationPointsMaker {
    private points;
    constructor();
    targetKeysFromGeneratedPoints(points: any[], root: {}): any[];
    generatePoints(root: {}, path: string, clear: boolean): VisualizationPoint[];
    private makeWords;
}

export declare class VisualizationPointsEvaluator {
    private pushIfNotContain(array, entry);
    private pushInList(list, item, node, allowduplicates, groupduplicates, displayData);
    private eveluate(pItem, path);
    private eveluatedNode(pItem, path);
    private makeWords(name);
    evaluatePoints(data: any[], pickPoints: any[], primarys: any[], allowduplicates: any, groupduplicates: any): {
        name: string;
        children: any[];
    };
}

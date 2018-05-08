export interface D3Configuration {
    tooltipEnabled: boolean;
    directionality: string;
    nodeType: string;
    targetDiv: string;
    styles: {
        links: {
            colors: {
                default: string;
                hover: string;
                selected: string;
            };
        };
        nodes: {
            colors: {
                default: string;
                hover: string;
                selected: string;
            };
        };
    };
}

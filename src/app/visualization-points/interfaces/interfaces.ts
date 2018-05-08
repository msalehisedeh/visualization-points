

export interface D3Configuration {
    tooltipEnabled: boolean,
    directionality: string, // L2R, R2T, TD - Left 2 Right, R 2 L, Top Down.
    nodeType: string, // Plain, Rectangle, Cricle
    targetDiv: string,
    styles: {
        links: {
            colors: {
                default: string,
                hover: string,
                selected: string
            }
        },
        nodes: {
            colors: {
                default: string,
                hover: string,
                selected: string
            }
        }
    }
}

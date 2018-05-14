

export interface D3Configuration {
    tooltipEnabled: boolean,
    directionality: string, // L2R, R2T, TD - Left 2 Right, R 2 L, Top Down.
    nodeType: string, // Plain, Rectangle, Cricle
    targetDiv: string,
    baseRectangle?: { x: number, y: number, width: number, height: number},
    baseCircle?: { x: number, y: number, r: number},
    onclick?: any,
    onhover?: any,
    styles: {
        links: { 
            colors?: any, // depricated
            "default-line-color"?: string,
            "hover-line-color"?: string,
            "selected-line-color"?: string,

            "default-line-dasharray"?: string,
            "hover-line-dasharray"?: string,
            "selected-line-dasharray"?: string,

            "default-size"?: number,
            "hover-size"?: number,
            "selected-size"?: number
        },
        nodes: {
            colors?: any, // depricated
            "default-background-color"?: string,
            "hover-background-color"?: string,
            "selected-background-color"?: string,

            "default-line-color"?: string,
            "hover-line-color"?: string,
            "selected-line-color"?: string,

            "default-label-color"?: string,
            "hover-label-color"?: string,
            "selected-label-color"?: string,

            "default-line-dasharray"?: string,
            "hover-line-dasharray"?: string,
            "selected-line-dasharray"?: string,

            "default-size"?: number,
            "hover-size"?: number,
            "selected-size"?: number
        }
    }
}

export interface D3Configuration {
    tooltipEnabled: boolean;
    directionality: string;
    nodeType: string;
    targetDiv: string;
    baseRectangle?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    baseCircle?: {
        x: number;
        y: number;
        r: number;
    };
    blinkAttributesWatch?: string[];
    onclick?: any;
    onhover?: any;
    styles: {
        links: {
            colors?: any;
            "default-line-color"?: string;
            "hover-line-color"?: string;
            "selected-line-color"?: string;
            "default-line-dasharray"?: string;
            "hover-line-dasharray"?: string;
            "selected-line-dasharray"?: string;
            "default-size"?: number;
            "hover-size"?: number;
            "selected-size"?: number;
        };
        nodes: {
            colors?: any;
            "default-background-color"?: string;
            "hover-background-color"?: string;
            "selected-background-color"?: string;
            "default-line-color"?: string;
            "hover-line-color"?: string;
            "selected-line-color"?: string;
            "default-label-color"?: string;
            "hover-label-color"?: string;
            "selected-label-color"?: string;
            "default-line-dasharray"?: string;
            "hover-line-dasharray"?: string;
            "selected-line-dasharray"?: string;
            "default-size"?: number;
            "hover-size"?: number;
            "selected-size"?: number;
        };
    };
}

# Welcome to Visualization Points!

Have you ever wanted to extract information in visually pleasing way from a data set without knowing, in advance, what the data looks like? 
Have you wondered what it takes to do it? and how long will it take? Well... wonder no more and add this component into your project... 
And make sure the **data** you are supplying is a list of JSON Objects!

If you want to see the result represented in any other form or fashion, you are welcome to shoot me a message or join me in this effort and make it even easier to snoop into a data of unknown structure...

[Live Demo](https://visualization-points.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualization-points) | [Comments/Requests](https://github.com/msalehisedeh/visualization-points/issues)


## Version 1.0.0
Compiled with AOT option and resolved issues.

## Version 0.5.0
Added ability to make a node blink ;-)
So.... How you can make a node blink? Simply send update request to the visualizer when a node status is changed and warant a visual update.
```javascript
  mySetting.blinkAttributesWatch = ["anAttribute"]
  visualizationPointsComponent.updateNodeDataRefrence(node, uniqueAttribute);
  visualizationPointsComponent.startBlinking();

  where uniqueAttribute is simply to be used to find the node copies in the visualizer tree.
  And anAttribute in blinkAttributesWatch is a flag in node data telling D3 to blink the node if flag is set.  You can include multitude of flags from different nodes in blinkAttributesWatch. 

  ... AND at some point you may want to stop the blinking...

  visualizationPointsComponent.stopBlinking();
```

## Version 0.4.0
Added onclick and onhover methods. Added more styling capabilities to make more visual choices.
I had to change configuration structure needed as input. But do not worry, if you already using the configuration defined in previus version, i have Added code to convert that into the new structure. But you need to adhere to the new configuration structure at some point to rip the benefit of what is provided for you. You can now define type of border lines, paths, and node sizes to be desiplayed on hover or when a node is selected... Hope this helps you in your endeavor.

## Version 0.3.0
Added ability to set node and link colors. Modified code to make sample work on StackBlitz.

## Version 0.2.0
Added path highlight on hover over node, path selection on click over node, and zoom in/out with doubleClick and shift+doublrClick.
Upgraded to d3 version 3.2.7

## Version 0.1.0
Added directionality, hover tooltip, node display type selection. 
You will have option to display tree from left to right, right to left, or top down.  In addition, you can enable tooltip and be able to see details of each node.  It is now possible to select a circular, rectangular, or default display of nodes.

## Version 0.0.9
Added ability to group duplicate results together.. try it out on the live demo on users or products data set and see if it can help you gain new insights into the available data!!

## Version 0.0.8
Occasionally you may want to see duplicate result generated to see relative results for each item in the list. By default, this flag is not set. Try it out and see if you can visually see something meaningful 
in yor data set.

## Version 0.0.7
1- fixed internal logic to handle complex JSON objects. 
It turns out, providing correct result values for paths to target keys which are not necessarily 
intersect with paths in pick points while traversing through arrays, will become extremely complicated. 
As a result, performance-wise, it is necessary to filter out the deep nested target keys. 

## Version 0.0.6
1- fixed internal logic for picking up the most number of attributes on a list with variant sub-items.

## Version 0.0.5
1- fixed internal logic for parsing JSON attributes.

## Version 0.0.4
1- Removing duplicates in generated result.

## Version 0.0.3
1- Fixed logic issues related to value of pick point being a boolean.
2- Fixed logic issues related to value of pick point being an array.

## Version 0.0.1

```javascript
MODULE:
  VisualizationPointsModule

EXPORTS:
  VisualizationPointsComponent
  D3Configuration
  VisualizationConfigurationComponent

```

```javascript
export interface D3Configuration {
    tooltipEnabled: boolean,
    directionality: string, // L2R, R2T, TD - Left 2 Right, R 2 L, Top Down.
    nodeType: string, // Plain, Rectangle, Cricle
    targetDiv: string,
    baseRectangle?: { x: number, y: number, width: number, height: number},
    baseCircle?: { x: number, y: number, r: number},
    blinkAttributesWatch?: string[], // if a node attribute is set then blink the node and its path
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
```

## So... How it can be done?

Run `npm install visualization-points` in your application. and do the following:

in your html:
```javascript
<visualization-points
	[data]="myDataSet"
  [enableConfiguration]="true"
  [settings]="mySettings"
  [allowduplicates]="allowduplicates"
  [groupduplicates]="groupduplicates"
  (onVisualization)="onVisualization($event)"></visualization-points>
  
  where your settings could be configured as:

  mySettings: D3Configuration = {
    tooltipEnabled: false,
    directionality: "L2R",
    nodeType: "Plain",
    targetDiv: "#d3-container",
    onclick: (event: any) => {console.log("selected", event)},
    onhover: (event: any) => {console.log("hover", event)},
    styles: {
      links: {
        "default-line-color": "gray",  
        "hover-line-color": "blue",
        "selected-line-color": "red",
        
        "hover-line-dasharray": "5,5",

        "default-size": 1,
        "hover-size": 3,
        "selected-size": 1
      },
      nodes: {
        "default-background-color": "white",
        "hover-background-color": "lightblue",
        "selected-background-color": "orange",

        "default-line-color": "black",
        "hover-line-color": "#fcb2b2",
        "selected-line-color": "red",

        "default-label-color": "blue",
        "hover-label-color": "#f00",
        "selected-label-color": "green",

        "hover-line-dasharray": "5,10,5",

        "default-size": 1,
        "hover-size": 1.5,
        "selected-size": 1.3
      }
    }
  };
```

in your `.angular-cli.json` file include the following:
```javascript
  "apps": [
    {
      ....

      "assets": [
        "assets",
        { "glob": "**/*", "input": "../node_modules/visualization-points/assets/", "output": "./assets/" },
        "favicon.ico"
      ],

      ....

```

Alternatively, if you already know about the json structure and do not want to see the configuration fields, you can do the following:
```javascript
<visualization-points
	[data]="myDataSet"
  	[targetKeys]="myTargetKeys"
    [interestingPoints]="myPoints"
    [allowduplicates]="false"
    [groupduplicates]="false"
	  (onVisualization)="onVisualization($event)"></visualization-points>


  where 
  myTargetKeys could be =[
    {key: "user.name", value: "Name"},
    {key: "user.address.city", value: "City"}
  ]
  myPoints could be =[
    {key: "user.address.city", value: "City"},
    {key: "user.income", value: "Income"}
  ]
```


![alt text](https://raw.githubusercontent.com/msalehisedeh/visualization-points/master/sample.png  "What you would see when a visualization points is used")

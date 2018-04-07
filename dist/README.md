# Welcome to Visualization Points!

Have you ever wanted to extract information in visually pleasing way from a data set without knowing, in advance, what the data looks like? 
Have wondered how what it takes to do it? Well... wonder no more and add this component into your project... 

[Live Demo](https://visualization-pints.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualization-points)

## So... How it can be done?

Run `npm install visualization-points` in your application. and do the following:

in your html:
```javascript
<visualization-points
	[data]="myDataSet"
  	[enableConfiguration]="true"
	(onVisualization)="onVisualization($event)"></visualization-points>
```

# Version 0.0.1

```
MODULE:
  VisualizationPointsModule

EXPORTS:
  VisualizationPointsComponent
  VisualizationConfigurationComponent

```

![alt text](https://raw.githubusercontent.com/msalehisedeh/visualization-points/master/sample.png  "What you would see when a visualization points is used")

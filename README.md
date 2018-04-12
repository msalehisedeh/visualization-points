# Welcome to Visualization Points!

Have you ever wanted to extract information in visually pleasing way from a data set without knowing, in advance, what the data looks like? 
Have you wondered what it takes to do it? and how long will it take? Well... wonder no more and add this component into your project... 
And make sure the **data** you are supplying is a list of JSON Objects!

If you want to see the result represented in any other form or fashion, you are welcome to shoot me a message or join me in this effort and make it even easier to snoop into a data of unknown structure...

[Live Demo](https://visualization-points.stackblitz.io) | [Source code](https://github.com/msalehisedeh/visualization-points)


## Version 0.08
Occasionally you may want to see duplicate result generated to see relative results for each item in the list. By default, this lag is not set. Try it out and see if you can visually see something meaningful 
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

```
MODULE:
  VisualizationPointsModule

EXPORTS:
  VisualizationPointsComponent
  VisualizationConfigurationComponent

```


## So... How it can be done?

Run `npm install visualization-points` in your application. and do the following:

in your html:
```javascript
<visualization-points
	  [data]="myDataSet"
    [enableConfiguration]="true"
    [allowduplicates]="false"
	  (onVisualization)="onVisualization($event)"></visualization-points>
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

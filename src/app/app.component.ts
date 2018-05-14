import { Component } from '@angular/core';

import { AppService } from './app.service'
import { D3Configuration } from './visualization-points/interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Visualization Points';

  selectionEntry = [
    "users",
    "events",
    "products"
  ];
  selectedEntry = "users";
  selectionContents ={};
  allowduplicates = false;
  groupduplicates = false;
  error = undefined;
  
  myDataSet = [];  
  resultingTree = {};
  mySettings: D3Configuration = {
    tooltipEnabled: false,
    directionality: "L2R",
    nodeType: "Plain",
    targetDiv: "#d3-container",
    onclick: (event: any) => {},
    onhover: (event: any) => {},
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
  displayEntry = false;
  pointsOfEntry = undefined;
  pointOfEntry = undefined;
  sampleJson = "";

  constructor(private service: AppService) {
    this.service.usersList().subscribe( (results) => {
      this.myDataSet = results;
    })
  }

  addDataEntry(entryName , entryJson) {
    if (entryName.length && entryJson.length) {
      try {
        const entry = JSON.parse(entryJson);
        this.selectionEntry.push(entryName);
        this.selectionContents[entryName] = (this.pointsOfEntry && this.pointOfEntry) ? entry[this.pointOfEntry]: entry;
        this.displayEntry = false;
        this.selectedEntry = entryName;
        this.myDataSet = this.selectionContents[entryName];
      } catch(e) {
        this.error = "We are unable to validate JSON data. Please clear text and try again!";
      }
    } else {
      this.error = "Please enter JSON data and a name for it to be in the dropdown!";
    }
  }

  private findEntryLists(json, path, pathList) {
    if ( !(typeof json === "string") && (typeof json === "object") && !(json instanceof Array) ) {      
      Object.keys(json).map( (item) => {
        const x = path.length ? path+"."+item : item;
        if (json[item] instanceof Array) {
          pathList.push(x);
        } else {
          this.findEntryLists(json[item], x, pathList);
        }
      });
    }
    return pathList;
  }
  
  onPaste(e: any) {
    this.sampleJson = e.clipboardData.getData('text/plain');
    this.error = undefined;
    this.pointsOfEntry = undefined;
    this.pointOfEntry = undefined;
    try {
      const json = JSON.parse(this.sampleJson);
      if ( !(json instanceof Array) ) {
        this.pointsOfEntry = this.findEntryLists(json, "", []);
      } else if (json.length < 2) {
        this.error = "Dropped in data do not have enough records in order to gain insight. Please reconsider using it."
      }
    } catch(e) {
      this.error = "We are unable to parse dropped in data into a json. Please review your content and try again."
    }
    // Do stuff 
  
    // Then clear pasted content from the input
  }

  onVisualization(event) {
	this.resultingTree = event;
  }

  visualizeDataSet(event) {
    const data = event.target.value;

    this.myDataSet = undefined;
    this.resultingTree = [];
    
    if (data === "users") {
      this.service.usersList().subscribe( (results) => {
        this.myDataSet = results;
      })
    } else if (data === "events") {
      this.service.eventsList().subscribe( (results) => {
        this.myDataSet = results;
      })
    } else if (data === "products") {
      this.service.productsList().subscribe( (results) => {
        this.myDataSet = results;
      })
    } else {
        this.myDataSet = this.selectionContents[data];
    }
  }

}

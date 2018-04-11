import { Component } from '@angular/core';

import { AppService } from './app.service'

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
  selectionContents ={};
  
  myDataSet = [];  
  resultingTree = {};
  displayEntry = false;

  constructor(private service: AppService) {
    this.service.usersList().subscribe( (results) => {
      this.myDataSet = results;
    })
  }

  addDataEntry(entryName , entryJson) {
    if (entryName.length && entryJson.length){
        this.selectionEntry.push(entryName);
        this.selectionContents[entryName] = JSON.parse(entryJson);
        this.displayEntry = false;
    }
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

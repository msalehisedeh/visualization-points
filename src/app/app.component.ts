import { Component } from '@angular/core';

import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Visual Points';
  
  myDataSet = [];  
  resultingTree = {};

  constructor(private service: AppService) {
    this.service.usersList().subscribe( (results) => {
      this.myDataSet = results;
    })
  }
  
  onVisualization(event) {
	this.resultingTree = event;
  }

  visualizeDataSet(event) {
    const data = event.target.value;

    this.myDataSet = undefined;
    if(data==="users") {
      this.service.usersList().subscribe( (results) => {
        this.myDataSet = results;
      })
    } else if(data==="events") {
      this.service.eventsList().subscribe( (results) => {
        this.myDataSet = results;
      })
    } else if(data==="products") {
      this.service.productsList().subscribe( (results) => {
        this.myDataSet = results;
      })
    }
  }

}

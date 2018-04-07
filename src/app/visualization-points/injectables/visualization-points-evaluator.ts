/*
 * This object will traverse through a given json object and finds all the attributes of 
 * the object and its related associations within the json. The resulting structure would be 
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */

import { Injectable } from '@angular/core';


@Injectable()
export class VisualizationPointsEvaluator {

  private pushInList(list, item, displayData) {
    let found = false;

    list.map( (subItem) => {
      if (subItem.name === item) {
        found = true;
        subItem.children.push(displayData);
      }
    });
    if (!found) {
      list.push({
        name: item,
        children: [displayData]
      });
    }
  }

  evaluatePoints(data: any[], pickPoints: any[], primarys: any[]) {

    const innerMap = {};

    pickPoints.map( (point) => {
      innerMap[point.value] = [];
    });

    data.map( (item) => {
      let displayData: any = [];

      primarys.map( (point) => {
        const path = point.key.split(".");
        let pItem = item;

        path.map( (key) => {
          pItem = pItem[key];
        });
        displayData.push(pItem);
      });
      displayData = displayData.join(", ");      

      pickPoints.map( (point) => {
        const path = point.key.split(".");
        const list = innerMap[point.value];
        let pItem = item;
        let found = false;

        path.map( (key) => {
          pItem = pItem[key];
        });
        if (pItem instanceof Array) {
          pItem.map( (p) => {
            this.pushInList(list, p, {name: displayData});
          });
        }else if (pItem) {
          this.pushInList(list, pItem,{name: displayData});
        } else {
          list.push({name: displayData});
        }
      });
    });

    const rootList = [];
    Object.keys(innerMap).map( (key) => {
      rootList.push({
        name: key,
        children: innerMap[key]
      });
    })
    return {
      name: "/",
      children: rootList
    };
  }
}

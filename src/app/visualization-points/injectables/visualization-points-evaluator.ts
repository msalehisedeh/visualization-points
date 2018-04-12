/*
 * This object will traverse through a given json object and finds all the attributes of 
 * the object and its related associations within the json. The resulting structure would be 
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */

import { Injectable } from '@angular/core';


@Injectable()
export class VisualizationPointsEvaluator {
  private pushIfNotContain(array, entry) {
    let found = false;
    array.map( (item) => {
      if (item.name.indexOf(entry.name) > -1) {
        found = true;
      }
    });
    if (!found) {
      array.push(entry);
    }
  }

  private pushInList(list, item, displayData) {
    let found = false;

    item = item instanceof Array ? item.join("") : item;
    if (typeof item === "string") {
      item = item.trim().length ? item : "BLANK";
    }else if (typeof item === "boolean") {
      item = item? "true":"false";
    } else {
      item = item === null ? "NULL" : item;
    }

    list.map( (subItem) => {
      if (subItem.name === item) {
        found = true;
        this.pushIfNotContain(subItem.children, displayData);
      }
    });
    if (!found && item !== null) {
      list.push({
        name: item,
        children: [displayData]
      });
    }
  }

  private eveluate( pItem:any, path: any[]) {
    for (let i = 0; i < path.length; i++) {
      pItem = pItem ? pItem[path[i]] : pItem;
      if (pItem instanceof Array) {
        const list = [];
        pItem.map( (item) => {
          list.push(this.eveluate(item, path.slice(i+1,path.length)));
        });
        pItem = list;
        break;
      }
    }
    return pItem;
  }
  private makeWords(name) {
    return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g," ")
            .replace(/_/g," ")
            .replace(/^./, (str) => str.toUpperCase());
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
            pItem = pItem ? pItem[key] : pItem;
        });
        pItem = (pItem === null ? "NULL" : pItem);
        displayData.push(String(pItem));
      });
      displayData = displayData.length ? displayData.join(", ") : undefined;      

      if (displayData) {
        pickPoints.map( (point) => {
          const path = point.key.split(".");
          const list = innerMap[point.value];
          const pItem: any = this.eveluate(item, path);
          let found = false;
  
          if (pItem instanceof Array) {
            pItem.map( (p) => {
              this.pushInList(list, p, {name: displayData});
            });
          }else {
            this.pushInList(list, pItem, {name: displayData});
          }
        });
      }
    });

    const rootList = [];
    Object.keys(innerMap).map( (key) => {
      rootList.push({
        name: this.makeWords(key),
        children: innerMap[key]
      });
    })
    return {
      name: "/",
      children: rootList
    };
  }
}

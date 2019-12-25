/*
 * This object will traverse through a given json object and finds all the attributes of 
 * the object and its related associations within the json. The resulting structure would be 
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */

import { Injectable } from '@angular/core';

export interface VisualizationPoint {
  key: string,
  value: string
}

@Injectable()
export class VisualizationPointsMaker {
  private points: VisualizationPoint[] = [];

  constructor() {
  }

  targetKeysFromGeneratedPoints(points:any[], root:{}) {
    const targets = [];

    points.map( (point) => {
      const path = point.key.split(".");
      let pItem = root;
      let foundArray = false;

      path.map( (key) => {
        if (key.length === 0 || pItem instanceof Array) {
          pItem = undefined;
          foundArray = true; 
        } else {
          pItem = pItem ? pItem[key] : pItem;
        }
      });
      if (!foundArray) {
        targets.push(JSON.parse(JSON.stringify(point)));
      }
    });
    return targets;
  }

  generatePoints(root: {}, path: string, clear: boolean) {

    if (clear) {
      this.points = [];
    }
    if (root !== null) {
      Object.keys(root).map( (key) => {
        const innerPath = (path.length ? (path + "." + key) : key);
  
        if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
          this.points.push({
            key: innerPath,
            value: this.makeWords(innerPath)
          })
        } else if (root[key] instanceof Array) {
          const node = root[key];
          if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
            this.generatePoints(node[0], innerPath, false);
          } else {
            this.points.push({
              key: innerPath,
              value: this.makeWords(innerPath)
            })
          }
        } else {
          this.generatePoints(root[key], innerPath, false);
        }
      });
    }
    return this.points;
  }

  private makeWords(name) {
    return name
            .replace(/\./g,' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g," ")
            .replace(/_/g," ")
            .replace(/^./, (str) => str.toUpperCase());
  }
}

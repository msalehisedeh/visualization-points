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

  generatePoints(root: {}, path: string, clear: boolean) {

    if (clear) {
      this.points = [];
    }
    Object.keys(root).map( (key) => {
      const innerPath = (path.length ? (path + "." + key) : key);

      if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
        this.points.push({
          key: innerPath,
          value: innerPath.replace(/\./g,' ')
        })
      } else if (root[key] instanceof Array) {
        const node = root[key];
        if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
          this.generatePoints(node[0], innerPath, false);
        } else {
          this.points.push({
            key: innerPath,
            value: innerPath.replace(/\./g,' ')
          })
        }
      } else {
        this.generatePoints(root[key], innerPath, false);
      }
    });

    return this.points;
  }

}

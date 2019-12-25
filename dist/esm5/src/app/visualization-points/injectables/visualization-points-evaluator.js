/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var VisualizationPointsEvaluator = /** @class */ (function () {
    function VisualizationPointsEvaluator() {
    }
    VisualizationPointsEvaluator.prototype.pushIfNotContain = function (array, entry) {
        var found = false;
        array.map(function (item) {
            if (item.name.indexOf(entry.name) > -1) {
                found = true;
            }
        });
        if (!found) {
            array.push(entry);
        }
    };
    VisualizationPointsEvaluator.prototype.pushInList = function (list, item, node, allowduplicates, groupduplicates, displayData) {
        var _this = this;
        var found = undefined;
        item = item instanceof Array ? item.join("") : item;
        if (typeof item === "string") {
            item = item.trim().length ? item : "BLANK";
        }
        else if (typeof item === "boolean") {
            item = item ? "true" : "false";
        }
        else {
            item = item === null ? "NULL" : item;
        }
        list.map(function (subItem) {
            if (subItem.name === item) {
                found = subItem;
                _this.pushIfNotContain(subItem.children, displayData);
            }
        });
        if (item !== null) {
            if (!found) {
                list.push({ name: item, data: node, children: [displayData] });
            }
            else {
                if (groupduplicates) {
                    found.children.push(displayData);
                }
                else if (allowduplicates) {
                    list.push({ name: item, data: node, children: [displayData] });
                }
            }
        }
    };
    VisualizationPointsEvaluator.prototype.eveluate = function (pItem, path) {
        var _this = this;
        var _loop_1 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                var list_1 = [];
                pItem.map(function (item) {
                    list_1.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_1;
                return "break";
            }
        };
        for (var i = 0; i < path.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        return pItem;
    };
    VisualizationPointsEvaluator.prototype.eveluatedNode = function (pItem, path) {
        var _this = this;
        var _loop_2 = function (i) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                var list_2 = [];
                pItem.map(function (item) {
                    list_2.push(_this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list_2;
                return "break";
            }
        };
        for (var i = 0; i < path.length - 1; i++) {
            var state_2 = _loop_2(i);
            if (state_2 === "break")
                break;
        }
        return pItem;
    };
    VisualizationPointsEvaluator.prototype.makeWords = function (name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    VisualizationPointsEvaluator.prototype.evaluatePoints = function (data, pickPoints, primarys, allowduplicates, groupduplicates) {
        var _this = this;
        var innerMap = {};
        pickPoints.map(function (point) {
            innerMap[point.value] = [];
        });
        data.map(function (item) {
            var displayData = [];
            primarys.map(function (point) {
                var path = point.key.split(".");
                var pItem = item;
                path.map(function (key) {
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map(function (point) {
                    var path = point.key.split(".");
                    var list = innerMap[point.value];
                    var pItem = _this.eveluate(item, path);
                    var nodes = _this.eveluatedNode(item, path);
                    var found = false;
                    if (pItem instanceof Array) {
                        pItem.map(function (p, index) {
                            _this.pushInList(list, p, nodes[index], allowduplicates, groupduplicates, { name: displayData });
                        });
                    }
                    else {
                        _this.pushInList(list, pItem, nodes, allowduplicates, groupduplicates, { name: displayData });
                    }
                });
            }
        });
        var rootList = [];
        Object.keys(innerMap).map(function (key) {
            rootList.push({
                name: _this.makeWords(key),
                children: innerMap[key]
            });
        });
        return {
            name: "/",
            children: rootList
        };
    };
    VisualizationPointsEvaluator = tslib_1.__decorate([
        Injectable()
    ], VisualizationPointsEvaluator);
    return VisualizationPointsEvaluator;
}());
export { VisualizationPointsEvaluator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRzs7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDO0lBQUE7SUFzSUEsQ0FBQztJQXJJUyx1REFBZ0IsR0FBeEIsVUFBeUIsS0FBSyxFQUFFLEtBQUs7UUFDbkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxJQUFJO1lBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRU8saURBQVUsR0FBbEIsVUFBbUIsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxXQUFXO1FBQWxGLGlCQTZCQztRQTVCQyxJQUFJLEtBQUssR0FBUSxTQUFTLENBQUM7UUFFM0IsSUFBSSxHQUFHLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDNUM7YUFBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNuQyxJQUFJLEdBQUcsSUFBSSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFDLE9BQVk7WUFDckIsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDekIsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUssSUFBSSxLQUFLLElBQUksRUFBRztZQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hFO2lCQUFNO2dCQUNMLElBQUksZUFBZSxFQUFFO29CQUNuQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbEM7cUJBQU0sSUFBSSxlQUFlLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRTthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sK0NBQVEsR0FBaEIsVUFBa0IsS0FBUyxFQUFFLElBQVc7UUFBeEMsaUJBYUM7Z0NBWlUsQ0FBQztZQUNSLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtnQkFDMUIsSUFBTSxNQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFFLFVBQUMsSUFBSTtvQkFDZCxNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLEdBQUcsTUFBSSxDQUFDOzthQUVkOztRQVRILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtrQ0FBM0IsQ0FBQzs7O1NBVVQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDTyxvREFBYSxHQUFyQixVQUF1QixLQUFTLEVBQUUsSUFBVztRQUE3QyxpQkFhQztnQ0FaVSxDQUFDO1lBQ1IsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdkMsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO2dCQUMxQixJQUFNLE1BQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxJQUFJO29CQUNkLE1BQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssR0FBRyxNQUFJLENBQUM7O2FBRWQ7O1FBVEgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtrQ0FBL0IsQ0FBQzs7O1NBVVQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDTyxnREFBUyxHQUFqQixVQUFrQixJQUFJO1FBQ3BCLE9BQU8sSUFBSTthQUNGLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDO2FBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQscURBQWMsR0FBZCxVQUFlLElBQVcsRUFBRSxVQUFpQixFQUFFLFFBQWUsRUFBRSxlQUFlLEVBQUUsZUFBZTtRQUFoRyxpQkFxREM7UUFuREMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRXBCLFVBQVUsQ0FBQyxHQUFHLENBQUUsVUFBQyxLQUFLO1lBQ3BCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUk7WUFDYixJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7WUFFMUIsUUFBUSxDQUFDLEdBQUcsQ0FBRSxVQUFDLEtBQUs7Z0JBQ2xCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBRWpCLElBQUksQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHO29CQUNWLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUV0RSxJQUFJLFdBQVcsRUFBRTtnQkFDZixVQUFVLENBQUMsR0FBRyxDQUFFLFVBQUMsS0FBSztvQkFDcEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25DLElBQU0sS0FBSyxHQUFRLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUM3QyxJQUFNLEtBQUssR0FBUSxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUVsQixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7d0JBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxDQUFDLEVBQUUsS0FBSzs0QkFDbEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7d0JBQ2hHLENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFLO3dCQUNKLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO3FCQUM1RjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQyxHQUFHO1lBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUN6QixRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUN4QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU87WUFDTCxJQUFJLEVBQUUsR0FBRztZQUNULFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUM7SUFDSixDQUFDO0lBcklVLDRCQUE0QjtRQUR4QyxVQUFVLEVBQUU7T0FDQSw0QkFBNEIsQ0FzSXhDO0lBQUQsbUNBQUM7Q0FBQSxBQXRJRCxJQXNJQztTQXRJWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBUaGlzIG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3Ige1xyXG4gIHByaXZhdGUgcHVzaElmTm90Q29udGFpbihhcnJheSwgZW50cnkpIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lLmluZGV4T2YoZW50cnkubmFtZSkgPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoSW5MaXN0KGxpc3QsIGl0ZW0sIG5vZGUsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCBkaXNwbGF5RGF0YSkge1xyXG4gICAgbGV0IGZvdW5kOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaXRlbSA9IGl0ZW0gaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW0uam9pbihcIlwiKSA6IGl0ZW07XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0udHJpbSgpLmxlbmd0aCA/IGl0ZW0gOiBcIkJMQU5LXCI7XHJcbiAgICB9ZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtPyBcInRydWVcIjpcImZhbHNlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtID0gaXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Lm1hcCggKHN1Ykl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3ViSXRlbS5uYW1lID09PSBpdGVtKSB7XHJcbiAgICAgICAgZm91bmQgPSBzdWJJdGVtO1xyXG4gICAgICAgIHRoaXMucHVzaElmTm90Q29udGFpbihzdWJJdGVtLmNoaWxkcmVuLCBkaXNwbGF5RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBpdGVtICE9PSBudWxsICkge1xyXG4gICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdyb3VwZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgZm91bmQuY2hpbGRyZW4ucHVzaChkaXNwbGF5RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd2R1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVsdWF0ZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBldmVsdWF0ZWROb2RlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlUG9pbnRzKGRhdGE6IGFueVtdLCBwaWNrUG9pbnRzOiBhbnlbXSwgcHJpbWFyeXM6IGFueVtdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcykge1xyXG5cclxuICAgIGNvbnN0IGlubmVyTWFwID0ge307XHJcblxyXG4gICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBpbm5lck1hcFtwb2ludC52YWx1ZV0gPSBbXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgZGlzcGxheURhdGE6IGFueSA9IFtdO1xyXG5cclxuICAgICAgcHJpbWFyeXMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgcEl0ZW0gPSBpdGVtO1xyXG5cclxuICAgICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gKHBJdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBwSXRlbSk7XHJcbiAgICAgICAgZGlzcGxheURhdGEucHVzaChTdHJpbmcocEl0ZW0pKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEubGVuZ3RoID8gZGlzcGxheURhdGEuam9pbihcIiwgXCIpIDogdW5kZWZpbmVkOyAgICAgIFxyXG5cclxuICAgICAgaWYgKGRpc3BsYXlEYXRhKSB7XHJcbiAgICAgICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gaW5uZXJNYXBbcG9pbnQudmFsdWVdO1xyXG4gICAgICAgICAgY29uc3QgcEl0ZW06IGFueSA9IHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBjb25zdCBub2RlczogYW55ID0gdGhpcy5ldmVsdWF0ZWROb2RlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBwSXRlbS5tYXAoIChwLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwLCBub2Rlc1tpbmRleF0sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwSXRlbSwgbm9kZXMsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgcm9vdExpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGlubmVyTWFwKS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgcm9vdExpc3QucHVzaCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5tYWtlV29yZHMoa2V5KSxcclxuICAgICAgICBjaGlsZHJlbjogaW5uZXJNYXBba2V5XVxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIi9cIixcclxuICAgICAgY2hpbGRyZW46IHJvb3RMaXN0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var VisualizationPointsMaker = /** @class */ (function () {
    function VisualizationPointsMaker() {
        this.points = [];
    }
    VisualizationPointsMaker.prototype.targetKeysFromGeneratedPoints = function (points, root) {
        var targets = [];
        points.map(function (point) {
            var path = point.key.split(".");
            var pItem = root;
            var foundArray = false;
            path.map(function (key) {
                if (key.length === 0 || pItem instanceof Array) {
                    pItem = undefined;
                    foundArray = true;
                }
                else {
                    pItem = pItem ? pItem[key] : pItem;
                }
            });
            if (!foundArray) {
                targets.push(JSON.parse(JSON.stringify(point)));
            }
        });
        return targets;
    };
    VisualizationPointsMaker.prototype.generatePoints = function (root, path, clear) {
        var _this = this;
        if (clear) {
            this.points = [];
        }
        if (root !== null) {
            Object.keys(root).map(function (key) {
                var innerPath = (path.length ? (path + "." + key) : key);
                if (typeof root[key] === "string" || typeof root[key] === "number" || typeof root[key] === "boolean") {
                    _this.points.push({
                        key: innerPath,
                        value: _this.makeWords(innerPath)
                    });
                }
                else if (root[key] instanceof Array) {
                    var node = root[key];
                    if (node.length && !(node[0] instanceof Array) && (typeof node[0] !== "string")) {
                        _this.generatePoints(node[0], innerPath, false);
                    }
                    else {
                        _this.points.push({
                            key: innerPath,
                            value: _this.makeWords(innerPath)
                        });
                    }
                }
                else {
                    _this.generatePoints(root[key], innerPath, false);
                }
            });
        }
        return this.points;
    };
    VisualizationPointsMaker.prototype.makeWords = function (name) {
        return name
            .replace(/\./g, ' ~ ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, function (str) { return str.toUpperCase(); });
    };
    VisualizationPointsMaker = tslib_1.__decorate([
        Injectable()
    ], VisualizationPointsMaker);
    return VisualizationPointsMaker;
}());
export { VisualizationPointsMaker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7O0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEzQztJQUdFO1FBRlEsV0FBTSxHQUF5QixFQUFFLENBQUM7SUFHMUMsQ0FBQztJQUVELGdFQUE2QixHQUE3QixVQUE4QixNQUFZLEVBQUUsSUFBTztRQUNqRCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFFbkIsTUFBTSxDQUFDLEdBQUcsQ0FBRSxVQUFDLEtBQUs7WUFDaEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRztnQkFDWixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7b0JBQzlDLEtBQUssR0FBRyxTQUFTLENBQUM7b0JBQ2xCLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQ25CO3FCQUFNO29CQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUNwQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpREFBYyxHQUFkLFVBQWUsSUFBUSxFQUFFLElBQVksRUFBRSxLQUFjO1FBQXJELGlCQThCQztRQTVCQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFFLFVBQUMsR0FBRztnQkFDekIsSUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUUzRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNwRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzt3QkFDZixHQUFHLEVBQUUsU0FBUzt3QkFDZCxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7cUJBQ2pDLENBQUMsQ0FBQTtpQkFDSDtxQkFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLEVBQUU7b0JBQ3JDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUMsRUFBRTt3QkFDL0UsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUNoRDt5QkFBTTt3QkFDTCxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs0QkFDZixHQUFHLEVBQUUsU0FBUzs0QkFDZCxLQUFLLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7eUJBQ2pDLENBQUMsQ0FBQTtxQkFDSDtpQkFDRjtxQkFBTTtvQkFDTCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2xEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU8sNENBQVMsR0FBakIsVUFBa0IsSUFBSTtRQUNwQixPQUFPLElBQUk7YUFDRixPQUFPLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQzthQUNwQixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQzthQUMxQixPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQzthQUNqQixPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQzthQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQXBFVSx3QkFBd0I7UUFEcEMsVUFBVSxFQUFFO09BQ0Esd0JBQXdCLENBcUVwQztJQUFELCtCQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0FyRVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBvYmplY3Qgd2lsbCB0cmF2ZXJzZSB0aHJvdWdoIGEgZ2l2ZW4ganNvbiBvYmplY3QgYW5kIGZpbmRzIGFsbCB0aGUgYXR0cmlidXRlcyBvZiBcclxuICogdGhlIG9iamVjdCBhbmQgaXRzIHJlbGF0ZWQgYXNzb2NpYXRpb25zIHdpdGhpbiB0aGUganNvbi4gVGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgd291bGQgYmUgXHJcbiAqIG5hbWUgb2YgYXR0cmlidXRlcyBhbmQgYSBwYXRod2F5IHRvIHJlYWNoIHRoZSBhdHRyaWJ1dGUgZGVlcCBpbiBvYmplY3QgaGVpcmFyY2h5LlxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmlzdWFsaXphdGlvblBvaW50IHtcclxuICBrZXk6IHN0cmluZyxcclxuICB2YWx1ZTogc3RyaW5nXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB7XHJcbiAgcHJpdmF0ZSBwb2ludHM6IFZpc3VhbGl6YXRpb25Qb2ludFtdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgdGFyZ2V0S2V5c0Zyb21HZW5lcmF0ZWRQb2ludHMocG9pbnRzOmFueVtdLCByb290Ont9KSB7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gW107XHJcblxyXG4gICAgcG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICBsZXQgcEl0ZW0gPSByb290O1xyXG4gICAgICBsZXQgZm91bmRBcnJheSA9IGZhbHNlO1xyXG5cclxuICAgICAgcGF0aC5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMCB8fCBwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBwSXRlbSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGZvdW5kQXJyYXkgPSB0cnVlOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW2tleV0gOiBwSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZvdW5kQXJyYXkpIHtcclxuICAgICAgICB0YXJnZXRzLnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwb2ludCkpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0cztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUG9pbnRzKHJvb3Q6IHt9LCBwYXRoOiBzdHJpbmcsIGNsZWFyOiBib29sZWFuKSB7XHJcblxyXG4gICAgaWYgKGNsZWFyKSB7XHJcbiAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAocm9vdCAhPT0gbnVsbCkge1xyXG4gICAgICBPYmplY3Qua2V5cyhyb290KS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCBpbm5lclBhdGggPSAocGF0aC5sZW5ndGggPyAocGF0aCArIFwiLlwiICsga2V5KSA6IGtleSk7XHJcbiAgXHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290W2tleV0gPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJvb3Rba2V5XSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2Ygcm9vdFtrZXldID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgdGhpcy5wb2ludHMucHVzaCh7XHJcbiAgICAgICAgICAgIGtleTogaW5uZXJQYXRoLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHJvb3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICBjb25zdCBub2RlID0gcm9vdFtrZXldO1xyXG4gICAgICAgICAgaWYgKG5vZGUubGVuZ3RoICYmICEobm9kZVswXSBpbnN0YW5jZW9mIEFycmF5KSAmJiAodHlwZW9mIG5vZGVbMF0gIT09IFwic3RyaW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVQb2ludHMobm9kZVswXSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICBrZXk6IGlubmVyUGF0aCxcclxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5tYWtlV29yZHMoaW5uZXJQYXRoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmdlbmVyYXRlUG9pbnRzKHJvb3Rba2V5XSwgaW5uZXJQYXRoLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnBvaW50cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVdvcmRzKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC4vZywnIH4gJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcbn1cclxuIl19
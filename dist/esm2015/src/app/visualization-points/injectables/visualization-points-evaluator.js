/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/*
 * This object will traverse through a given json object and finds all the attributes of
 * the object and its related associations within the json. The resulting structure would be
 * name of attributes and a pathway to reach the attribute deep in object heirarchy.
 */
import { Injectable } from '@angular/core';
export class VisualizationPointsEvaluator {
    /**
     * @param {?} array
     * @param {?} entry
     * @return {?}
     */
    pushIfNotContain(array, entry) {
        /** @type {?} */
        let found = false;
        array.map((item) => {
            if (item.name.indexOf(entry.name) > -1) {
                found = true;
            }
        });
        if (!found) {
            array.push(entry);
        }
    }
    /**
     * @param {?} list
     * @param {?} item
     * @param {?} node
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @param {?} displayData
     * @return {?}
     */
    pushInList(list, item, node, allowduplicates, groupduplicates, displayData) {
        /** @type {?} */
        let found = undefined;
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
        list.map((subItem) => {
            if (subItem.name === item) {
                found = subItem;
                this.pushIfNotContain(subItem.children, displayData);
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
    }
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    eveluate(pItem, path) {
        for (let i = 0; i < path.length; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
                const list = [];
                pItem.map((item) => {
                    list.push(this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list;
                break;
            }
        }
        return pItem;
    }
    /**
     * @param {?} pItem
     * @param {?} path
     * @return {?}
     */
    eveluatedNode(pItem, path) {
        for (let i = 0; i < path.length - 1; i++) {
            pItem = pItem ? pItem[path[i]] : pItem;
            if (pItem instanceof Array) {
                /** @type {?} */
                const list = [];
                pItem.map((item) => {
                    list.push(this.eveluate(item, path.slice(i + 1, path.length)));
                });
                pItem = list;
                break;
            }
        }
        return pItem;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    makeWords(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/-/g, " ")
            .replace(/_/g, " ")
            .replace(/^./, (str) => str.toUpperCase());
    }
    /**
     * @param {?} data
     * @param {?} pickPoints
     * @param {?} primarys
     * @param {?} allowduplicates
     * @param {?} groupduplicates
     * @return {?}
     */
    evaluatePoints(data, pickPoints, primarys, allowduplicates, groupduplicates) {
        /** @type {?} */
        const innerMap = {};
        pickPoints.map((point) => {
            innerMap[point.value] = [];
        });
        data.map((item) => {
            /** @type {?} */
            let displayData = [];
            primarys.map((point) => {
                /** @type {?} */
                const path = point.key.split(".");
                /** @type {?} */
                let pItem = item;
                path.map((key) => {
                    pItem = pItem ? pItem[key] : pItem;
                });
                pItem = (pItem === null ? "NULL" : pItem);
                displayData.push(String(pItem));
            });
            displayData = displayData.length ? displayData.join(", ") : undefined;
            if (displayData) {
                pickPoints.map((point) => {
                    /** @type {?} */
                    const path = point.key.split(".");
                    /** @type {?} */
                    const list = innerMap[point.value];
                    /** @type {?} */
                    const pItem = this.eveluate(item, path);
                    /** @type {?} */
                    const nodes = this.eveluatedNode(item, path);
                    /** @type {?} */
                    let found = false;
                    if (pItem instanceof Array) {
                        pItem.map((p, index) => {
                            this.pushInList(list, p, nodes[index], allowduplicates, groupduplicates, { name: displayData });
                        });
                    }
                    else {
                        this.pushInList(list, pItem, nodes, allowduplicates, groupduplicates, { name: displayData });
                    }
                });
            }
        });
        /** @type {?} */
        const rootList = [];
        Object.keys(innerMap).map((key) => {
            rootList.push({
                name: this.makeWords(key),
                children: innerMap[key]
            });
        });
        return {
            name: "/",
            children: rootList
        };
    }
}
VisualizationPointsEvaluator.decorators = [
    { type: Injectable }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLWV2YWx1YXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07Ozs7OztJQUNJLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLOztRQUNuQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDZDtTQUNGLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNYLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7Ozs7Ozs7Ozs7O0lBR0ssVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVzs7UUFDaEYsSUFBSSxLQUFLLEdBQVEsU0FBUyxDQUFDO1FBRTNCLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixJ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IHdpbGwgdHJhdmVyc2UgdGhyb3VnaCBhIGdpdmVuIGpzb24gb2JqZWN0IGFuZCBmaW5kcyBhbGwgdGhlIGF0dHJpYnV0ZXMgb2YgXHJcbiAqIHRoZSBvYmplY3QgYW5kIGl0cyByZWxhdGVkIGFzc29jaWF0aW9ucyB3aXRoaW4gdGhlIGpzb24uIFRoZSByZXN1bHRpbmcgc3RydWN0dXJlIHdvdWxkIGJlIFxyXG4gKiBuYW1lIG9mIGF0dHJpYnV0ZXMgYW5kIGEgcGF0aHdheSB0byByZWFjaCB0aGUgYXR0cmlidXRlIGRlZXAgaW4gb2JqZWN0IGhlaXJhcmNoeS5cclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB7XHJcbiAgcHJpdmF0ZSBwdXNoSWZOb3RDb250YWluKGFycmF5LCBlbnRyeSkge1xyXG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgICBhcnJheS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLm5hbWUuaW5kZXhPZihlbnRyeS5uYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgZm91bmQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICghZm91bmQpIHtcclxuICAgICAgYXJyYXkucHVzaChlbnRyeSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHB1c2hJbkxpc3QobGlzdCwgaXRlbSwgbm9kZSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMsIGRpc3BsYXlEYXRhKSB7XHJcbiAgICBsZXQgZm91bmQ6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICBpdGVtID0gaXRlbSBpbnN0YW5jZW9mIEFycmF5ID8gaXRlbS5qb2luKFwiXCIpIDogaXRlbTtcclxuICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICBpdGVtID0gaXRlbS50cmltKCkubGVuZ3RoID8gaXRlbSA6IFwiQkxBTktcIjtcclxuICAgIH1lbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0/IFwidHJ1ZVwiOlwiZmFsc2VcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3QubWFwKCAoc3ViSXRlbTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzdWJJdGVtLm5hbWUgPT09IGl0ZW0pIHtcclxuICAgICAgICBmb3VuZCA9IHN1Ykl0ZW07XHJcbiAgICAgICAgdGhpcy5wdXNoSWZOb3RDb250YWluKHN1Ykl0ZW0uY2hpbGRyZW4sIGRpc3BsYXlEYXRhKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIGl0ZW0gIT09IG51bGwgKSB7XHJcbiAgICAgIGlmICghZm91bmQpIHtcclxuICAgICAgICBsaXN0LnB1c2goeyBuYW1lOiBpdGVtLCBkYXRhOiBub2RlLCBjaGlsZHJlbjogW2Rpc3BsYXlEYXRhXSB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZ3JvdXBkdXBsaWNhdGVzKSB7XHJcbiAgICAgICAgICBmb3VuZC5jaGlsZHJlbi5wdXNoKGRpc3BsYXlEYXRhKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGFsbG93ZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV2ZWx1YXRlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcclxuICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW3BhdGhbaV1dIDogcEl0ZW07XHJcbiAgICAgIGlmIChwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgICAgIHBJdGVtLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGguc2xpY2UoaSsxLHBhdGgubGVuZ3RoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gbGlzdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBJdGVtO1xyXG4gIH1cclxuICBwcml2YXRlIGV2ZWx1YXRlZE5vZGUoIHBJdGVtOmFueSwgcGF0aDogYW55W10pIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgcEl0ZW0gPSBwSXRlbSA/IHBJdGVtW3BhdGhbaV1dIDogcEl0ZW07XHJcbiAgICAgIGlmIChwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdCA9IFtdO1xyXG4gICAgICAgIHBJdGVtLm1hcCggKGl0ZW0pID0+IHtcclxuICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmV2ZWx1YXRlKGl0ZW0sIHBhdGguc2xpY2UoaSsxLHBhdGgubGVuZ3RoKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gbGlzdDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBJdGVtO1xyXG4gIH1cclxuICBwcml2YXRlIG1ha2VXb3JkcyhuYW1lKSB7XHJcbiAgICByZXR1cm4gbmFtZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvKFtBLVpdKS9nLCAnICQxJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZyxcIiBcIilcclxuICAgICAgICAgICAgLnJlcGxhY2UoL14uLywgKHN0cikgPT4gc3RyLnRvVXBwZXJDYXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgZXZhbHVhdGVQb2ludHMoZGF0YTogYW55W10sIHBpY2tQb2ludHM6IGFueVtdLCBwcmltYXJ5czogYW55W10sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzKSB7XHJcblxyXG4gICAgY29uc3QgaW5uZXJNYXAgPSB7fTtcclxuXHJcbiAgICBwaWNrUG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgIGlubmVyTWFwW3BvaW50LnZhbHVlXSA9IFtdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgIGxldCBkaXNwbGF5RGF0YTogYW55ID0gW107XHJcblxyXG4gICAgICBwcmltYXJ5cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBhdGggPSBwb2ludC5rZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgIGxldCBwSXRlbSA9IGl0ZW07XHJcblxyXG4gICAgICAgIHBhdGgubWFwKCAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtrZXldIDogcEl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcEl0ZW0gPSAocEl0ZW0gPT09IG51bGwgPyBcIk5VTExcIiA6IHBJdGVtKTtcclxuICAgICAgICBkaXNwbGF5RGF0YS5wdXNoKFN0cmluZyhwSXRlbSkpO1xyXG4gICAgICB9KTtcclxuICAgICAgZGlzcGxheURhdGEgPSBkaXNwbGF5RGF0YS5sZW5ndGggPyBkaXNwbGF5RGF0YS5qb2luKFwiLCBcIikgOiB1bmRlZmluZWQ7ICAgICAgXHJcblxyXG4gICAgICBpZiAoZGlzcGxheURhdGEpIHtcclxuICAgICAgICBwaWNrUG9pbnRzLm1hcCggKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgIGNvbnN0IGxpc3QgPSBpbm5lck1hcFtwb2ludC52YWx1ZV07XHJcbiAgICAgICAgICBjb25zdCBwSXRlbTogYW55ID0gdGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoKTtcclxuICAgICAgICAgIGNvbnN0IG5vZGVzOiBhbnkgPSB0aGlzLmV2ZWx1YXRlZE5vZGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcclxuICBcclxuICAgICAgICAgIGlmIChwSXRlbSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIHBJdGVtLm1hcCggKHAsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5wdXNoSW5MaXN0KGxpc3QsIHAsIG5vZGVzW2luZGV4XSwgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMsIHtuYW1lOiBkaXNwbGF5RGF0YX0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wdXNoSW5MaXN0KGxpc3QsIHBJdGVtLCBub2RlcywgYWxsb3dkdXBsaWNhdGVzLCBncm91cGR1cGxpY2F0ZXMsIHtuYW1lOiBkaXNwbGF5RGF0YX0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByb290TGlzdCA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXMoaW5uZXJNYXApLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICByb290TGlzdC5wdXNoKHtcclxuICAgICAgICBuYW1lOiB0aGlzLm1ha2VXb3JkcyhrZXkpLFxyXG4gICAgICAgIGNoaWxkcmVuOiBpbm5lck1hcFtrZXldXHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IFwiL1wiLFxyXG4gICAgICBjaGlsZHJlbjogcm9vdExpc3RcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==
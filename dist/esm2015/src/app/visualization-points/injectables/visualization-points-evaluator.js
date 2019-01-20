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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxNQUFNOzs7Ozs7SUFDSSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSzs7UUFDbkMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7U0FDRixDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25COzs7Ozs7Ozs7OztJQUdLLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFdBQVc7O1FBQ2hGLElBQUksS0FBSyxHQUFRLFNBQVMsQ0FBQztRQUUzQixJQUFJLEdBQUcsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7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IG9iamVjdCB3aWxsIHRyYXZlcnNlIHRocm91Z2ggYSBnaXZlbiBqc29uIG9iamVjdCBhbmQgZmluZHMgYWxsIHRoZSBhdHRyaWJ1dGVzIG9mIFxyXG4gKiB0aGUgb2JqZWN0IGFuZCBpdHMgcmVsYXRlZCBhc3NvY2lhdGlvbnMgd2l0aGluIHRoZSBqc29uLiBUaGUgcmVzdWx0aW5nIHN0cnVjdHVyZSB3b3VsZCBiZSBcclxuICogbmFtZSBvZiBhdHRyaWJ1dGVzIGFuZCBhIHBhdGh3YXkgdG8gcmVhY2ggdGhlIGF0dHJpYnV0ZSBkZWVwIGluIG9iamVjdCBoZWlyYXJjaHkuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3Ige1xyXG4gIHByaXZhdGUgcHVzaElmTm90Q29udGFpbihhcnJheSwgZW50cnkpIHtcclxuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xyXG4gICAgYXJyYXkubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5uYW1lLmluZGV4T2YoZW50cnkubmFtZSkgPiAtMSkge1xyXG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgIGFycmF5LnB1c2goZW50cnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoSW5MaXN0KGxpc3QsIGl0ZW0sIG5vZGUsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCBkaXNwbGF5RGF0YSkge1xyXG4gICAgbGV0IGZvdW5kOiBhbnkgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgaXRlbSA9IGl0ZW0gaW5zdGFuY2VvZiBBcnJheSA/IGl0ZW0uam9pbihcIlwiKSA6IGl0ZW07XHJcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgaXRlbSA9IGl0ZW0udHJpbSgpLmxlbmd0aCA/IGl0ZW0gOiBcIkJMQU5LXCI7XHJcbiAgICB9ZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgIGl0ZW0gPSBpdGVtPyBcInRydWVcIjpcImZhbHNlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtID0gaXRlbSA9PT0gbnVsbCA/IFwiTlVMTFwiIDogaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Lm1hcCggKHN1Ykl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoc3ViSXRlbS5uYW1lID09PSBpdGVtKSB7XHJcbiAgICAgICAgZm91bmQgPSBzdWJJdGVtO1xyXG4gICAgICAgIHRoaXMucHVzaElmTm90Q29udGFpbihzdWJJdGVtLmNoaWxkcmVuLCBkaXNwbGF5RGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBpdGVtICE9PSBudWxsICkge1xyXG4gICAgICBpZiAoIWZvdW5kKSB7XHJcbiAgICAgICAgbGlzdC5wdXNoKHsgbmFtZTogaXRlbSwgZGF0YTogbm9kZSwgY2hpbGRyZW46IFtkaXNwbGF5RGF0YV0gfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGdyb3VwZHVwbGljYXRlcykge1xyXG4gICAgICAgICAgZm91bmQuY2hpbGRyZW4ucHVzaChkaXNwbGF5RGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd2R1cGxpY2F0ZXMpIHtcclxuICAgICAgICAgIGxpc3QucHVzaCh7IG5hbWU6IGl0ZW0sIGRhdGE6IG5vZGUsIGNoaWxkcmVuOiBbZGlzcGxheURhdGFdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBldmVsdWF0ZSggcEl0ZW06YW55LCBwYXRoOiBhbnlbXSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBldmVsdWF0ZWROb2RlKCBwSXRlbTphbnksIHBhdGg6IGFueVtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgIHBJdGVtID0gcEl0ZW0gPyBwSXRlbVtwYXRoW2ldXSA6IHBJdGVtO1xyXG4gICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSBbXTtcclxuICAgICAgICBwSXRlbS5tYXAoIChpdGVtKSA9PiB7XHJcbiAgICAgICAgICBsaXN0LnB1c2godGhpcy5ldmVsdWF0ZShpdGVtLCBwYXRoLnNsaWNlKGkrMSxwYXRoLmxlbmd0aCkpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwSXRlbSA9IGxpc3Q7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwSXRlbTtcclxuICB9XHJcbiAgcHJpdmF0ZSBtYWtlV29yZHMobmFtZSkge1xyXG4gICAgcmV0dXJuIG5hbWVcclxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbQS1aXSkvZywgJyAkMScpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8tL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csXCIgXCIpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eLi8sIChzdHIpID0+IHN0ci50b1VwcGVyQ2FzZSgpKTtcclxuICB9XHJcblxyXG4gIGV2YWx1YXRlUG9pbnRzKGRhdGE6IGFueVtdLCBwaWNrUG9pbnRzOiBhbnlbXSwgcHJpbWFyeXM6IGFueVtdLCBhbGxvd2R1cGxpY2F0ZXMsIGdyb3VwZHVwbGljYXRlcykge1xyXG5cclxuICAgIGNvbnN0IGlubmVyTWFwID0ge307XHJcblxyXG4gICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICBpbm5lck1hcFtwb2ludC52YWx1ZV0gPSBbXTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEubWFwKCAoaXRlbSkgPT4ge1xyXG4gICAgICBsZXQgZGlzcGxheURhdGE6IGFueSA9IFtdO1xyXG5cclxuICAgICAgcHJpbWFyeXMubWFwKCAocG9pbnQpID0+IHtcclxuICAgICAgICBjb25zdCBwYXRoID0gcG9pbnQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgcEl0ZW0gPSBpdGVtO1xyXG5cclxuICAgICAgICBwYXRoLm1hcCggKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBwSXRlbSA9IHBJdGVtID8gcEl0ZW1ba2V5XSA6IHBJdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBJdGVtID0gKHBJdGVtID09PSBudWxsID8gXCJOVUxMXCIgOiBwSXRlbSk7XHJcbiAgICAgICAgZGlzcGxheURhdGEucHVzaChTdHJpbmcocEl0ZW0pKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGRpc3BsYXlEYXRhID0gZGlzcGxheURhdGEubGVuZ3RoID8gZGlzcGxheURhdGEuam9pbihcIiwgXCIpIDogdW5kZWZpbmVkOyAgICAgIFxyXG5cclxuICAgICAgaWYgKGRpc3BsYXlEYXRhKSB7XHJcbiAgICAgICAgcGlja1BvaW50cy5tYXAoIChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcGF0aCA9IHBvaW50LmtleS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICBjb25zdCBsaXN0ID0gaW5uZXJNYXBbcG9pbnQudmFsdWVdO1xyXG4gICAgICAgICAgY29uc3QgcEl0ZW06IGFueSA9IHRoaXMuZXZlbHVhdGUoaXRlbSwgcGF0aCk7XHJcbiAgICAgICAgICBjb25zdCBub2RlczogYW55ID0gdGhpcy5ldmVsdWF0ZWROb2RlKGl0ZW0sIHBhdGgpO1xyXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XHJcbiAgXHJcbiAgICAgICAgICBpZiAocEl0ZW0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBwSXRlbS5tYXAoIChwLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwLCBub2Rlc1tpbmRleF0sIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHVzaEluTGlzdChsaXN0LCBwSXRlbSwgbm9kZXMsIGFsbG93ZHVwbGljYXRlcywgZ3JvdXBkdXBsaWNhdGVzLCB7bmFtZTogZGlzcGxheURhdGF9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgcm9vdExpc3QgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGlubmVyTWFwKS5tYXAoIChrZXkpID0+IHtcclxuICAgICAgcm9vdExpc3QucHVzaCh7XHJcbiAgICAgICAgbmFtZTogdGhpcy5tYWtlV29yZHMoa2V5KSxcclxuICAgICAgICBjaGlsZHJlbjogaW5uZXJNYXBba2V5XVxyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBcIi9cIixcclxuICAgICAgY2hpbGRyZW46IHJvb3RMaXN0XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=
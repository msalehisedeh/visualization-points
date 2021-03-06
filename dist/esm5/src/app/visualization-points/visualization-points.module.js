import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationPointsComponent } from './components/visualization-points.component';
import { VisualizationConfigurationComponent } from './components/visualization-configuration.component';
import { VisualizationPointsMaker } from './injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from './injectables/visualization-points-evaluator';
var VisualizationPointsModule = /** @class */ (function () {
    function VisualizationPointsModule() {
    }
    VisualizationPointsModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                VisualizationPointsComponent,
                VisualizationConfigurationComponent,
            ],
            exports: [
                VisualizationPointsComponent,
                VisualizationConfigurationComponent,
            ],
            entryComponents: [
                VisualizationPointsComponent,
                VisualizationConfigurationComponent
            ],
            providers: [
                VisualizationPointsMaker,
                VisualizationPointsEvaluator
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
    ], VisualizationPointsModule);
    return VisualizationPointsModule;
}());
export { VisualizationPointsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3Zpc3VhbGl6YXRpb24tcG9pbnRzLyIsInNvdXJjZXMiOlsic3JjL2FwcC92aXN1YWxpemF0aW9uLXBvaW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBMEI1RjtJQUFBO0lBQXdDLENBQUM7SUFBNUIseUJBQXlCO1FBdkJyQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLDRCQUE0QjtnQkFDNUIsbUNBQW1DO2FBQ3BDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLDRCQUE0QjtnQkFDNUIsbUNBQW1DO2FBQ3BDO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLDRCQUE0QjtnQkFDNUIsbUNBQW1DO2FBQ3BDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULHdCQUF3QjtnQkFDeEIsNEJBQTRCO2FBQzdCO1lBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbEMsQ0FBQztPQUVXLHlCQUF5QixDQUFHO0lBQUQsZ0NBQUM7Q0FBQSxBQUF6QyxJQUF5QztTQUE1Qix5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN1YWxpemF0aW9uLXBvaW50cy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy92aXN1YWxpemF0aW9uLWNvbmZpZ3VyYXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c01ha2VyIH0gZnJvbSAnLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1tYWtlcic7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3IgfSBmcm9tICcuL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLWV2YWx1YXRvcic7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCxcclxuICAgIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCxcclxuICAgIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c01ha2VyLFxyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvclxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmlzdWFsaXphdGlvblBvaW50c01vZHVsZSB7fVxyXG4iXX0=
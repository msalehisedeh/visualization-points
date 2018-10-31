/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationPointsComponent } from './components/visualization-points.component';
import { VisualizationConfigurationComponent } from './components/visualization-configuration.component';
import { VisualizationPointsMaker } from './injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from './injectables/visualization-points-evaluator';
var VisualizationPointsModule = /** @class */ (function () {
    function VisualizationPointsModule() {
    }
    VisualizationPointsModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return VisualizationPointsModule;
}());
export { VisualizationPointsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0YsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7O2dCQUczRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBQ2I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDRCQUE0Qjt3QkFDNUIsbUNBQW1DO3FCQUNwQztvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsNEJBQTRCO3dCQUM1QixtQ0FBbUM7cUJBQ3BDO29CQUNELGVBQWUsRUFBRTt3QkFDZiw0QkFBNEI7d0JBQzVCLG1DQUFtQztxQkFDcEM7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHdCQUF3Qjt3QkFDeEIsNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDbEM7O29DQTlCRDs7U0FnQ2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1wb2ludHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdmlzdWFsaXphdGlvbi1jb25maWd1cmF0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtbWFrZXInO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yIH0gZnJvbSAnLi9pbmplY3RhYmxlcy92aXN1YWxpemF0aW9uLXBvaW50cy1ldmFsdWF0b3InO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudCxcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVmlzdWFsaXphdGlvblBvaW50c0NvbXBvbmVudCxcclxuICAgIFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNNYWtlcixcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNFdmFsdWF0b3JcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFZpc3VhbGl6YXRpb25Qb2ludHNNb2R1bGUge31cclxuIl19
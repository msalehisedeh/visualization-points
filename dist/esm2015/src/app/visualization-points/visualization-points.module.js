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
export class VisualizationPointsModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi1wb2ludHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vdmlzdWFsaXphdGlvbi1wb2ludHMvIiwic291cmNlcyI6WyJzcmMvYXBwL3Zpc3VhbGl6YXRpb24tcG9pbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDM0YsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDekcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUEwQjVGLE1BQU07OztZQXZCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLDRCQUE0QjtvQkFDNUIsbUNBQW1DO2lCQUNwQztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsNEJBQTRCO29CQUM1QixtQ0FBbUM7aUJBQ3BDO2dCQUNELGVBQWUsRUFBRTtvQkFDZiw0QkFBNEI7b0JBQzVCLG1DQUFtQztpQkFDcEM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULHdCQUF3QjtvQkFDeEIsNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3Zpc3VhbGl6YXRpb24tY29uZmlndXJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIgfSBmcm9tICcuL2luamVjdGFibGVzL3Zpc3VhbGl6YXRpb24tcG9pbnRzLW1ha2VyJztcclxuaW1wb3J0IHsgVmlzdWFsaXphdGlvblBvaW50c0V2YWx1YXRvciB9IGZyb20gJy4vaW5qZWN0YWJsZXMvdmlzdWFsaXphdGlvbi1wb2ludHMtZXZhbHVhdG9yJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzQ29tcG9uZW50LFxyXG4gICAgVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb25Db21wb25lbnQsXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFZpc3VhbGl6YXRpb25Qb2ludHNDb21wb25lbnQsXHJcbiAgICBWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzTWFrZXIsXHJcbiAgICBWaXN1YWxpemF0aW9uUG9pbnRzRXZhbHVhdG9yXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uUG9pbnRzTW9kdWxlIHt9XHJcbiJdfQ==
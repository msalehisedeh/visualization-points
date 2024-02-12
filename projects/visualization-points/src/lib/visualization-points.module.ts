import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationPointsComponent } from './components/visualization-points.component';
import { VisualizationConfigurationComponent } from './components/visualization-configuration.component';
import { VisualizationPointsMaker } from './injectables/visualization-points-maker';
import { VisualizationPointsEvaluator } from './injectables/visualization-points-evaluator';


@NgModule({
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

export class VisualizationPointsModule {}

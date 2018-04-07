import { NgModule } from '@angular/core';

import { VisualizationPointsModule } from './visualization-points/visualization-points.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    VisualizationPointsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

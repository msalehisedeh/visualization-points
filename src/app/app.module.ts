import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationPointsModule } from './visualization-points/visualization-points.module';

import { AppComponent } from './app.component';
import { AppService } from './app.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	CommonModule,
    VisualizationPointsModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

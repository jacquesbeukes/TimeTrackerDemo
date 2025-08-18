import { Component, inject } from "@angular/core";

import { WeatherService } from "../../services/WeatherService"
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'ttd-summary',
  templateUrl: './SummaryComponent.html',
  providers: [WeatherService],
})

export class AppSummary {

  private weatherService = inject(WeatherService);
  public forecasts = toSignal(this.weatherService.getForecasts(), { initialValue: [] });

}

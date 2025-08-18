import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecast } from '../models/models';

@Injectable()
export class WeatherService {
  private readonly http: HttpClient = inject(HttpClient);

  public getForecasts(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>('/weatherforecast');
  }
}

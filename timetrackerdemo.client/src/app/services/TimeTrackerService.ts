import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person, TrackedTask } from '../models/models';

@Injectable()
export class TimeTrackerService {
  private readonly http: HttpClient = inject(HttpClient);

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('/person');
  }

  public getTasks(): Observable<TrackedTask[]> {
    return this.http.get<TrackedTask[]>('/task');
  }
}

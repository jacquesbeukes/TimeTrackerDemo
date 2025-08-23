import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person, TrackedTask, TimeEntry, CreateTimeEntry } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  private readonly http: HttpClient = inject(HttpClient);

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('/api/person');
  }

  public getTasks(): Observable<TrackedTask[]> {
    return this.http.get<TrackedTask[]>('/api/task');
  }

  getTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>('/api/timeentry');
  }

  postTimeEntry(timeEntry: CreateTimeEntry): Observable<TimeEntry> {
    return this.http.post<TimeEntry>('/api/timeentry', timeEntry);
  }

  deleteTimeEntry(timeEntry: TimeEntry): Observable<void> {
    return this.http.delete<void>(`/api/timeentry/${timeEntry.id}`);
  }
}

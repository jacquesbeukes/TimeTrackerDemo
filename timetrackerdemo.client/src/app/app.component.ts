import { Component, Signal, signal } from '@angular/core';
import { TimeTrackerService } from './services/TimeTrackerService';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateTimeEntry, Person, TimeEntry, TrackedTask } from './models/models';

@Component({
  selector: 'app-root',
  template: `
    <ttd-header />
    <div class="col-lg-8 px-0">
      <ttd-admin [people]="people()" [tasks]="tasks()" />
      <ttd-timeentry [timeEntries]="timeEntries()" />
      <tts-timeentry-form [people]="people()" [tasks]="tasks()" (submitEvent)="createTaskEntry($event)" />
    </div>
  `,
  standalone: false
})
export class AppComponent{

  people: Signal<Person[]>;
  tasks: Signal<TrackedTask[]>;
  timeEntries: Signal<TimeEntry[]>;

  constructor(private service: TimeTrackerService) {
    this.people = toSignal(service.getPeople(), { initialValue: [] });
    this.tasks = toSignal(service.getTasks(), { initialValue: [] });
    this.timeEntries = toSignal(this.service.getTimeEntries(), { initialValue: [] });
  }

  createTaskEntry(entry: CreateTimeEntry) {
    this.service.postTimeEntry(entry);
  }
  

}

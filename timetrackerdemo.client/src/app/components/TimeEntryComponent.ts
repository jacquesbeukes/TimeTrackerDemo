import { Component, EventEmitter, inject, Output } from "@angular/core";
import { AsyncPipe } from "@angular/common";

import { TimeTrackerService } from "../services/TimeTrackerService"
import { TimeEntry } from "../models/models";
import { Store } from "@ngrx/store";
import { apiActions, selectTimeEntries } from "../data/try.ngrx";

@Component({
  selector: 'ttd-timeentry',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Person</th>
          <th scope="col">Task</th>
          <th scope="col">Time (minutes)</th>
          <!--<th scope="col"></th>-->
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        @for (entry of (timeEntryList$ | async); track entry.id) {
        <tr>
          <td>{{ entry.date }}</td>
          <td>{{ entry.person.fullName }}</td>
          <td>{{ entry.task.name }}</td>
          <td>{{ entry.minutesWorked }}</td>
          <!--<td>
            <button class="btn btn-info btn-sm" type="button" (click)="openModal(entry)">Edit</button>
          </td>-->
          <td>
            <button class="btn btn-danger btn-sm" type="button" (click)="deleteEntry(entry)">Delete</button>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
  providers: [TimeTrackerService],
  imports: [AsyncPipe]
})

export class AppTimeEntry {
  store = inject(Store);
  timeEntryList$ = this.store.select(selectTimeEntries);

  @Output() open = new EventEmitter<TimeEntry>();

  deleteEntry(entry: TimeEntry): void {
    this.store.dispatch(apiActions.deleteEntry({ entry: entry }));
  }

  openModal(entry: TimeEntry): void {
    this.open.emit(entry);
  }
}

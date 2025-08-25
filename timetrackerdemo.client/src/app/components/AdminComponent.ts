import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";

import { TimeTrackerService } from "../services/TimeTrackerService"
import { Store } from "@ngrx/store";
import { selectPeople, selectTasks } from "../data/try.ngrx";

@Component({
  selector: 'ttd-admin',
  template: `
    <h2>People</h2>
    <ul>
    @for (person of (people$ | async)!; track person.id) {
      <li>{{ person.fullName }}</li>
    }
    </ul>

    <h2>Tasks</h2>
    <ul>
      @for (task of (tasks$ | async)!; track task.id) {
      <li>{{ task.name }}</li>
      }
    </ul>
  `,
  providers: [TimeTrackerService],
  imports: [AsyncPipe]
})

export class AppAdmin {
  store = inject(Store);
  people$ = this.store.select(selectPeople);
  tasks$ = this.store.select(selectTasks);
}

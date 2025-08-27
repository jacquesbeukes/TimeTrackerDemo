import { Component } from "@angular/core";

import { TimeTrackerService } from "../services/TimeTrackerService"
import { Store } from "@ngrx/store";
import { selectPeople, selectTasks } from "../data/try.ngrx";
import { Person, TrackedTask } from "../models/models";

@Component({
  selector: 'ttd-admin',
  template: `
    <h2>People</h2>
    <ul>
    @for (person of people$; track person.id) {
      <li>{{ person.fullName }}</li>
    }
    </ul>

    <h2>Tasks</h2>
    <ul>
      @for (task of tasks$; track task.id) {
      <li>{{ task.name }}</li>
      }
    </ul>
  `,
  providers: [TimeTrackerService]
})

export class AppAdmin {
  people$: Person[] = [];
  tasks$: TrackedTask[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(selectPeople).subscribe((people) => this.people$ = people);
    this.store.select(selectTasks).subscribe((tasks) => this.tasks$ = tasks);
  }
}

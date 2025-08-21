import { Component, input } from "@angular/core";

import { TimeTrackerService } from "../../services/TimeTrackerService"
import { Person, TrackedTask } from "../../models/models";

@Component({
  selector: 'ttd-admin',
  templateUrl: './AdminComponent.html',
  providers: [TimeTrackerService],
})

export class AppAdmin {
  people = input<Person[]>([]);
  tasks = input<TrackedTask[]>([]);
}

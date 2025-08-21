import { Component, input } from "@angular/core";

import { TimeTrackerService } from "../../services/TimeTrackerService"
import { TimeEntry } from "../../models/models";

@Component({
  selector: 'ttd-timeentry',
  templateUrl: './TimeEntryComponent.html',
  providers: [TimeTrackerService],
})

export class AppTimeEntry {
  timeEntries = input<TimeEntry[]>([]);
}

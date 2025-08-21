import { Component, EventEmitter, input, Output } from "@angular/core";

import { TimeTrackerService } from "../../services/TimeTrackerService"
import { TimeEntry } from "../../models/models";

@Component({
  selector: 'ttd-timeentry',
  templateUrl: './TimeEntryComponent.html',
  providers: [TimeTrackerService],
})

export class AppTimeEntry {
  timeEntries = input<TimeEntry[]>([]);

  @Output() deleteEvent = new EventEmitter<TimeEntry>();
  @Output() open = new EventEmitter<TimeEntry>();

  deleteEntry(entry: TimeEntry): void {
    this.deleteEvent.emit(entry);
  }

  openModal(entry: TimeEntry): void {
    this.open.emit(entry);
  }
}

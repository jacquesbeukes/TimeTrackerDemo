import { Component, inject } from "@angular/core";

import { TimeTrackerService } from "../../services/TimeTrackerService"
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'ttd-timeentry',
  templateUrl: './TimeEntryComponent.html',
  providers: [TimeTrackerService],
})

export class AppTimeEntry {

  private service = inject(TimeTrackerService);
  public timeEntries = toSignal(this.service.getTimeEntries(), { initialValue: [] });

}

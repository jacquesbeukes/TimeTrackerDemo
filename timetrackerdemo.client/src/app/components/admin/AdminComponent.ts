import { Component, inject } from "@angular/core";

import { TimeTrackerService } from "../../services/TimeTrackerService"
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'ttd-admin',
  templateUrl: './AdminComponent.html',
  providers: [TimeTrackerService],
})

export class AppAdmin {

  private service = inject(TimeTrackerService);
  public people = toSignal(this.service.getPeople(), { initialValue: [] });
  public tasks = toSignal(this.service.getTasks(), { initialValue: [] });

}

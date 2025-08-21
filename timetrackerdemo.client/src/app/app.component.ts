import { Component, inject, signal, Signal } from '@angular/core';
import { TimeTrackerService } from './services/TimeTrackerService';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateTimeEntry, Person, TimeEntry, TrackedTask } from './models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeEntryForm } from './components/TimeEntryFormComponent';

@Component({
  selector: 'app-root',
  template: `
    <div class="col-lg-8 px-0">
      <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
	      <li [ngbNavItem]="1">
		      <button ngbNavLink>Time Entries</button>
		      <ng-template ngbNavContent>
            <ttd-timeentry [timeEntries]="timeEntries()" (deleteEvent)="deleteTaskEntry($event)" (open)="openEdit($event)" />
		      </ng-template>
	      </li>
	      <li [ngbNavItem]="2">
		      <button ngbNavLink>Admin Data</button>
		      <ng-template ngbNavContent>
  		      <ttd-admin [people]="people()" [tasks]="tasks()" />
		      </ng-template>
	      </li>
	      <li >
		      <button class="btn btn-lg btn-outline-primary btn-sm" (click)="open()">Enter Time</button>
	      </li>
      </ul>

      <div [ngbNavOutlet]="nav" class="mt-2"></div>

    </div>
  `,
  standalone: false
})
export class AppComponent{
  active = signal(1);

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
  
  deleteTaskEntry(entry: TimeEntry) {
    this.service.deleteTimeEntry(entry);
  }

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(TimeEntryForm)
    modalRef.componentInstance.people = this.people;
    modalRef.componentInstance.tasks = this.tasks;
    modalRef.result.then(
      (result) => {
        this.service.postTimeEntry(result);
      }  
    );
  }

  openEdit(entry: TimeEntry) {
    const modalRef = this.modalService.open(TimeEntryForm);
    modalRef.componentInstance.people = this.people;
    modalRef.componentInstance.tasks = this.tasks;    
  }
}

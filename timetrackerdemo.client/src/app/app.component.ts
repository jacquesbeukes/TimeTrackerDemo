import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateTimeEntry, Person, TimeEntry, TrackedTask } from './models/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimeEntryForm } from './components/TimeEntryFormComponent';
import { apiActions, selectPeople, selectTasks, selectTimeEntries } from './data/try.ngrx';

@Component({
  selector: 'app-root',
  template: `
    <div class="col-lg-8 px-0">
      <ul ngbNav #nav="ngbNav" [(activeId)]="active" class="nav-tabs">
	      <li [ngbNavItem]="1">
		      <button ngbNavLink>Time Entries</button>
		      <ng-template ngbNavContent>
            <ttd-timeentry (open)="openEdit($event)" />
		      </ng-template>
	      </li>
	      <li [ngbNavItem]="2">
		      <button ngbNavLink>Admin Data</button>
		      <ng-template ngbNavContent>
  		      <ttd-admin />
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
export class AppComponent {
  active = signal(1);

  constructor(private store: Store) {
    this.store.dispatch(apiActions.loadInitialData());
  }

  createTaskEntry(entry: CreateTimeEntry) {
    this.store.dispatch(apiActions.createEntry({ entry: entry }));
  }

  private modalService = inject(NgbModal);

  open() {
    const modalRef = this.modalService.open(TimeEntryForm)
  }

  openEdit(entry: TimeEntry) {   
  }
}

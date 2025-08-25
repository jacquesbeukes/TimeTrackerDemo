import { Component, inject  } from "@angular/core";
import { NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe } from "@angular/common";


import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTimeEntry } from "../models/models";
import { Store } from "@ngrx/store";
import { apiActions, selectPeople, selectTasks } from "../data/try.ngrx";

@Component({
  selector: 'tts-timeentry-form',
  template: `
  <div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">

    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <div class="mb-3">
        <label for="person" class="form-label">Person</label>
        <select id="person" class="form-select" formControlName="personId">
        @for (person of (people$ | async); track person.id) {
          <option value="{{ person.id }}">{{ person.fullName }}</option>
        }
        </select>
      </div>

      <div class="mb-3">
        <label for="task" class="form-label">Task</label>
        <select id="task" class="form-select" formControlName="taskId">
        @for (task of (tasks$ | async); track task.id) {
          <option value="{{ task.id }}">{{ task.name }}</option>
        }
        </select>
      </div>

      <div class="mb-3">
        <label for="dp" class="form-label">Day</label>
		    <div class="input-group">
			    <input
				    class="form-control"
				    placeholder="yyyy-mm-dd"
				    name="dp"
				    formControlName="date"
				    ngbDatepicker
				    #d="ngbDatepicker"
			    />
			    <button class="btn btn-outline-secondary bi bi-calendar3" (click)="d.toggle()" type="button"></button>
		    </div>
	    </div>

      <div class="mb-3">
        <label for="time" class="form-label">Time</label>
        <ngb-timepicker formControlName="time" />
      </div>
    </form>

    </div>
		<div class="modal-footer">
			<button class="btn btn-primary" type="submit" (click)="handleSubmit()" >Submit</button>
		</div>
  `,
  imports: [ReactiveFormsModule, NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule, AsyncPipe],
})
export class TimeEntryForm {
  store = inject(Store);
  people$ = this.store.select(selectPeople);
  tasks$ = this.store.select(selectTasks);

  activeModal = inject(NgbActiveModal);

  profileForm = new FormGroup({
    personId: new FormControl(''),
    taskId: new FormControl(''),
    time: new FormControl({ hour: 0, minute: 15 }),
    date: new FormControl()
  });

  handleSubmit() {
    const rawMinutes = this.profileForm.value.time;
    const minutes = (rawMinutes?.hour! * 60) + rawMinutes?.minute!;
    const day = this.formatDate(this.profileForm.value.date);
    const result: CreateTimeEntry = {
      personId: this.profileForm.value.personId!,
      taskId: this.profileForm.value.taskId!,
      date: day,
      minutesWorked: minutes
    };

    this.store.dispatch(apiActions.createEntry({ entry: result }));
    this.activeModal.close(result);
  }

  formatDate = (d : any) => {
    var month = (d.month + 1).toString();
    var day = d.day.toString();
    var year = d.year.toString();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    var result = [year, month, day].join('-');

    return result;
  }
}

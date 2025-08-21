import { Component, EventEmitter, input, Output,  } from "@angular/core";
import { NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTimeEntry, Person, TrackedTask } from "../models/models";

@Component({
  selector: 'tts-timeentry-form',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <div class="mb-3">
        <label for="person" class="form-label">Person</label>
        <select id="person" class="form-select" formControlName="personId">
        @for (person of people(); track person) {
          <option value="{{ person.id }}">{{ person.fullName }}</option>
        }
        </select>
      </div>

      <div class="mb-3">
        <label for="task" class="form-label">Task</label>
        <select id="task" class="form-select" formControlName="taskId">
        @for (task of tasks(); track task) {
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
     
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule, NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule],
})
export class TimeEntryForm {
  people = input<Person[]>([]);
  tasks = input<TrackedTask[]>([]);

  @Output() submitEvent = new EventEmitter<CreateTimeEntry>();

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
    alert("day:" + day);
    const result: CreateTimeEntry = {
      personId: this.profileForm.value.personId!,
      taskId: this.profileForm.value.taskId!,
      date: day,
      minutesWorked: minutes
    };

    this.submitEvent.emit(result);
  }

  formatDate = (d: NgbDateStruct) => {
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

import { Component, Input, OnInit } from "@angular/core";
import { NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Person, TrackedTask } from "../../models/models";
import { Store } from "@ngrx/store";
import { selectPeople, selectTasks } from "../../data/try.ngrx";
import { timeInMinutesTotal } from "./utils";

@Component({
  selector: 'ttd-time-entry-form',
  template: `
    <form [formGroup]="entryForm" >
      <div class="form-group mb-3">
        <div class="row">
          <label for="person" class="col-sm-2 col-form-label">Person</label>
          <div class="col-sm-10">
            <select id="person" class="form-select" formControlName="personId">
            @for (person of people$; track person.id) {
              <option [ngValue]="person.id">{{ person.fullName }}</option>
            }
            </select>
            @if (personId!.invalid && (entryForm.touched || entryForm.dirty)) {
            <div class="alert alert-danger my-1 py-1">
              <div>Person is required</div>
            </div>
          }
          </div>
        </div>
      </div>

      <div class="form-group row mb-3">
        <label for="task" class="col-sm-2 col-form-label">Task</label>
        <div class="col-sm-10">
          <select id="task" class="form-select" formControlName="taskId">
          @for (task of tasks$; track task.id) {
            <option value="{{ task.id }}">{{ task.name }}</option>
          }
          </select>
          @if (taskId!.invalid && (entryForm.touched || entryForm.dirty)) {
            <div class="alert alert-danger my-1 py-1">
              <div>Task is required</div>
            </div>
          }
        </div>
      </div>

      <div class="form-group row mb-3">
        <label for="dp" class="col-sm-2 col-form-label">Day</label>
        <div class="col-sm-10">
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
          @if (day!.invalid && (entryForm.touched || entryForm.dirty)) {
            <div class="alert alert-danger my-1 py-1">
              <div>Must be a valid date</div>
            </div>
          }
        </div>
	    </div>

      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
          <div class="row">
            <label class="col-sm-2 col-form-label" for="hours">Hours</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="hours" placeholder="hours" formControlName="hours">
            </div>
            <label class="col-sm-2 col-form-label" for="minutes">Minutes</label>
            <div class="col-sm-3">
              <input type="text" class="form-control" id="minutes" placeholder="minutes" formControlName="minutes">
            </div>
            @if (entryForm.hasError('noTimeEntered') && (entryForm.touched || entryForm.dirty)) {
              <div class="alert alert-danger my-1 py-1">
                  <div>Please enter time</div>
              </div>
            }
            @if (entryForm.hasError('tooManyHours') && (entryForm.touched || entryForm.dirty)) {
              <div class="alert alert-danger my-1 py-1">
                  <div>That seems excessive</div>
              </div>
            }
          </div>
        </div>
      </div>

    </form>
  `,
  imports: [ReactiveFormsModule, NgbTimepickerModule, NgbAlertModule, NgbDatepickerModule],
})
export class TimeEntryForm implements OnInit {
  people$: Person[] = [];
  tasks$: TrackedTask[] = [];

  @Input() entryForm!: FormGroup;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(selectPeople).subscribe((people) => this.people$ = people);
    this.store.select(selectTasks).subscribe((tasks) => this.tasks$ = tasks);

    this.entryForm.addValidators(this.timeValidator);
  }

  timeValidator: ValidatorFn = (
      control: AbstractControl,
  ): ValidationErrors | null => {

    var hours = parseInt(control.get('hours')?.value);
    var minutes = parseInt(control.get('minutes')?.value);

    if (minutes > 59) {
      let mod = minutes % 60;
      let extra = (minutes - mod) / 60;

      control.get('minutes')?.setValue(mod);
      control.get('hours')?.setValue(hours + extra);

      hours = parseInt(control.get('hours')?.value);
      minutes = parseInt(control.get('minutes')?.value);
    }

    const totalMinutes = timeInMinutesTotal(hours, minutes);

    if (totalMinutes === 0) {
      return { noTimeEntered: true };
    }

    if (totalMinutes > (600)) {
      return { tooManyHours: true };
    }

    return null;
  };

  get personId() {
    return this.entryForm!.get("personId");
  }

  get taskId() {
    return this.entryForm!.get("taskId");
  }

  get day() {
    return this.entryForm!.get("date");
  }

  get time() {
    return this.entryForm!.get("time");
  }
}

import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateTimeEntry } from "../../models/models";
import { Store } from "@ngrx/store";
import { apiActions } from "../../data/try.ngrx";
import { CustomModal } from "./CustomModal";
import { TimeEntryForm } from "./TimeEntryForm";
import { dateToString, timeInMinutesTotal, today } from './utils';

@Component({
  selector: 'ttd-create-time-entry',
  template: `
  <tts-custom-modal (modalClosed)="handleSubmit()" >
    <div header>New time entry</div>
    <div content>
      <ttd-time-entry-form [entryForm]="entryForm"></ttd-time-entry-form>
    </div>
    <div button-label>Create</div>
  </tts-custom-modal>
  `,
  imports: [TimeEntryForm, CustomModal],
})
export class CreateEntryComponent implements OnInit {

  entryForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.entryForm = this.fb.group({
      personId: ['', Validators.required],
      taskId: ['', Validators.required],
      hours: [0],
      minutes: [0],
      date: [today(), Validators.required],
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    const minutes = timeInMinutesTotal(this.entryForm.value.hours, this.entryForm.value.minutes);
    const day = dateToString(this.entryForm.value.date);
    const result: CreateTimeEntry = {
      personId: this.entryForm.value.personId!,
      taskId: this.entryForm.value.taskId!,
      date: day,
      minutesWorked: minutes
    };

    this.store.dispatch(apiActions.createEntry({ entry: result }));
  }
}

import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GUID, UpdateTimeEntry } from "../../models/models";
import { Store } from "@ngrx/store";
import { apiActions, selectEntryToEdit } from "../../data/try.ngrx";
import { CustomModal } from "./CustomModal";
import { TimeEntryForm } from "./TimeEntryForm";
import { dateToString, formatDate, formatTime, timeInMinutesTotal, today } from './utils';

@Component({
  selector: 'ttd-update-time-entry',
  template: `
  <tts-custom-modal (modalClosed)="handleSubmit()" >
    <div header>Update time entry</div>
    <div content>
      <ttd-time-entry-form [entryForm]="entryForm"></ttd-time-entry-form>
    </div>
    <div button-label>Update</div>
  </tts-custom-modal>
  `,
  imports: [TimeEntryForm, CustomModal],
})
export class EditEntryComponent implements OnInit {

  entryForm: FormGroup;
  entryId: GUID = '';

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
    this.store
      .select(selectEntryToEdit)
      .subscribe(entry => {
        if (entry) {
          this.entryId = entry.id;
          let { hour, minute } = formatTime(entry.minutesWorked);
          this.entryForm.patchValue({
            personId: entry.person.id,
            taskId: entry.task.id,
            hours: hour,
            minutes: minute,
            date: formatDate(entry.date.toString()),
          });
        }
      });
  }

  handleSubmit() {
    const minutes = timeInMinutesTotal(this.entryForm.value.hours, this.entryForm.value.minutes);
    const day = dateToString(this.entryForm.value.date);
    const result: UpdateTimeEntry = {
      id: this.entryId,
      personId: this.entryForm.value.personId!,
      taskId: this.entryForm.value.taskId!,
      date: day,
      minutesWorked: minutes
    };

    this.store.dispatch(apiActions.updateEntry({ entry: result }));
  }
}

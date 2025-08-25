import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppAdmin } from './components/AdminComponent'
import { AppTimeEntry } from './components/TimeEntryComponent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TimeEntryForm } from './components/TimeEntryFormComponent';
import { StoreModule } from '@ngrx/store'
import { TimeEntryEffects, timeEntryReducer, readonlyReducer } from './data/try.ngrx';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppAdmin,
    AppTimeEntry,
    TimeEntryForm,
    StoreModule.forRoot({ entries: timeEntryReducer, readonly: readonlyReducer }),
    EffectsModule.forRoot([
      TimeEntryEffects,
    ]),
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

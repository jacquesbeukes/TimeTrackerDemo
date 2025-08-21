import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { AppAdmin } from './components/admin/AdminComponent'
import { AppTimeEntry } from './components/timeEntries/TimeEntryComponent';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { TimeEntryForm } from './components/TimeEntryFormComponent'

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
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

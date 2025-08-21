import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeader } from './components/header/HeaderComponent'
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
    AppRoutingModule,
    AppHeader,
    AppAdmin,
    AppTimeEntry,
    TimeEntryForm,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

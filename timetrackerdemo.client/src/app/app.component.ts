import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ttd-header />
    <ttd-admin />
    <ttd-timeentry />
  `,
  standalone: false
})
export class AppComponent{
  title = 'timetrackerdemo.client';
}

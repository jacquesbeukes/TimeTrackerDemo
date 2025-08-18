import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ttd-header />
    <ttd-summary />
  `,
  standalone: false
})
export class AppComponent{
  title = 'timetrackerdemo.client';
}

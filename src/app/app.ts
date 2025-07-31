import { Component } from '@angular/core';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'later-root',
  imports: [Navigation],
  template: `
    <later-navigation />
  `,
  styles: [],
})
export class App {
}

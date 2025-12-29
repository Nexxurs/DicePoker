import { Component } from '@angular/core';

@Component({
  selector: 'app-wakelock',
  standalone: true,
  imports: [],
  template: '<svg xmlns="http://www.w3.org/2000/svg"' +
    '     viewBox="0 0 24 24"' +
    '     fill="none"' +
    '     stroke="currentColor"' +
    '     stroke-width="2"' +
    '     stroke-linecap="round"' +
    '     stroke-linejoin="round"' +
    '     class="w-6 h-6">' +
    '  <rect x="2" y="4" width="20" height="14" rx="2" />' +
    '  <path d="M12 8l-2 4h3l-1 4" />' +
    '</svg>'
})
export class WakelockComponent {

}

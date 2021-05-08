import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.component.html',
  styleUrls: ['./sort-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SortSelectComponent {

  constructor() { }

  onChange(value: number) {
    console.log('value: ', value);
  }

}

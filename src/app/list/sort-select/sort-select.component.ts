import { Component, ViewEncapsulation, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sort-select',
  templateUrl: './sort-select.component.html',
  styleUrls: ['./sort-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SortSelectComponent {

  constructor(private cd: ChangeDetectorRef) { }

  @Output() sortBy: EventEmitter<number> = new EventEmitter();
  onChange(value: number) {
    this.sortBy.emit(value);
    this.cd.detach();
  }
}

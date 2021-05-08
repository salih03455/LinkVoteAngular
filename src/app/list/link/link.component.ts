import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Link } from '../../models/link';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {
  
  constructor() { }
  @Input() link: Link;

  ngOnInit(): void {
    console.log(this.link);
  }

}

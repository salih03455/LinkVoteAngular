import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  constructor() { }
  linkList$ = new BehaviorSubject<any>([]);

  ngOnInit(): void {
    // local storage'ye bak:
    const linksOfStored = localStorage.getItem('LinkVoteLinks');
    if (!linksOfStored) return;
    this.linkList$.next(JSON.parse(linksOfStored));
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SetLinks } from '../store/links/links.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  constructor(private store: Store) {}

  linkList$ = new BehaviorSubject<any>([]);

  ngOnInit(): void {
    // locale storage'ye bak:
    const linksOfStored = localStorage.getItem('LinkVoteLinks');
    // locale storage'de kayit varsa state'ye aktar:
    if (!linksOfStored) return;
      const links = JSON.parse(linksOfStored);  
      // Notification icin store'u guncelle:
        this.store.dispatch(
          SetLinks({
            payload: links
          })
        );
          
    this.linkList$.next(links);
  }

}

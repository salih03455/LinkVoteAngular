import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SetLinks } from '../store/links/links.actions';
import { GetLinks } from '../store/links/links.selectors';

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
    // store'a bak:
    const linksOfState = this.store.pipe(select(GetLinks));
    linksOfState.subscribe(
      (links) => {
        if (links.length) {
          this.linkList$.next(links);
        } else {
          // locale storage'ye bak:
          const linksOfStored = localStorage.getItem('LinkVoteLinks');
          // locale storage'de kayit varsa state'ye aktar:
          if (!linksOfStored) return;
          const links = JSON.parse(linksOfStored);  
          // Locale storage'den gelen linkleri store'a gonder:
          this.store.dispatch(
            SetLinks({
              payload: links
            })
          );
          this.linkList$.next(links);
        }
      },
      (error) => console.log(error)
    );
  }
}

import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SetLinks, DeleteLink } from '../store/links/links.actions';
import { GetLinks } from '../store/links/links.selectors';
import { Link } from '../models/Link';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}

  removedLink$ = new BehaviorSubject({});
  modalStatus$ = new BehaviorSubject(false);
  linkList$ = new BehaviorSubject<Link[]>([]);
  listOnPager$ = new BehaviorSubject<Link[]>([]);
  pager$ = new BehaviorSubject<any>([]);
  subscription: Subscription;
  selectedPage = 0;

  ngOnInit(): void {
    // store'a bak:
    const linksOfState = this.store.pipe(select(GetLinks));
    this.subscription = linksOfState.subscribe(
      (links) => {
        if (links.length) {
          this.linkList$.next(links);
          this.calculatePagi(links.length)
        } else {
          // locale storage'ye bak:
          const linksOfLocale = localStorage.getItem('LinkVoteLinks');
          // locale storage'de kayit varsa state'ye aktar:
          if (!linksOfLocale) return;
          const linksOfStorage = JSON.parse(linksOfLocale);
          this.calculatePagi(linksOfStorage.length);
          // Locale storage'den gelen linkleri store'a gonder:
          this.store.dispatch(
            SetLinks({
              payload: linksOfStorage
            })
          );
          this.linkList$.next(linksOfStorage);
        }
      },
      (error) => console.log(error)
    );
  }

  // Hover'da cikan sil butonuna tikladiginda:
  removeLink(event: {removedName: string, modalStatus: boolean, removedId: number }) {
    this.removedLink$.next({ name: event.removedName, id: event.removedId });
    this.modalStatus$.next(event.modalStatus);
  }

  // Modal uzerinde tamam yada vazgec butonlarina basildiginda:
  onModalEvent(event: {modalStatus: boolean, modalContinue: boolean}) {
    this.modalStatus$.next(event.modalStatus);
    if (event.modalContinue) {
      const removedLinkId = this.removedLink$.getValue()['id'];
      console.log('removed link id', removedLinkId);
      
      // locale storage'yi guncelle:
      const linksOfLocale = localStorage.getItem('LinkVoteLinks');
      if (!linksOfLocale) return;

      const linksOfStorage = JSON.parse(linksOfLocale).filter(link => link.linkId !== removedLinkId);
      console.log(linksOfStorage);
      if (linksOfStorage.length) {
        localStorage.setItem('LinkVoteLinks', JSON.stringify(linksOfStorage));
      } else {
        localStorage.setItem('LinkVoteLinks', '[]');
      }

      // state'yi guncelle:
      this.store.dispatch(
        DeleteLink({ payload: removedLinkId })
      );
      
      this.calculatePagi(linksOfStorage.length);
    }
  }

  calculatePagi(linksCount: number) {
    const itemPerGroup = 5;
    let pageCount: number;
    if (linksCount < 6) {
      pageCount = 0;
      return;
    } else {
      const remaining = linksCount % itemPerGroup;
      if (remaining === 0) {
        pageCount = linksCount / itemPerGroup;
        console.log(pageCount);
      } else {
        pageCount = ((linksCount - remaining) / itemPerGroup) + 1;
        console.log(pageCount);
      }
      this.selectedPage = 1;

      const pager = [];
      for (let i = 1; i <= pageCount; i++) {
        pager.push({ no: i, selected: this.selectedPage === i ? true : false });
        this.pager$.next([...pager]);
      }
    }
  }

  pagerNavigation(direction: string) {
    const pager = this.pager$.getValue();
    pager[this.selectedPage -1]['selected'] = false;
    if (direction === 'next')
      this.selectedPage = this.selectedPage + 1;
    else
      this.selectedPage = this.selectedPage - 1;
    pager[this.selectedPage - 1]['selected'] = true;
    this.pager$.next([...pager]);
  }

  changeSelectedPage(i: number) {
    const pager = this.pager$.getValue();
    pager[this.selectedPage -1]['selected'] = false;
    pager[i]['selected'] = true;
    this.selectedPage = i + 1;
    this.pager$.next([...pager]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

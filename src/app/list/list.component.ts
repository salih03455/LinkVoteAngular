import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { SetLinks, DeleteLink } from '../store/links/links.actions';
import { UpdateNotification, UpdateNotificationStatus } from '../store/template/template.actions';
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
  range = [0, 5];
  groupPager = [];
  pager$ = new BehaviorSubject<any>([]);
  subscription: Subscription;
  selectedPage = 0;
  sortArg = new BehaviorSubject(0);

  ngOnInit(): void {
    // store'a bak:
    const linksOfState = this.store.pipe(select(GetLinks));

    this.subscription = linksOfState.subscribe(
      (links) => {
        if (links.length) {
          this.linkList$.next(links);
          this.calculatePagi();
        } else {
          // locale storage'ye bak:
          const linksOfLocale = localStorage.getItem('LinkVoteLinks');
          // locale storage'de kayit varsa state'ye aktar:
          if (!linksOfLocale || linksOfLocale === '[]') return;
          const linksOfStorage = JSON.parse(linksOfLocale);
          // Locale storage'den gelen linkleri store'a gonder:
          this.store.dispatch(
            SetLinks({
              payload: linksOfStorage
            })
          );
          this.calculatePagi();
        }
      },
      (error) => console.log(error)
    );
  }

  setSortPipe(event: number) {
    this.sortArg.next(event);
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
      const removedLink = this.removedLink$.getValue();
      
      // locale storage'yi guncelle:

      const linksOfLocale = JSON.parse(localStorage.getItem('LinkVoteLinks'));

      const linksOfStorage = linksOfLocale.filter((link: Link) => link.linkId !== removedLink['id']);
      localStorage.setItem('LinkVoteLinks', JSON.stringify(linksOfStorage));
      this.store.dispatch(
        DeleteLink({ payload: linksOfStorage })
      );

      this.linkList$.next([...linksOfStorage]);
      this.calculatePagi();

      // Notification cikartir
      this.store.dispatch(
        UpdateNotification({
          payload: {
            notificationStatus: true,
            notificationTitle: removedLink['name'],
            notificationFunction: 'removed',
            notificationType: 'success'
          }
        })
      );
      // Notification'u ekrandan kaldir:
      setTimeout(() => {
        this.store.dispatch(
          UpdateNotificationStatus({
            payload: false
          })
        );
      }, 1500);
    }
  }

  calculatePagi() {
    const linksAll = this.linkList$.getValue();
    const linksCount = linksAll.length;  // toplam link sayisi
    const itemPerGroup = 5; // her sayfadaki link sayisi
    let pageCount: number; // kac adet sayfa olusacagi
    if (linksCount < 6) {
      pageCount = 1;
      this.pager$.next([{ no: 1, selected: true }]);
      this.listOnPager$.next([...linksAll]);
      this.groupPager.push(linksAll);
      this.range = [0, 5];
      return;
    } else {
      const remaining = linksCount % itemPerGroup;
      if (remaining === 0) {
        pageCount = linksCount / itemPerGroup;
      } else {
        pageCount = ((linksCount - remaining) / itemPerGroup) + 1;
      }
      this.selectedPage = 1;

      const pager = []; // pagination'u olusturan array
      let startOfSlice = 0; // tum linkler arrayinin kacincidan itibaren kesilecegini belirtir
      for (let i = 1; i <= pageCount; i++) {
        pager.push({ no: i, selected: this.selectedPage === i ? true : false });
        const listOnPager = linksAll.slice(startOfSlice, startOfSlice + 5);
        this.groupPager.push(listOnPager); // sayfalara bolunmus liste
        if (this.selectedPage === i) {
          this.listOnPager$.next([...listOnPager]); // goruntulenecek bolum
          this.range = [startOfSlice, startOfSlice + 5];
        }
        this.pager$.next([...pager]);
        startOfSlice = startOfSlice + 5;
      }
    }
  }

  // pagination'da prev - next butonlarina basildiginda:
  pagerNavigation(direction: string) {
    const pager = this.pager$.getValue();
    pager[this.selectedPage -1]['selected'] = false;
    if (direction === 'next') {
      this.selectedPage = this.selectedPage + 1;
      this.range = [this.range[0] + 5, this.range[1] + 5];
    }
    else {
      this.selectedPage = this.selectedPage - 1;
      this.range = [this.range[0] - 5, this.range[1] - 5];
    }
    pager[this.selectedPage - 1]['selected'] = true;
    this.pager$.next([...pager]);
    
    const listOnPager = this.groupPager[this.selectedPage - 1];
    this.listOnPager$.next([...listOnPager]);
  }

  // pagination'da sayfalara tiklandiginda:
  changeSelectedPage(i: number) {
    const pager = this.pager$.getValue();
    pager[this.selectedPage -1]['selected'] = false;
    pager[i]['selected'] = true;
    this.selectedPage = i + 1;
    this.pager$.next([...pager]);

    const listOnPager = this.groupPager[this.selectedPage - 1]; // hangi sayfada ise ona ait linkleri getir
    this.listOnPager$.next([...listOnPager]);
    this.range = [i * 5, (i * 5) + 5];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

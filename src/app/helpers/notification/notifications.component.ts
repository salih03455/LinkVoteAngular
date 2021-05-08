import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Notification } from '../../models/notification';
import { getNotification } from 'src/app/store/notifications/notification.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  constructor(private store: Store) {}
  
  notification$: Observable<Notification>;

  ngOnInit(): void {
    // state'yi getir:
    this.notification$ = this.store.pipe(select(getNotification));
  }
  
}

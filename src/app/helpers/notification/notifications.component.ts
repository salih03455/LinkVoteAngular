import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Template } from '../../models/template';
import { GetTemplate } from 'src/app/store/template/template.selectors';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationsComponent implements OnInit {

  constructor(private store: Store) {}
  
  notification$: Observable<Template>;

  ngOnInit(): void {
    // state'yi getir:
    this.notification$ = this.store.pipe(select(GetTemplate));
  }
  
}

import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { Link } from '../../models/link';
import { Store } from '@ngrx/store';
import { UpVote, DownVote } from '../../store/links/links.actions';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {
  
  constructor(private store: Store) {}
  
  @Input() link: Link;
  @Output() removeLink: EventEmitter<object> = new EventEmitter();

  ngOnInit(): void {}

  // local storage'yi guncelle:
  updateVote(id: number, type: string) {
    const linksOfStorage = JSON.parse(localStorage.getItem('LinkVoteLinks'));
    const newLinksOfStorage = linksOfStorage.map((link: Link) => {
      if (link.linkId === id) {
        if (type === 'increase') {
          link['linkVote'] = link['linkVote'] + 1;
        }
        if (type === 'decrease') {
          link['linkVote'] = link['linkVote'] - 1;
        }
      }
      return link;
    });
    localStorage.setItem('LinkVoteLinks', JSON.stringify(newLinksOfStorage));
  }
  
  voteUp(id: number) {
    // store'u guncelle:
    this.store.dispatch(UpVote({ payload: id }));
    this.updateVote(id, 'increase');
  }

  voteDown(id: number) {
    // store'u guncelle:
    this.store.dispatch(DownVote({ payload: id }));
    this.updateVote(id, 'decrease');
  }

  deleteLink(id: number, name: string) {
    this.removeLink.emit({
      removedName: name,
      modalStatus: true,
      removedId: id
    });
  }
}

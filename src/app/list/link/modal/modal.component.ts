import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetModalAction } from '../../../store/template/template.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {}

  closeModal(modalStatus: boolean, modalContinue: boolean) {
    this.store.dispatch(
      SetModalAction({ payload: { modalStatus, modalContinue } })
    )
  }

}

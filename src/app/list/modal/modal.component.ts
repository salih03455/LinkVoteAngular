import {
  Component,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  constructor() {}

  @Output() modalEvent: EventEmitter<{modalStatus: boolean, modalContinue: boolean}> = new EventEmitter();

  ngOnInit(): void {}

  closeModal(modalStatus: boolean, modalContinue: boolean) {
    this.modalEvent.emit({ modalStatus, modalContinue });
  }

}

import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  closeModal(modalStatus: boolean, modalContinue: boolean) {
    
  }

}

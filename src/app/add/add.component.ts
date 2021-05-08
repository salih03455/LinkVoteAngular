import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateNotification, UpdateNotificationStatus } from '../store/notifications/notification.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private store: Store
    ) { }

  addLinkForm: FormGroup;
  submitted = false;
  sameLink = false;

  ngOnInit(): void {
    this.addLinkForm = this.formBuilder.group({
      linkName: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ]],
      linkUrl: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ]],
    });
  }

  get f() {
    return this.addLinkForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    
    // form valid degilse locale storage'ye yazma:
    if (this.addLinkForm.invalid) {
      return;
    }

    const formValue = this.addLinkForm.value;
    const linksOfStored = localStorage.getItem('LinkVoteLinks');
    // local storage'de kayit varsa:
    if (linksOfStored) {
      this.sameLink = JSON.parse(linksOfStored).some(
        link => link.linkUrl === formValue.linkUrl
      );
      // ayni link daha once kaydedildiyse tekrar kaydetme:
      if (this.sameLink) {
        return;
      }
      const newLinksOfStored = [...JSON.parse(linksOfStored), formValue];
      localStorage.setItem('LinkVoteLinks', JSON.stringify(newLinksOfStored));
    } else {
      // kayit yoksa ilk kaydi ekle
      localStorage.setItem('LinkVoteLinks', JSON.stringify([formValue]));
    }

    // Notification icin store'u guncelle:
    this.store.dispatch(
      UpdateNotification({
        payload: {
          status: true,
          title: formValue.linkName,
          function: 'added',
          type: 'success'
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
    }, 3000);

    this.submitted = false;
    this.addLinkForm.reset();
  }
}

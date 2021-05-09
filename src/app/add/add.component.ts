import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SetLink } from '../store/links/links.actions';
import {
  UpdateNotification,
  UpdateNotificationStatus
} from '../store/template/template.actions';

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

    const linkObject = {
      ...this.addLinkForm.value,
      linkVote: 5,
      linkId: Date.now() // unique id
    };
    const linksOfStored = localStorage.getItem('LinkVoteLinks');
    // local storage'de kayit varsa:
    if (linksOfStored) {
      this.sameLink = JSON.parse(linksOfStored).some(
        link => link.linkUrl === linkObject.linkUrl
      );
      // ayni link daha once kaydedildiyse tekrar kaydetme:
      if (this.sameLink) {
        return;
      }
      const newLinksOfStored = [...JSON.parse(linksOfStored), linkObject];
      localStorage.setItem('LinkVoteLinks', JSON.stringify(newLinksOfStored));
    } else {
      // kayit yoksa ilk kaydi ekle
      localStorage.setItem('LinkVoteLinks', JSON.stringify([linkObject]));
    }

    // Notification icin store'u guncelle:
    this.store.dispatch(
      UpdateNotification({
        payload: {
          notificationStatus: true,
          notificationTitle: linkObject.linkName,
          notificationFunction: 'added',
          notificationType: 'success'
        }
      })
    );

    // Store'daki link listesini guncelle:
    this.store.dispatch(
      SetLink({ payload: linkObject })
    );

    // Notification'u ekrandan kaldir:
    setTimeout(() => {
      this.store.dispatch(
        UpdateNotificationStatus({
          payload: false
        })
      );
    }, 1500);

    this.submitted = false;
    this.addLinkForm.reset();
  }
}

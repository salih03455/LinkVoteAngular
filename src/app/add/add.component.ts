import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) { }

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
        link => link.linkName === formValue.linkName
      );
      // ayni link daha once kaydedildiyse tekrar kaydetme:
      if (this.sameLink) {
        console.log('bu link zaten kayit edilmis');
        return;
      }
      const newLinksOfStored = [...JSON.parse(linksOfStored), formValue];
      localStorage.setItem('LinkVoteLinks', JSON.stringify(newLinksOfStored));
    } else {
      // kayit yoksa ilk kaydi ekle
      localStorage.setItem('LinkVoteLinks', JSON.stringify([formValue]));
    }
    this.sameLink = false;
  }
}

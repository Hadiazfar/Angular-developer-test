import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contactForm: any;
  submitted: boolean = false;
  showField: boolean = false;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      PhoneNumber: ['', [Validators.required]],
      Resume: [''],
    });
  }
  add(file: string) {
    if (file == 'add') {
      this.showField = true;
      this.contactForm.controls['Resume'].setValidators([Validators.required]);
      this.contactForm.controls['Resume'].updateValueAndValidity();
    } else {
      this.showField = false;
      this.contactForm.patchValue({ Resume: '' });
      this.contactForm.controls['Resume'].clearValidators();
      this.contactForm.controls['Resume'].updateValueAndValidity();
    }
  }

  submit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    if (this.contactForm.value.Resume == '') {
      this.toastr.error('Please Add your Resume');
    } else {
      this.toastr.success('Save Succesfully');
      this.contactForm.patchValue({
        firstname: '',
        lastname: '',
        PhoneNumber: '',
        Resume: '',         
      });
    }
     this.showField = false;
     this.submitted = false;

  }
}

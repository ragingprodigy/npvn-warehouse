import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NpvnService } from '../../shared/npvn.service'

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  form: FormGroup;
  loading = true;
  device: any;
  message: string;

  constructor(
    private builder: FormBuilder, private remote: NpvnService
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      imei: ['', Validators.required],
      misdn: ['', Validators.required]
    });
  }

  checkIMEI($event) {
    this.loading = true;
    this.remote.getDevice(this.form.value.imei)
    .subscribe(
      (device) => {
        this.loading = false;
        this.device = device;
      }, e => {
        this.message = e;
        this.loading = false;
        setTimeout(() => {
          this.message = null;
        }, 5000);
      }
    );
  }
}

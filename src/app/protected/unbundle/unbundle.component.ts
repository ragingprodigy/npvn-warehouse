import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NpvnService } from '../../shared/npvn.service';

@Component({
  selector: 'app-unbundle',
  templateUrl: './unbundle.component.html',
  styleUrls: ['./unbundle.component.scss']
})
export class UnbundleComponent implements OnInit {
  devices: Array<any> = [];
  loading = true;
  form: FormGroup;

  constructor(private remote: NpvnService, private builder: FormBuilder, private router: Router) { }

  private errorHandler = (error) => {
    this.loading = false;
    console.log(error);
  }

  ngOnInit() {
    this.remote.listDeviceTypes().subscribe(
      (response) => {
        this.devices = response;
        this.loading = false;
      },
      this.errorHandler
    );

    this.form = this.builder.group({
      device: ['', Validators.required],
      imei: ['', Validators.required],
      serial: ['', Validators.required]
    });
  }

  checkIMEI($event) {
      console.log('---', this.form);
    if ($event.target.validity.valid) {
      // Check if the IMEI exists. If it does, redirect to appropriate view
      this.remote.checkDevice($event.target.value).subscribe(
        (resp) => {
          if (resp.exists) {
            this.router.navigate([`/unbundle/${$event.target.value}`]);
          }
        }, this.errorHandler
      );
    }
  }

  createDeviceRecord() {
    if (this.form.valid) {
      // Send Form to Server
      this.remote.createDevice(this.form.value).subscribe(
        (device) => {
          this.router.navigate([`/unbundle/${device.uuid}`]);
        }, this.errorHandler
      );
    } else {
      console.log('Form invalid', this.form);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '../shared/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  loginError: any = null;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      email: [Config.EMAIL, Validators.compose([Validators.email, Validators.required])],
      password: [Config.PASSWORD, Validators.required]
    });
  }

}

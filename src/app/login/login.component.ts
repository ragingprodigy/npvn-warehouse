import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '../shared/config';
import { AuthService } from '../shared/auth.service';
import { BaseProvider } from '../shared/base.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  loginError: any = null;

  private loginErrorhandler = (error?: any) => {
    if (error === null) {
      error = { others: 'Unexpected Login error!' };
    }

    this.loading = false;
    this.form.enable();
    this.loginError = error;

    setTimeout(() => this.loginError = null, 15000);
  };

  constructor(
    private builder: FormBuilder, private auth: AuthService, private bp: BaseProvider
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      email: [Config.EMAIL, Validators.compose([Validators.email, Validators.required])],
      password: [Config.PASSWORD, Validators.required]
    });
  }

  attemptLogin() {
    if (this.form.valid) {
      this.loading = true;
      this.form.disable();
      this.loginError = null;

      this.auth.login(this.form.value, 'dashboard').subscribe(
        (loginSuccess: boolean) => {
          console.log(`Login response received: ${loginSuccess}`);
          if (loginSuccess) {
            this.loginErrorhandler()
          }
        }, (error) => {
          this.bp.handleError(error).subscribe(e => this.loginErrorhandler(e));
        }
      );
    }
  }

}

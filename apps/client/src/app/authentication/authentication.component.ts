import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationResponse } from './interfaces/auth-response';
import { AuthenticationService } from './services/authentication.service'
@Component({
  selector: 'nx-auth-nestjs-angular-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  username: FormControl;
  password: FormControl;
  formGroup: FormGroup;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.username = new FormControl('');
    this.password = new FormControl('');
    this.formGroup = this.formBuilder.group({
      username: this.username,
      password: this.password
    });

    if(this.authenticationService.isAuthenticated()) {
      this.formGroup.disable();
    }

  }

  login(): void {
    this.authenticationService.login(this.formGroup.value).subscribe((res: AuthenticationResponse) => {
      this.formGroup.disable();
    });
  }

  register(): void {
    
  }

  logout(): void {
    this.authenticationService.logout();
    this.formGroup.enable();
  }
}

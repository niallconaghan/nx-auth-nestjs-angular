import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.username = new FormControl('');
    this.password = new FormControl('');
    this.formGroup = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  login(): void {
    this.authenticationService.login(this.formGroup.value).subscribe((res: AuthenticationResponse) => {
      this.router.navigate(['content']);
    });
  }

  register(): void {

  }
}

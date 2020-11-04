import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { ContentService } from './services/content.service';
@Component({
  selector: 'nx-auth-nestjs-angular-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private contentService: ContentService, private router: Router) { }

  ngOnInit(): void {
  }

  getContent(): any {
    console.log('Requesting protected content...')
    this.contentService.getContent().subscribe((content) => {
      console.log('Successfully received protected content');
      console.log(content);
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['authentication']);
  }
}

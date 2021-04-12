import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private authListnerSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getauthStatus()
    this.authListnerSubs = this.authService.getauthStatusListener()
      .subscribe((authentication) => {
        this.isAuthenticated = authentication
      })
  }
  ngOnDestroy() {
    this.authListnerSubs.unsubscribe()
  }
  onLogout() {
    this.authService.logout()
  }
}

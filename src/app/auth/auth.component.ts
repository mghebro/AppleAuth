import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare const AppleID: any;  // გარე Apple ID სკრიპტის დეკლარაცია

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    AppleID.auth.init({
      clientId: 'com.your.app', 
      scope: 'name email',
      redirectURI: 'https://yourdomain.com/callback',
      usePopup: true
    });

    window.addEventListener('AppleIDSignInOnSuccess', (event: any) => {
      const idToken = event.detail.authorization.id_token;
      this.http.post('https://localhost:5001/api/apple-login', { id_token: idToken })
        .subscribe(res => console.log('✅ Logged in', res));
    });

    window.addEventListener('AppleIDSignInOnFailure', (event: any) => {
      console.error('❌ Apple login failed', event);
    });
  }

  loginWithApple(): void {
    AppleID.auth.signIn(); 
  }
}

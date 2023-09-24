import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
password!:string;
confirmPassword!:string;
errorMessage: string = '';
constructor(private router:Router, private authService:AuthService, private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  onLogin(){
this.router.navigateByUrl("/login")
  }

  onForget(){
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.authService.forgotPassword(this.password).subscribe();
    this.logout();
  }
  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }



}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  email!: string;
  password!: string;
  errorMessage: string = '';



  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {

  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (result: any) => {
        if (result && result.token) {
          this.cookieService.set('token', result.token, 1, '/', 'localhost', true, 'Lax');

        }
        if (this.authService.roleMatch('ADMIN')) {
          this.router.navigateByUrl('/users');
        } else if (this.authService.roleMatch('CLIENT')) {
          this.router.navigateByUrl('/profile');
        }
      } ,
      (error) => {
        if (error.status === 401) {
          if (error.error && error.error.message && error.error.message.includes('password')) {
            this.errorMessage = 'Invalid password.';
          } else {
            this.errorMessage = 'Invalid email or password.';
          }
        } else {
          this.errorMessage = 'An error occurred while logging in. Please try again later.';
        }
      }
    );
  }

  onTypeEmail(){
    this.router.navigateByUrl('/typeEmail');
  }

  ngOnInit(): void {

  }
}

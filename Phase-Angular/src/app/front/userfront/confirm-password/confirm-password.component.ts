import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, take, timer } from 'rxjs';
import { User } from 'src/app/modele/user/user';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {


  user!:User;
  code!: number;
  code1!: number;
  confirmed: boolean = false;
  errorMessage: string = '';
  message: string;
  private subscription: Subscription;
  private readonly TIMEOUT_SECONDS = 30;

  constructor(private cookieService: CookieService, private router: Router,public  authService: AuthService,private route: ActivatedRoute ) {

  }


  ngOnInit(): void {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    if (!this.confirmed) {
      event.preventDefault();
      event.returnValue = false;
      this.cookieService.delete('token');
  this.router.navigateByUrl('/login');
  history.pushState(null,'', window.location.href);
  window.onpopstate = function () {
    history.go(1);
  };


    }
  }


  setEnabled() {
    this.authService.setEnable().subscribe(() => {
      console.log('Enabled changed successfully');
    }, (error) => {
      console.log('Error while changing enabled:', error);
    });
  }

  confirCode() {
    const token = this.cookieService.get('token');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const codeInput = (<HTMLInputElement>document.getElementById('subscribeEmail')).value;
      if (tokenPayload.code !== codeInput)  {
        this.errorMessage = 'type the correct code please';
        return;
      }
      if (tokenPayload.code === codeInput ) {
        this.setEnabled();
        if (this.authService.roleMatch('MOVER')) {
          this.router.navigateByUrl('/listpost');
        } else if (this.authService.roleMatch('CLIENT')) {
          this.router.navigateByUrl('/profile');
        }
        return true;
      }
        return false;
  }

  resendAfter30Sec() {
    setTimeout(() => {
      this.router.navigateByUrl('/conf');
    }, 30000);
  }

  resendVerificationCode() {
    this.authService.resendVerificationCode().subscribe(
      response => {
        console.log('Réponse:', response.body);
        // Traitez les données renvoyées ici
      },
      error => {
        console.log('Erreur:', error);
        // Traitez l'erreur ici
      }
    );
  }





logout(): void {
  this.cookieService.delete('token');
  this.router.navigateByUrl('/login');
}

}




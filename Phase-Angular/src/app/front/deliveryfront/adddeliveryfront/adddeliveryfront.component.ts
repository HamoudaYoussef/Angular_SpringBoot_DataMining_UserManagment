import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/modele/delivery/delivery.module';
import { Tax } from 'src/app/modele/delivery/tax.module';
import { AuthService } from 'src/app/shared/auth.service';
import { DeliveryService } from 'src/app/shared/delivery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adddeliveryfront',
  templateUrl: './adddeliveryfront.component.html',
  styleUrls: ['./adddeliveryfront.component.css']
})
export class AdddeliveryfrontComponent implements OnInit {
  delivery: Delivery=new Delivery(); 
  idOffre :any;
  constructor(private deliveryservice : DeliveryService, private router : ActivatedRoute, private de:DeliveryService,
    private route : Router, 
    private authService : AuthService) { 
    this.idOffre = this.router.snapshot.params['id']
  }
  tax : Tax;
  stat : string;
  ngOnInit(): void {
  }
  onSubmit() {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    
    this.deliveryservice.addDelivery(this.delivery, this.idOffre,1).subscribe(

=======
=======

>>>>>>> Stashed changes
    this.de.gettaxbyid(this.authService.getUserIdFromToken1())
    .subscribe(
      (tax: Tax) => {
        this.tax = tax;
        this.stat=tax.statustax;
        console.log('tax', tax);
        if (this.stat === "Payed") {
          this.deliveryservice.addDelivery(this.delivery, this.idOffre).subscribe(
            () => {
              this.gotoList();
            }
          );
        } else {
          this.alertError();
        }
      }
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    );
  }
  
gotoList() {
  this.route.navigate(['/listfurniturefront']);
}
successNotification() {
  Swal.fire('Hi', 'We have been informed!', 'success');
<<<<<<< Updated upstream
}

alertError() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'veuillez procéder au paiement',
  });
}
tinyAlert() {
  Swal.fire('Hey there!');
}

=======
>>>>>>> Stashed changes
}

alertError() {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'veuillez procéder au paiement',
  });
}
tinyAlert() {
  Swal.fire('Hey there!');
}

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contrat } from 'src/app/modele/contract';
import { RentalContractServiceService } from 'src/app/shared/rental-contract-service.service';
import { RentalofferserviceService } from 'src/app/shared/rentalofferservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rental-contrat-front',
  templateUrl: './add-rental-contrat-front.component.html',
  styleUrls: ['./add-rental-contrat-front.component.css']
})
export class AddRentalContratFrontComponent implements OnInit {

  contract = new Contrat()

  idOffre: any;
   today = new Date();
   month = this.today.getMonth();
   year = this.today.getFullYear();



  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private rentalService: RentalContractServiceService,
    private router: Router,
    private service: RentalofferserviceService
  ) {
    this.idOffre = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
   

  }
  /*
    addContrat(){
      console.log(this.contract)
      //-------------------edheya l add 7adhra--------
      //-----------------http://localhost:8000/PI/rentalcontract/addRentalContract/2/50 => si id offre 50
      this.rentalService.addContrat(this.contract , this.idOffre , 2).subscribe(res=>{
        //----url http://localhost:8000/PI/rentalcontract/listeContrat/50 => bech yraj3ek lel lista mta offre id=50
        const url = '/listeContrat/'+this.idOffre
        this.router.navigateByUrl(url)
        console.log('addd' , res)
      })
    }*/



  addRentalContrat() {
    this.rentalService.addContrat(this.contract, this.idOffre).pipe(
      catchError((error) => {
        // this.modalError();
        console.log(error)
this.alertError();
        return throwError(() => new Error(error));
      }),
    ).subscribe((res) => {
      this.successNotification();

    });
    // show success alert


  }

  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'An error is generated when adding the contract. Please check availability',
    });
  }
  successNotification() {
    Swal.fire('Contract added successfuly!');
  }


  disponile(data: any) {
    console.log(data.offreid)
    this.service.getDisponible(data.offreid).subscribe(res => {
      console.log(res)
      alert(res)
    }, err => {
      alert('error de serveur')
    })
  }

}

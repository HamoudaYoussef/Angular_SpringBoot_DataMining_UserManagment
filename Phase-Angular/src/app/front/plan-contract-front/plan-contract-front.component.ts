import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ContractPlan } from 'src/app/modele/contractPlan/contractPlan.modele';
import { Offer } from 'src/app/modele/offrePlan/offre.modele';
import { AuthService } from 'src/app/shared/auth.service';
import { ContractPlanService } from 'src/app/shared/contract-plan.service';
import { ServicePlanService } from 'src/app/shared/service-plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-contract-front',
  templateUrl: './plan-contract-front.component.html',
  styleUrls: ['./plan-contract-front.component.css']
})
export class PlanContractFrontComponent implements OnInit {

  list:any;
  idOffre : any
  contrats : any
  contratDetail : any
  show : boolean = false
  @ViewChild('pdf') pdf!: ElementRef;
  offre : any ;
  constructor(private service : ContractPlanService, private router :Router, private route: ActivatedRoute, private servicePlan : ServicePlanService, private auth : AuthService) { 

     this.idOffre = this.route.snapshot.params['idOffre'];

}

  getContrat(){
    this.service.getOffers().subscribe(res=>{
      this.contrats = res
      this.contrats = this.contrats.filter((i:any)=>{
        return i.planContractPlan == this.idOffre
      })
      console.log(this.contrats)
    })
  }

  revenu! :any;


  ngOnInit(): void {

    this.getContrat()
    console.log("*******************"+this.idOffre);
    this.servicePlan.getOffreById(this.idOffre).subscribe(event => {
      this.offre = event;
    });

 
  }
  

   
  
  deleteOffer = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.service.deleteContractPlan(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }

  generatePDF(item:any){
    console.log(item)
    this.show = true
    this.contratDetail = item
  }

  loadPdfff(){
    const op = {
      backgroud : 'white',
      scale : 3
    }

    var div = document.getElementById('pdff')

    setTimeout(()=>{
      if(this.pdf){

        html2canvas(this.pdf.nativeElement , op).then(async canvas=>{
          const myImage = await canvas.toDataURL('image/png')
          let myPdf = new jsPDF('p' , 'mm' ,'a4')
          var width = await myPdf.internal.pageSize.getWidth()
          var heigth = await canvas.height * width / canvas.width
          myPdf.addImage(myImage , 'PNG' , 0 , 0 , width , heigth)
          myPdf.save('contrat.pdf')
          // this.toastr.success('Vous avez téléchargé le pdf avec succée', 'OK 🙂');
        })
      }
    })
  }

  goToAdd(){

    const url = 'contractplanfront/'+this.idOffre+'/ajout'

    this.router.navigateByUrl(url)

  }
  contract = new ContractPlan()
  async createContract(){
    console.log('aaa', this.contract);
    try {
      await this.service.addContrat(this.contract, this.idOffre).subscribe((contractId:Number)=>{ 
        const url = 'payementplan/'+contractId
      console.log("a5demi nayki"+this.contract)
      this.router.navigateByUrl(url)});
      
   

      this.contract = new ContractPlan();
      this.successNotification();
      // Afficher une notification de succès ici
        
    } catch (error) {
      // Afficher une alerte d'erreur ici
      this.alertError();
    }
    const url = 'payementplan/'+this.contract.contractId
    console.log("a5demi nayki"+this.contract)
    this.router.navigateByUrl(url)
   
  }
  successNotification() {
    Swal.fire('Hi', 'We have been informed!', 'success');
  }

  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'veuiller proceder au paiement ',
    });
  }
  tinyAlert() {
    Swal.fire('Hey there!');
  }
 
  getrevenuuser(){
    this.service.calculateRevenueForUser(this.auth.getUserIdFromToken1()).subscribe(
      revenue => {
        console.log("testtsqqdcvz"+revenue); // Faites quelque chose avec la valeur du revenu
      },
      error => {
        console.error(error); // Gérez les erreurs éventuelles
      }
    );
  }
}

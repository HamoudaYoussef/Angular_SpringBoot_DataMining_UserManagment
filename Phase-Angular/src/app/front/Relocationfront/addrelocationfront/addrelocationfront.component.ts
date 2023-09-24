import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Relocation } from 'src/app/modele/relocation.module';
import { RelocationService } from 'src/app/shared/relocation.service';

@Component({
  selector: 'app-addrelocationfront',
  templateUrl: './addrelocationfront.component.html',
  styleUrls: ['./addrelocationfront.component.css']
})
export class AddrelocationfrontComponent implements OnInit {

  listrelocation: any;
  relocation: Relocation=new Relocation();
  relocationid!: number;
  relocationdate!: Date;

  constructor(private relocationservice : RelocationService, private router:Router) { }

  ngOnInit(): void {
  }
  
  
  onSubmit() {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    this.relocationservice.addRelocatio(this.relocation, 1).subscribe((relocationId: number) => {
=======
    this.relocationservice.addRelocatio(this.relocation).subscribe((relocationId: number) => {
>>>>>>> Stashed changes
=======
    this.relocationservice.addRelocatio(this.relocation).subscribe((relocationId: number) => {
>>>>>>> Stashed changes
      const url = 'addfurniturefront/' + relocationId;
      this.router.navigateByUrl(url);
    });
    this.relocation = new Relocation();
  }
  
  

}

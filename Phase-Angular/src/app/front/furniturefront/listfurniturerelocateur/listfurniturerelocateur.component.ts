import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Furniture } from 'src/app/modele/furniture';
import { Relocation } from 'src/app/modele/relocation.module';
import { FurnitureService } from 'src/app/shared/furniture.service';
import { RelocationService } from 'src/app/shared/relocation.service';

@Component({
  selector: 'app-listfurniturerelocateur',
  templateUrl: './listfurniturerelocateur.component.html',
  styleUrls: ['./listfurniturerelocateur.component.css']
})
export class ListfurniturerelocateurComponent implements OnInit {

  furnitureList: Furniture[] = [];
  relocatiion : Relocation = new Relocation;

  constructor(
    private furnitureService: FurnitureService,
    private relocationService: RelocationService,
<<<<<<< Updated upstream
    private router : Router 

=======
    private router : Router
>>>>>>> Stashed changes
  ) {}

  ngOnInit(): void {
    this.getAllFurniture();
  }

  getAllFurniture() {
    this.furnitureService.getAllFurniture().subscribe((furnitureList : any) => {
      furnitureList.forEach(async (furniture: Furniture) => {
        if (furniture.relocationFourtniture) {
          const relocation: Relocation = await this.relocationService.getRelocationById2(furniture.relocationFourtniture);
          furniture.relocation = relocation;
        }
        if(furniture.relocation.relocationState!=="false"){

          this.furnitureList.push(furniture);
        }        
        
      });
    });
  }
  detail(data:any){
    console.log(data)
    const url = 'adddeliveryfront/'+data.relocationid
    this.router.navigateByUrl(url)
  }

  async someFunction(furniture : Furniture) {
    const relocation = await this.relocationService.getRelocationById2(furniture.relocationFourtniture);
    console.log(relocation);
    // Do something with the relocation object
  }
}

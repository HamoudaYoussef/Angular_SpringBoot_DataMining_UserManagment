import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ContractPlanService } from 'src/app/shared/contract-plan.service';

@Component({
  selector: 'app-space-contractor',
  templateUrl: './space-contractor.component.html',
  styleUrls: ['./space-contractor.component.css']
})
export class SpaceContractorComponent implements OnInit {

  constructor(private service :ContractPlanService, private auth : AuthService ) { }
  revenue: number;
  ngOnInit(): void {
    this.service.calculateRevenueForUser(this.auth.getUserIdFromToken1()).subscribe(
      revenue => {
        this.revenue = revenue;
      },
      error => {
        console.error(error);
      }
    );
  }

  }



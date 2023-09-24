import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarrelocateurComponent } from './navbarrelocateur.component';

describe('NavbarrelocateurComponent', () => {
  let component: NavbarrelocateurComponent;
  let fixture: ComponentFixture<NavbarrelocateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarrelocateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarrelocateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

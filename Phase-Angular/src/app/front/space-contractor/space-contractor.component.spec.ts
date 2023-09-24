import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceContractorComponent } from './space-contractor.component';

describe('SpaceContractorComponent', () => {
  let component: SpaceContractorComponent;
  let fixture: ComponentFixture<SpaceContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceContractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

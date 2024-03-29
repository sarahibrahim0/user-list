import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrampComponent } from './bread-cramp.component';

describe('BreadCrampComponent', () => {
  let component: BreadCrampComponent;
  let fixture: ComponentFixture<BreadCrampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadCrampComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadCrampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

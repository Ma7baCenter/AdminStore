import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesproductsComponent } from './pagesproducts.component';

describe('PagesproductsComponent', () => {
  let component: PagesproductsComponent;
  let fixture: ComponentFixture<PagesproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesproductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

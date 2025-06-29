import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingproductComponent } from './addingproduct.component';

describe('AddingproductComponent', () => {
  let component: AddingproductComponent;
  let fixture: ComponentFixture<AddingproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddingproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

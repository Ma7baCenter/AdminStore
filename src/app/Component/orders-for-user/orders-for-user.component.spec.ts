import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForUserComponent } from './orders-for-user.component';

describe('OrdersForUserComponent', () => {
  let component: OrdersForUserComponent;
  let fixture: ComponentFixture<OrdersForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersForUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

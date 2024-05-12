import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippingDialogComponent } from './edit-shipping-dialog.component';

describe('EditShippingDialogComponent', () => {
  let component: EditShippingDialogComponent;
  let fixture: ComponentFixture<EditShippingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditShippingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditShippingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

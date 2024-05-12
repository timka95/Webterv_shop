import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShippingDialogComponent } from './upload-shipping-dialog.component';

describe('UploadShippingDialogComponent', () => {
  let component: UploadShippingDialogComponent;
  let fixture: ComponentFixture<UploadShippingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadShippingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadShippingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

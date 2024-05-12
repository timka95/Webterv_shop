import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificItemComponent } from './specific-item.component';

describe('SpecificItemComponent', () => {
  let component: SpecificItemComponent;
  let fixture: ComponentFixture<SpecificItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

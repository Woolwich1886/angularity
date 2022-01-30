import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericSphereComponent } from './numeric-sphere.component';

describe('NumericSphereComponent', () => {
  let component: NumericSphereComponent;
  let fixture: ComponentFixture<NumericSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericSphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

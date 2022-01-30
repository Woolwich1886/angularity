import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxSpheresComponent } from './rx-spheres.component';

describe('RxSpheresComponent', () => {
  let component: RxSpheresComponent;
  let fixture: ComponentFixture<RxSpheresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxSpheresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxSpheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

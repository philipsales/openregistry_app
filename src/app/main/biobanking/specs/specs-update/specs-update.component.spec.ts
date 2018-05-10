import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsUpdateComponent } from './specs-update.component';

describe('SpecsUpdateComponent', () => {
  let component: SpecsUpdateComponent;
  let fixture: ComponentFixture<SpecsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

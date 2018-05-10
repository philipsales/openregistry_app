import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsCreateComponent } from './specs-create.component';

describe('SpecsCreateComponent', () => {
  let component: SpecsCreateComponent;
  let fixture: ComponentFixture<SpecsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

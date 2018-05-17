import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioformsFormComponent } from './bioforms-form.component';

describe('BioformsFormComponent', () => {
  let component: BioformsFormComponent;
  let fixture: ComponentFixture<BioformsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioformsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioformsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

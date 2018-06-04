import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioformsCreateFormComponent } from './bioforms-create-form.component';

describe('BioformsCreateFormComponent', () => {
  let component: BioformsCreateFormComponent;
  let fixture: ComponentFixture<BioformsCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioformsCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioformsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

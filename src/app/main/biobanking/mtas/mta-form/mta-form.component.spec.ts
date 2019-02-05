import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtaFormComponent } from './mta-form.component';

describe('MtaFormComponent', () => {
  let component: MtaFormComponent;
  let fixture: ComponentFixture<MtaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

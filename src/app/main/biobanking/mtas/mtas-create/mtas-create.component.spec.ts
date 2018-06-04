import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtasCreateComponent } from './mtas-create.component';

describe('MtasCreateComponent', () => {
  let component: MtasCreateComponent;
  let fixture: ComponentFixture<MtasCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtasCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

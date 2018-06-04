import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtasComponent } from './mtas.component';

describe('MtasComponent', () => {
  let component: MtasComponent;
  let fixture: ComponentFixture<MtasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtsUpdateComponent } from './mts-update.component';

describe('MtsUpdateComponent', () => {
  let component: MtsUpdateComponent;
  let fixture: ComponentFixture<MtsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

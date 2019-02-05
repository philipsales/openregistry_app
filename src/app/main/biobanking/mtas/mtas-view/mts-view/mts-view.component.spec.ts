import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtsViewComponent } from './mts-view.component';

describe('MtsViewComponent', () => {
  let component: MtsViewComponent;
  let fixture: ComponentFixture<MtsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

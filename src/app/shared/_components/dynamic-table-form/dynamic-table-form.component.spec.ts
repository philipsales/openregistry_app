import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableFormComponent } from './dynamic-table-form.component';

describe('DynamicTableFormComponent', () => {
  let component: DynamicTableFormComponent;
  let fixture: ComponentFixture<DynamicTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

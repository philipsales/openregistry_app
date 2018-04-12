import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTableSectionComponent } from './forms-table-section.component';

describe('FormsTableSectionComponent', () => {
  let component: FormsTableSectionComponent;
  let fixture: ComponentFixture<FormsTableSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsTableSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsTableSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

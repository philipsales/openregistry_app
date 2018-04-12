import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsTableSectionArrayComponent } from './forms-table-section-array.component';

describe('FormsTableSectionArrayComponent', () => {
  let component: FormsTableSectionArrayComponent;
  let fixture: ComponentFixture<FormsTableSectionArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsTableSectionArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsTableSectionArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

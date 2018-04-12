import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQuestionContentArrayComponent } from './table-question-content-array.component';

describe('TableQuestionContentArrayComponent', () => {
  let component: TableQuestionContentArrayComponent;
  let fixture: ComponentFixture<TableQuestionContentArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableQuestionContentArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableQuestionContentArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

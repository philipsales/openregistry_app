import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectypesListComponent } from './spectypes-list.component';

describe('SpectypesListComponent', () => {
  let component: SpectypesListComponent;
  let fixture: ComponentFixture<SpectypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

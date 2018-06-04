import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectypesUpdateComponent } from './spectypes-update.component';

describe('SpectypesUpdateComponent', () => {
  let component: SpectypesUpdateComponent;
  let fixture: ComponentFixture<SpectypesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectypesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectypesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectypesFormComponent } from './spectypes-form.component';

describe('SpectypesFormComponent', () => {
  let component: SpectypesFormComponent;
  let fixture: ComponentFixture<SpectypesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectypesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

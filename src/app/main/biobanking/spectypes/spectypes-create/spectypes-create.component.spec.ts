import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpectypesCreateComponent } from './spectypes-create.component';

describe('SpectypesCreateComponent', () => {
  let component: SpectypesCreateComponent;
  let fixture: ComponentFixture<SpectypesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpectypesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

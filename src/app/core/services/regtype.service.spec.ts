import { TestBed, inject } from '@angular/core/testing';

import { RegTypeService } from './regtype.service';

describe('RegTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegTypeService]
    });
  });

  it('should be created', inject([RegTypeService], (service: RegTypeService) => {
    expect(service).toBeDefined();
  }));
});

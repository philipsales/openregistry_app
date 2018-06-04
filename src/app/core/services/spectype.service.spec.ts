import { TestBed, inject } from '@angular/core/testing';

import { SpectypeService } from './spectype.service';

describe('SpectypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpectypeService]
    });
  });

  it('should be created', inject([SpectypeService], (service: SpectypeService) => {
    expect(service).toBeTruthy();
  }));
});

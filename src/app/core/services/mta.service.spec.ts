import { TestBed, inject } from '@angular/core/testing';

import { MtaService } from './mta.service';

describe('MtaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MtaService]
    });
  });

  it('should be created', inject([MtaService], (service: MtaService) => {
    expect(service).toBeTruthy();
  }));
});

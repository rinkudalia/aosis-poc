import { TestBed } from '@angular/core/testing';

import { AosisMappingService } from './aosis-mapping.service';

describe('AosisMappingService', () => {
  let service: AosisMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AosisMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

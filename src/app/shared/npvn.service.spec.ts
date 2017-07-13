import { TestBed, inject } from '@angular/core/testing';

import { NpvnService } from './npvn.service';

describe('NpvnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NpvnService]
    });
  });

  it('should be created', inject([NpvnService], (service: NpvnService) => {
    expect(service).toBeTruthy();
  }));
});

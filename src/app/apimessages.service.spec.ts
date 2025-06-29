import { TestBed } from '@angular/core/testing';

import { ApimessagesService } from './apimessages.service';

describe('ApimessagesService', () => {
  let service: ApimessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApimessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

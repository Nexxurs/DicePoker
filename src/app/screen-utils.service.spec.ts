import { TestBed } from '@angular/core/testing';

import { ScreenUtilsService } from './screen-utils.service';

describe('ScreenUtilsService', () => {
  let service: ScreenUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

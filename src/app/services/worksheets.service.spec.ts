import { TestBed } from '@angular/core/testing';

import { WorksheetsService } from './worksheets.service';

describe('WorksheetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorksheetsService = TestBed.get(WorksheetsService);
    expect(service).toBeTruthy();
  });
});

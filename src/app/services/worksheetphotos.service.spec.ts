import { TestBed } from '@angular/core/testing';

import { WorksheetphotosService } from './worksheetphotos.service';

describe('WorksheetphotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorksheetphotosService = TestBed.get(WorksheetphotosService);
    expect(service).toBeTruthy();
  });
});

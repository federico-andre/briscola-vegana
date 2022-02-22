import { TestBed } from '@angular/core/testing';

import { GiocatoriService } from './giocatori.service';

describe('GiocatoriService', () => {
  let service: GiocatoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiocatoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

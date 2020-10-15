import { TestBed } from '@angular/core/testing';

import { NologeadoGuard } from './nologeado.guard';

describe('NologeadoGuard', () => {
  let guard: NologeadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NologeadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

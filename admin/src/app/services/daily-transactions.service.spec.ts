import { TestBed } from '@angular/core/testing';

import { DailyTransactionsService } from './daily-transactions.service';

describe('DailyTransactionsService', () => {
  let service: DailyTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

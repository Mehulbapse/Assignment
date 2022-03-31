import { TestBed } from '@angular/core/testing';

import { RegisterFormServiceService } from './register-form-service.service';

describe('RegisterFormServiceService', () => {
  let service: RegisterFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

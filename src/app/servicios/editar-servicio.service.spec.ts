import { TestBed } from '@angular/core/testing';

import { EditarServicioService } from './editar-servicio.service';

describe('EditarServicioService', () => {
  let service: EditarServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesToUploadService } from './files-to-upload.service';

describe('Service: FilesToUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesToUploadService]
    });
  });

  it('should ...', inject([FilesToUploadService], (service: FilesToUploadService) => {
    expect(service).toBeTruthy();
  }));
});

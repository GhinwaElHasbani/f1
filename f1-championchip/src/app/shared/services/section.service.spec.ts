import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SectionService } from './section.service';

export class SectionStub {
  sendSection(section: any) {

  }

  sendSeason(season: any) {

  }

  clearSection() {
    
  }

  getSection() {
    return;
  }

  selectedSection() {
    return of(null)
  }
}


describe('SectionService', () => {
  let service: SectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SectionService
      ],
    });
    service = TestBed.inject(SectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
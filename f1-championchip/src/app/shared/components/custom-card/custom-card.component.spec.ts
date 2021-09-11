import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WikiService } from '../../services/wiki.service';

import { CustomCardComponent } from './custom-card.component';

class WikiStub {

}

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;
  let wikiService: WikiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomCardComponent],
      providers: [
        { provide: WikiService, useClass: WikiStub },

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    wikiService = TestBed.inject(WikiService);
    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

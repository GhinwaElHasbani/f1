import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomDataTableComponent } from './custom-data-table.component';

class TranslateStub {
  
}

describe('CustomDataTableComponent', () => {
  let component: CustomDataTableComponent;
  let fixture: ComponentFixture<CustomDataTableComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomDataTableComponent],
      imports: [
        TranslateModule.forChild()],
      providers: [
        { provide: TranslateService, useClass: TranslateStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    translateService = TestBed.inject(TranslateService);

    fixture = TestBed.createComponent(CustomDataTableComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

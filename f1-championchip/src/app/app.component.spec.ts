import { LocationStrategy } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';

class TranslateStub {
  setDefaultLang(lang: any) {

  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set default language to english', () => {
    translateService = TestBed.inject(TranslateService);
    let spy = spyOn(translateService, 'setDefaultLang');

    fixture = TestBed.createComponent(AppComponent);

    expect(spy).toHaveBeenCalledWith('en');
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet))

    expect(de).not.toBeNull();
  });

  it('should have a spinner', () => {
    const compiled = fixture.debugElement.nativeElement;
    let sp = compiled.querySelector('ngx-spinner');
    expect(sp).not.toBeNull();
  });
});

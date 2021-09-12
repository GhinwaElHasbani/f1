import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ 
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ]
    });
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet))
 
    expect(de).not.toBeNull();
   });

   it('should have a header', () => {
    const compiled = fixture.debugElement.nativeElement;
    let h = compiled.querySelector('f1-menu-header');
    expect(h).not.toBeNull();

   });

   it('should have a header without a menu', () => {
    const debugEls = fixture.debugElement.queryAll(By.css('f1-menu-header'));
    
    expect(debugEls[0].properties['withMenu']).toBeFalse;
  });
});

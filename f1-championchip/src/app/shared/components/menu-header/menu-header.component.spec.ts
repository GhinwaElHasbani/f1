
import { BreakpointObserver } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { MenuHeaderComponent } from './menu-header.component';


class RouterStub {

}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

class FormBuilderStub {

}

class BreakpointStub {

}


describe('MenuHeaderComponent', () => {
  let component: MenuHeaderComponent;
  let fixture: ComponentFixture<MenuHeaderComponent>;
  let router: RouterStub;
  let route: ActivatedRouteStub;
  let fb: FormBuilder;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuHeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forChild()
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: FormBuilder, useClass: FormBuilderStub },
        { provide: BreakpointObserver, useClass: BreakpointStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture = TestBed.createComponent(MenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});

import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleBaseClass } from 'src/app/shared/bases/module.base';
import { Constructor, BeObject, PageChangeEvent } from 'src/app/shared/interfaces';
import { SectionService } from 'src/app/shared/services/section.service';
import { HomeService } from '../home.service';
import { CONSTRUCTORS_MODULES_CONFIG } from './constructors.config';

@Component({
  selector: 'f1-constructors',
  templateUrl: './constructors.component.html',
  styleUrls: ['./constructors.component.sass']
})
export class ConstructorsComponent extends ModuleBaseClass<Constructor> implements OnInit {
  currentModule = 'constructors';
  moduleConfig = CONSTRUCTORS_MODULES_CONFIG;

  constructor(
    injector: Injector,
    private _modulesService: HomeService,
    protected sectionService: SectionService
  ) {
    super(injector, sectionService);
  }


  ngOnInit(): void {
    super.ngOnInit();
  }

  getModuleList(paginationObj: PageChangeEvent): Observable<HttpResponse<BeObject>> {
    return this._modulesService.getModuleList(<string>this.series, <number>this.season, this.moduleConfig.name, this.getPaginationParam(paginationObj));
  }
}

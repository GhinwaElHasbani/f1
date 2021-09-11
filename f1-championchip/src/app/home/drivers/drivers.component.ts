import { HttpResponse } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleBaseClass } from 'src/app/shared/bases/module.base';
import { BeObject, Driver, PageChangeEvent } from 'src/app/shared/interfaces';
import { SectionService } from 'src/app/shared/services/section.service';
import { HomeService } from '../home.service';
import { DRIVERS_MODULES_CONFIG } from './drivers.config';

@Component({
  selector: 'f1-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.sass']
})
export class DriversComponent extends ModuleBaseClass<Driver> implements OnInit {
  currentModule = 'drivers';
  moduleConfig = DRIVERS_MODULES_CONFIG;

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

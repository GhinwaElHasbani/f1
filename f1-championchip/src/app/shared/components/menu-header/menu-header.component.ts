import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageHelper } from '../../helpers';
import { MenuItem } from '../sidenav-menu/menu-items.model';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'f1-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.sass']
})
export class MenuHeaderComponent implements OnInit, OnChanges {
  @Output() menuIconClick: EventEmitter<any> = new EventEmitter();
  @Output() changeSection: EventEmitter<number> = new EventEmitter();
  @Input() menuItems: MenuItem[] = [];
  @Input() withMenu: boolean = false;
  @Input() selectedSection?: number;
  public displayMenuIcon: boolean = false;
  @ViewChild(SidenavMenuComponent) sidenavMenuComp?: SidenavMenuComponent;
  private startYear = 2005;
  public seasonsList: number[] = [];
  public languageHelper = LanguageHelper;
  public form?: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {

    this.breakpointObserver.observe([
      '(max-width: 768px)'
    ]).subscribe(result => {
      this.displayMenuIcon = result.matches;
    });

    this.fillLookupList();

  }

  initForm() {
    this.form = this._fb.group({
      selectedSection: [null]
    });
    this.form.get('selectedSection')?.valueChanges.subscribe(s => {
      if (s && s != this.selectedSection) {
        this.changeRoute(s);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedSection'].isFirstChange() && this.form?.get('selectedSection') && this.selectedSection) {
      this.form.get('selectedSection')?.setValue(this.selectedSection);
    }
  }

  private fillLookupList() {
    if (this.withMenu) {
      const thisYear = (new Date()).getFullYear();
      const years = <number[]>this.languageHelper.generateListFromTo(this.startYear, thisYear);
      this.seasonsList = years.sort((a, b) => b - a);
    }
  }

  public clickMenuIcon() {
    this.sidenavMenuComp?.toggleNav();
    this.menuIconClick.emit();
  }

  public goBackToLanding() {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  private changeRoute(season: number) {
    this.changeSection.emit(season);
  }
}

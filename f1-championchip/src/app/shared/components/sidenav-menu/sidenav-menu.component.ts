import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from './menu-items.model';

@Component({
  selector: 'f1-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.sass']
})

export class SidenavMenuComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  @Input() menuItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public toggleNav() {
    this.sidenav?.toggle();
  }

}

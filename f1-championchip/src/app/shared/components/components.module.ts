import { NgModule } from '@angular/core';
import { SidenavMenuComponent } from 'src/app/shared/components/sidenav-menu/sidenav-menu.component';
import { CustomCardComponent } from '../components/custom-card/custom-card.component';
import { CustomDataTableComponent } from '../components/custom-data-table/custom-data-table.component';
import { MenuHeaderComponent } from '../components/menu-header/menu-header.component';
import { ThirdPartiesModule } from './third-parties/third-parties.module';

// declared and exported all the custom components created in the shared folder that may be used in multiple modules
@NgModule({
    imports: [
        ThirdPartiesModule,
    ],
    entryComponents: [
    ],
    declarations: [
        SidenavMenuComponent,
        MenuHeaderComponent,
        CustomDataTableComponent,
        CustomCardComponent
    ],
    exports: [
        // The third parties components is exported from here to the shared module
        ThirdPartiesModule,
        SidenavMenuComponent,
        MenuHeaderComponent,
        CustomDataTableComponent,
        CustomCardComponent

    ]
})
export class ComponentsModule { }


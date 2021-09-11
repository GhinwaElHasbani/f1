import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../materials/materials.module';

// Export all used third libraries
@NgModule({
    imports: [],
    exports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule,
        TranslateModule,
        MaterialModule
    ],
    providers: []
})
export class ThirdPartiesModule {

}

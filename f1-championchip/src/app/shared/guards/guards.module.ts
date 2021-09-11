import { NgModule, Provider } from '@angular/core';
import { SeasonsGuard } from '../guards/seasons.guard';
import { SeriesGuard } from '../guards/series.guard';

@NgModule({
})
export class GuardsModule {
    static forShared(): Provider[] {
        return [
            SeriesGuard,
            SeasonsGuard
        ];
    }
}

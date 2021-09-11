import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { GuardsModule } from './guards/guards.module';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ServicesModule } from './services/services.module';

// export everything implemented in shared module
@NgModule({
  imports: [ComponentsModule],
  exports: [
    ComponentsModule
  ]
})

export class SharedModule {
  // Providers called from root
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ServicesModule.forShared(),
        InterceptorsModule.forShared(),
        GuardsModule.forShared()
      ]
    };
  }
}

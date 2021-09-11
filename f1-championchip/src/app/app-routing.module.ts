import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_ENUM } from './shared/enums';

export const routes: Routes = [
  // This is the landing page. I chose to show the list of seasons, but in fact we can remove it and the list inside can still work. 
  // Thats why accessing it from a different route so it can be removed any time and the races list wont be dependant on it.
  { path: ROUTES_ENUM.LANDING, loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule), data: { animation: 'LandingPage' } },
 
  // This is the module where we are showing all the details 
  // Both are modules so it wont load everything on the startup. In case we want to remove the landing or replace it, it wont affect the app.
  { path: ROUTES_ENUM.HOME, loadChildren: () => import('./home/home.module').then(m => m.HomeModule), data: { animation: 'HomePage' } },
  
  // Any route requested by the user that doesn't match the previous 2 or just to the root, will be redirected to landing
  { path: '**', redirectTo: ROUTES_ENUM.LANDING, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

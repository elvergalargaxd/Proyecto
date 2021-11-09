import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { LeerComponent } from './leer/leer.component';

const routes: Routes = [
  {path:'crear', component:CrearComponent},
  {path:'crear/:id', component:CrearComponent},
  {path:'leer',component:LeerComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home.component';
import { FlightsComponent } from './pages/Flights/flights.component';
import { PlaneComponent } from './pages/Planes/plane.component';
import { WorkersComponent } from './pages/Workers/workers.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AddAvsComponent } from './pages/add-avs/add-avs.component';
import {AirportsManageComponent} from './pages/airports-manage/airports-manage.component'
import {PlaneManagementComponent} from "./pages/plane-management/plane-management.component";
import {WorkersManagementComponent} from "./pages/workers-management/workers-management.component";
import { AdminGuard} from "./security/admin.guard";

const routes: Routes = [
  { path:'', component:HomeComponent, children:[
      { path:'', component:FlightsComponent },
      { path:'plane', component:PlaneComponent },
      { path:'workers', component:WorkersComponent },
      {
        path:'userManagement',
        component:UserManagementComponent,
        canActivate: [AdminGuard] // Add AdminGuard to the canActivate property
      },
      { path:'userForm', component:UserFormComponent,canActivate: [AdminGuard]},
      {path:'manageFlight',component:AddAvsComponent},
      {path:'manageAirports',component:AirportsManageComponent},
      {path:'planeManagement',component:PlaneManagementComponent},
      {path:'workersManagement',component:WorkersManagementComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }

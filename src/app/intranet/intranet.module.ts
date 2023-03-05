import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { HomeComponent } from './pages/Home/home.component';
import { PlaneComponent } from './pages/Planes/plane.component';
import { FlightsComponent } from './pages/Flights/flights.component';
import { WorkersComponent } from './pages/Workers/workers.component';
import { AvionsPipe } from './utils/avions.pipe';
import { FormsModule } from '@angular/forms';
import { WorkerPipe } from './utils/Worker.pipe';
import { ModelePipe } from './utils/modele.pipe';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { AddAvsComponent } from './pages/add-avs/add-avs.component';
import { AirportsManageComponent } from './pages/airports-manage/airports-manage.component';
import {PaginateAirportsPipe} from './utils/paginate.pipe';
import { TableFilterPipe } from './utils/table-filter.pipe';
import { ReactiveFormsModule} from '@angular/forms'
import {MatDialogRef} from "@angular/material/dialog";
import { PlaneManagementComponent } from './pages/plane-management/plane-management.component';
import { WorkersManagementComponent } from './pages/workers-management/workers-management.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlaneComponent,
    PaginateAirportsPipe,
    FlightsComponent,
    WorkersComponent,
    AvionsPipe,
    WorkerPipe,
    ModelePipe,
    UserManagementComponent,
    UserFormComponent,
    AddAvsComponent,
    AirportsManageComponent,
    TableFilterPipe,
    PlaneManagementComponent,
    WorkersManagementComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {
        close: () => { }
      }
    },
  ],

})
export class IntranetModule { }

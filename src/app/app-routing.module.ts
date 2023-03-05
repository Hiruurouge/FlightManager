import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Login/login.component';
import { ErreurRouteComponent } from './pages/erreur-route/erreur-route.component';
import { NoticeComponent } from './pages/Notice/notice.component';
import { ProfileComponent } from './pages/Profile/profile.component';
import { AuthGuard } from './Security/auth.guard';
import {ProfileUpdateComponent} from "./pages/profile-update/profile-update.component";

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'mentions', component:NoticeComponent},
  {path:'profil',component:ProfileComponent},
  {path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule), canActivate:[AuthGuard], canLoad:[AuthGuard] },
  {path:'profileUpdate',component:ProfileUpdateComponent},
  {path:'**', component:ErreurRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

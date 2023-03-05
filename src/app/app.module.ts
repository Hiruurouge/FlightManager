import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule
 } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/Login/login.component';
import { NavBarComponent } from './pages/NavBar/nav-bar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NoticeComponent } from './pages/Notice/notice.component';
import { ErreurRouteComponent } from './pages/erreur-route/erreur-route.component';
import { ProfileComponent } from './pages/Profile/profile.component';
import { TokenInterceptor } from './Security/token.interceptor';
import { Erreur401Interceptor } from './Security/erreur401.interceptor';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ProfileUpdateComponent } from './pages/profile-update/profile-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    NoticeComponent,
    ErreurRouteComponent,
    ProfileComponent,
    ProfileUpdateComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:Erreur401Interceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

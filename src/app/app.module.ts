import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadCrampComponent } from './components/bread-cramp/bread-cramp.component';
import { SearchComponent } from './components/search/search.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CachingDataInterceptor } from './interceptors/caching-data.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { progressInterceptorInterceptor } from './interceptors/progress-interceptor.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer, UserState } from './store/user.reducer';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserListComponent,
    HeaderComponent,
    BreadCrampComponent,
    SearchComponent,
    PaginationComponent,
    SpinnerComponent,
    ProgressBarComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    StoreModule.forRoot({ userState: userReducer }),
    EffectsModule.forRoot([UserEffects])


  ],
  providers: [
    provideAnimationsAsync(),

    {
      provide: HTTP_INTERCEPTORS,
      useClass : CachingDataInterceptor,
      multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass : progressInterceptorInterceptor,
    multi: true,
},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }

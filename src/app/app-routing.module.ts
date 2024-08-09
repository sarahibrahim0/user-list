import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';

const routes: Routes = [

  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users/page/:page', component: UserDetailsComponent },
  ,
{    path: 'users/:id', component: UserDetailsComponent
},
{ path: '**', redirectTo: 'users/page/1' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PeopleComponent } from './modules/people/people.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'users', component: UsersComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

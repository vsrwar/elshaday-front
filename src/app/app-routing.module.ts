import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PeopleComponent } from './modules/people/people.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { CreateUserComponent } from './modules/users/create/create.component';
import { EditUserComponent } from './modules/users/edit/edit.component';
import { CreatePersonComponent } from './modules/people/create/create.component';
import { EditPersonComponent } from './modules/people/edit/edit.component';
import { CreateDepartmentsComponent } from './modules/departments/create/create.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'people/create', component: CreatePersonComponent },
  { path: 'people/edit/:personType/:personId', component: EditPersonComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/create', component: CreateDepartmentsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users/edit/:userId', component: EditUserComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

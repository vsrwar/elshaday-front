import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/header/navigation.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { PeopleComponent } from './modules/people/people.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateUserComponent } from './modules/users/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './modules/users/edit/edit.component';
import { ToastrModule } from 'ngx-toastr';
import { CreatePersonComponent } from './modules/people/create/create.component';
import { EditPersonComponent } from './modules/people/edit/edit.component';
import { CreateDepartmentsComponent } from './modules/departments/create/create.component';
import { CardComponent } from './modules/home/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    PeopleComponent,
    DepartmentsComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    CreatePersonComponent,
    EditPersonComponent,
    CreateDepartmentsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }

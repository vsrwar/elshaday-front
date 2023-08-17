import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/header/navigation.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { PeopleComponent } from './modules/people/people.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { UsersComponent } from './modules/users/users.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    PeopleComponent,
    DepartmentsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

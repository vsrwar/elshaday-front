import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  countLegalPeople: number = 0;
  countPhysicalPeople: number = 0;
  countDepartments: number = 0;
  countUsers: number = 0;

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.service.getTotalLegalPeople().subscribe((data) => this.countLegalPeople = data);
    this.service.getTotalPhysicalPeople().subscribe((data) => this.countPhysicalPeople = data);
    this.service.getTotalDepartments().subscribe((data) => this.countDepartments = data);
    this.service.getTotalUsers().subscribe((data) => this.countUsers = data);
  }

}

import { Component, OnInit } from '@angular/core';
import { DepartmentResponse } from 'src/app/models/responses/department.response';
import { DepartmentService } from './services/department.service';
import { Paged } from 'src/app/models/utils/paged.model';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: DepartmentResponse[] = [];

  constructor(protected service: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.service.getDepartments()
      .subscribe((data: Paged<DepartmentResponse>) => {
        this.departments = data.entities;
      });
  }
}

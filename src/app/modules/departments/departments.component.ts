import { Component, OnInit } from '@angular/core';
import { DepartmentResponse } from 'src/app/models/responses/department.response';
import { DepartmentService } from './services/department.service';
import { Paged } from 'src/app/models/utils/paged.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  departments: DepartmentResponse[] = [];

  constructor(protected service: DepartmentService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.service.getDepartments()
      .subscribe((data: Paged<DepartmentResponse>) => {
        this.departments = data.entities;
      });
  }

  
  deleteDepartment(id: number) {
    this.service.deleteDepartment(id)
      .subscribe({
        next: () => {
          this.toastr.success('Department deleted successfully', 'Success', {
            progressBar: true,
            closeButton: true
          });
          this.departments = this.departments.filter(x => x.id !== id);
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.message, 'Error', {
            progressBar: true,
            closeButton: true
          });
        }
      });
  }
}

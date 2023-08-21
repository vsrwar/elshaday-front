import { Component, OnInit } from '@angular/core';
import { LegalPersonResponse } from 'src/app/models/responses/legal-person.response';
import { PhysicalPersonResponse } from 'src/app/models/responses/physical-person.response';
import { DepartmentService } from '../services/department.service';
import { PeopleService } from '../../people/services/people.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentForPhysicalPersonRequest } from 'src/app/models/requests/department-for-physical-person.request';
import { DepartmentForLegalPersonRequest } from 'src/app/models/requests/department-for-legal-person.request';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateDepartmentsComponent implements OnInit {

  availablePhysicalPeople: PhysicalPersonResponse[] | undefined;
  availableLegalPeople: LegalPersonResponse[] | undefined;
  personType: string = 'physical';
  departmentForm: FormGroup;

  constructor(private service: DepartmentService,
    private peopleService: PeopleService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.configureForm();
    this.loadPhysicalPeople();
    this.loadLegalPeople();
  }

  configureForm() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      responsibleId: ['', Validators.required]
    });
  }

  loadPhysicalPeople() {
    this.peopleService.getPhysicalPeopleForDepartments()
      .subscribe((data: PhysicalPersonResponse[]) => {
        this.availablePhysicalPeople = data;
      });
  }

  loadLegalPeople() {
    this.peopleService.getLegalPeopleForDepartments()
      .subscribe((data: LegalPersonResponse[]) => {
        this.availableLegalPeople = data;
      });
  }

  createDepartment() {
    switch (this.personType) {
      case 'physical':
        const physicalRequest: DepartmentForPhysicalPersonRequest = { id: undefined, name: this.departmentForm.value.name, physicalPersonId: this.departmentForm.value.responsibleId }
        this.service.createDepartmentForPhysicalPerson(physicalRequest)
          .subscribe({
            next: () => {
              this.toastr.success('Department created successfully', 'Success', {
                progressBar: true,
                closeButton: true
              });
              this.router.navigate(['/departments']);
            },
            error: (err) => {
              console.log(err);
              this.toastr.error(err.error, 'Error', {
                progressBar: true,
                closeButton: true
              });
            }
          });
        break;
      case 'legal':
        const legalRequest: DepartmentForLegalPersonRequest = { id: undefined, name: this.departmentForm.value.name, legalPersonId: this.departmentForm.value.responsibleId }
        this.service.createDepartmentForLegalPerson(legalRequest)
          .subscribe({
            next: () => {
              this.toastr.success('Department created successfully', 'Success', {
                progressBar: true,
                closeButton: true
              });
              this.router.navigate(['/departments']);
            },
            error: (err) => {
              console.log(err);
              this.toastr.error(err.error, 'Error', {
                progressBar: true,
                closeButton: true
              });
            }
          });
        break;
      default:
        break;
    }
  }
}

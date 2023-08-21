import { Component, OnInit } from '@angular/core';
import { LegalPersonResponse } from 'src/app/models/responses/legal-person.response';
import { PhysicalPersonResponse } from 'src/app/models/responses/physical-person.response';
import { PeopleService } from './services/people.service';
import { Paged } from 'src/app/models/utils/paged.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  
  physicalPeople: PhysicalPersonResponse[] = [];
  legalPeople: LegalPersonResponse[] = [];

  constructor(private service: PeopleService,
    private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.loadPhysicalPeople();
    this.loadLegalPeople();
  }

  loadPhysicalPeople() {
    this.service.getPhysicalPeople()
      .subscribe((data: Paged<PhysicalPersonResponse>) => {
        this.physicalPeople = data.entities;
      });
  }

  deletePhysicalPerson(id: number) {
    this.service.deletePhysicalPerson(id)
      .subscribe(() => {
        this.physicalPeople = this.physicalPeople.filter(u => u.id != id);

        this.toastr.success('User successfully deleted!', 'Deleted', {
          progressBar: true,
          closeButton: true
        });
      });
  }

  loadLegalPeople() {
    this.service.getLegalPeople()
      .subscribe((data: Paged<LegalPersonResponse>) => {
        this.legalPeople = data.entities;
      });
  }

  deleteLegalPerson(id: number) {
    this.service.deleteLegalPerson(id)
    .subscribe(() => {
      this.legalPeople = this.legalPeople.filter(u => u.id != id);

      this.toastr.success('User successfully deleted!', 'Deleted', {
        progressBar: true,
        closeButton: true
      });
    });
  }

}

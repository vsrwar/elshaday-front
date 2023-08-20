import { Component, OnInit } from '@angular/core';
import { LegalPersonResponse } from 'src/app/models/responses/legal-person.response';
import { PhysicalPersonResponse } from 'src/app/models/responses/physical-person.response';
import { PeopleService } from './services/people.service';
import { Paged } from 'src/app/models/utils/paged.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  
  physicalPeople: PhysicalPersonResponse[] = [];
  legalPeople: LegalPersonResponse[] = [];

  constructor(protected service: PeopleService) { }
  
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

  loadLegalPeople() {
    this.service.getLegalPeople()
      .subscribe((data: Paged<LegalPersonResponse>) => {
        this.legalPeople = data.entities;
      });
  }

}

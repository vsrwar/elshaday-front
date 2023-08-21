import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonType } from 'src/app/models/enums/person-type.enum';
import { PeopleService } from '../services/people.service';
import { PhysicalPersonResponse } from 'src/app/models/responses/physical-person.response';
import { LegalPersonResponse } from 'src/app/models/responses/legal-person.response';
import { AddressRequest } from 'src/app/models/requests/address.request';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhysicalPersonRequest } from 'src/app/models/requests/physical-person.request';
import { LegalPersonRequest } from 'src/app/models/requests/legal-person.request';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPersonComponent implements OnInit {

  personId: number;
  personType: PersonType;
  person_type: string;
  viaCepAddress: AddressRequest;
  updateLegalPersonForm: FormGroup;
  updatePhysicalPersonForm: FormGroup;
  person: PhysicalPersonResponse | LegalPersonResponse;

  constructor(private route: ActivatedRoute,
    private service: PeopleService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.personId = parseInt(this.route.snapshot.paramMap.get('personId') ?? "0");
    this.personType = parseInt(this.route.snapshot.paramMap.get('personType') ?? "0");

    switch (this.personType) {
      case 1:
        this.configurePhysicalPersonForm();
        this.loadPhysicalPerson();
        this.person_type = "physical";
        break;
      case 2:
        this.configureLegalPersonForm();
        this.loadLegalPerson();
        this.person_type = "legal";
        break;
      default:
        break;
    }
  }

  configurePhysicalPersonForm() {
    this.updatePhysicalPersonForm = this.fb.group({
      name: ['', Validators.required],
      nickName: [''],
      cpf: ['', Validators.required],
      qualifier: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      numero: ['', Validators.required],
    });

    this.updatePhysicalPersonForm.controls['rua'].disable();
    this.updatePhysicalPersonForm.controls['bairro'].disable();
    this.updatePhysicalPersonForm.controls['localidade'].disable();
    this.updatePhysicalPersonForm.controls['uf'].disable();
  }

  loadPhysicalPerson() {
    this.service.getPhysicalPerson(this.personId)
      .subscribe((data: PhysicalPersonResponse) => {
        this.updatePhysicalPersonForm.controls['name'].setValue(data.name);
        this.updatePhysicalPersonForm.controls['nickName'].setValue(data.nickName);
        this.updatePhysicalPersonForm.controls['cpf'].setValue(data.cpf.value);
        this.updatePhysicalPersonForm.controls['qualifier'].setValue(data.qualifier);
        this.updatePhysicalPersonForm.controls['cep'].setValue(data.address.cep);
        this.updatePhysicalPersonForm.controls['rua'].setValue(data.address.logradouro);
        this.updatePhysicalPersonForm.controls['complemento'].setValue(data.address.complemento);
        this.updatePhysicalPersonForm.controls['bairro'].setValue(data.address.bairro);
        this.updatePhysicalPersonForm.controls['localidade'].setValue(data.address.localidade);
        this.updatePhysicalPersonForm.controls['uf'].setValue(data.address.uf);
        this.updatePhysicalPersonForm.controls['numero'].setValue(data.address.numero);
        this.person = data;
      });
  }

  updatePhysicalPerson() {
    const form = this.updatePhysicalPersonForm?.value;
    const request: PhysicalPersonRequest = {
      id: this.personId,
      name: form.name,
      nickName: form.nickName,
      cpf: form.cpf,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress ?? this.person.address
    };

    if(request.address) {
      request.address.numero = form.numero;
      request.address.complemento = form.complemento;
    }

    this.service.updatePhysicalPerson(request)
      .subscribe({
        next: () => {
          this.toastr.success(`${request.name} updated successfully`, 'Success', {
            progressBar: true,
            closeButton: true
          });
          this.router.navigate(['/people']);
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

  configureLegalPersonForm() {
    this.updateLegalPersonForm = this.fb.group({
      corporateName: ['', Validators.required],
      fantasyName: [''],
      cnpj: ['', Validators.required],
      qualifier: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      numero: ['', Validators.required],
    });

    this.updateLegalPersonForm.controls['rua'].disable();
    this.updateLegalPersonForm.controls['bairro'].disable();
    this.updateLegalPersonForm.controls['localidade'].disable();
    this.updateLegalPersonForm.controls['uf'].disable();
  }

  loadLegalPerson() {
    this.service.getLegalPerson(this.personId)
      .subscribe((data: LegalPersonResponse) => {
        this.updateLegalPersonForm.controls['corporateName'].setValue(data.corporateName);
        this.updateLegalPersonForm.controls['fantasyName'].setValue(data.fantasyName);
        this.updateLegalPersonForm.controls['cnpj'].setValue(data.cnpj.value);
        this.updateLegalPersonForm.controls['qualifier'].setValue(data.qualifier);
        this.updateLegalPersonForm.controls['cep'].setValue(data.address.cep);
        this.updateLegalPersonForm.controls['rua'].setValue(data.address.logradouro);
        this.updateLegalPersonForm.controls['complemento'].setValue(data.address.complemento);
        this.updateLegalPersonForm.controls['bairro'].setValue(data.address.bairro);
        this.updateLegalPersonForm.controls['localidade'].setValue(data.address.localidade);
        this.updateLegalPersonForm.controls['uf'].setValue(data.address.uf);
        this.updateLegalPersonForm.controls['numero'].setValue(data.address.numero);

        this.person = data;
      });
  }

  updateLegalPerson() {
    const form = this.updateLegalPersonForm?.value;
    const request: LegalPersonRequest = {
      id: this.personId,
      corporateName: form.corporateName,
      fantasyName: form.fantasyName,
      cnpj: form.cnpj,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress ?? this.person.address
    };

    if(request.address) {
      request.address.numero = form.numero;
      request.address.complemento = form.complemento;
    }

    this.service.updateLegalPerson(request)
      .subscribe({
        next: () => {
          this.toastr.success(`${request.corporateName} updated successfully`, 'Success', {
            progressBar: true,
            closeButton: true
          });
          this.router.navigate(['/people']);
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

  cepChanged(event: any, ) {
    let cep = event.target.value;

    if(cep.length == 8){
      this.service.getAddressesByCep(cep)
        .subscribe({
          next: (address) => {
            if(this.person_type == 'legal'){
              this.updateLegalPersonForm.controls['rua'].setValue(address.logradouro);
              this.updateLegalPersonForm.controls['bairro'].setValue(address.bairro);
              this.updateLegalPersonForm.controls['localidade'].setValue(address.localidade);
              this.updateLegalPersonForm.controls['uf'].setValue(address.uf);
            } else {
              this.updatePhysicalPersonForm.controls['rua'].setValue(address.logradouro);
              this.updatePhysicalPersonForm.controls['bairro'].setValue(address.bairro);
              this.updatePhysicalPersonForm.controls['localidade'].setValue(address.localidade);
              this.updatePhysicalPersonForm.controls['uf'].setValue(address.uf);
            }

            this.viaCepAddress = address;
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
}

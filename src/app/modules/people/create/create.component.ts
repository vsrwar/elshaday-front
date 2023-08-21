import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegalPersonRequest } from 'src/app/models/requests/legal-person.request';
import { PeopleService } from '../services/people.service';
import { ToastrService } from 'ngx-toastr';
import { AddressRequest } from 'src/app/models/requests/address.request';
import { Router } from '@angular/router';
import { PhysicalPersonRequest } from 'src/app/models/requests/physical-person.request';

@Component({
  selector: 'app-create-person',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePersonComponent implements OnInit {

  person_type: string = 'legal';
  createLegalPersonForm: FormGroup;
  createPhysicalPersonForm: FormGroup;
  viaCepAddress: AddressRequest;

  constructor(private fb: FormBuilder,
    private service: PeopleService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.configureLegalPersonForm();
    this.configurePhysicalPersonForm();
  }

  personTypeChanged(event: any) {
    this.person_type = event.target.value;
  }

  configureLegalPersonForm() {
    this.createLegalPersonForm = this.fb.group({
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

    this.createLegalPersonForm.controls['rua'].disable();
    this.createLegalPersonForm.controls['bairro'].disable();
    this.createLegalPersonForm.controls['localidade'].disable();
    this.createLegalPersonForm.controls['uf'].disable();
  }

  createLegalPerson() {
    const form = this.createLegalPersonForm?.value;
    const request: LegalPersonRequest = {
      id: undefined,
      corporateName: form.corporateName,
      fantasyName: form.fantasyName,
      cnpj: form.cnpj,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.createLegalPerson(request)
      .subscribe({
        next: () => {
          this.toastr.success('Legal person created successfully', 'Success', {
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

  configurePhysicalPersonForm() {
    this.createPhysicalPersonForm = this.fb.group({
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

    this.createPhysicalPersonForm.controls['rua'].disable();
    this.createPhysicalPersonForm.controls['bairro'].disable();
    this.createPhysicalPersonForm.controls['localidade'].disable();
    this.createPhysicalPersonForm.controls['uf'].disable();
  }

  createPhysicalPerson() {
    const form = this.createPhysicalPersonForm?.value;
    const request: PhysicalPersonRequest = {
      id: undefined,
      name: form.name,
      nickName: form.nickName,
      cpf: form.cpf,
      qualifier: parseInt(form.qualifier),
      address: this.viaCepAddress
    };

    request.address.numero = form.numero;
    request.address.complemento = form.complemento;

    this.service.createPhysicalPerson(request)
      .subscribe({
        next: () => {
          this.toastr.success('Physical person created successfully', 'Success', {
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
              this.createLegalPersonForm.controls['rua'].setValue(address.logradouro);
              this.createLegalPersonForm.controls['bairro'].setValue(address.bairro);
              this.createLegalPersonForm.controls['localidade'].setValue(address.localidade);
              this.createLegalPersonForm.controls['uf'].setValue(address.uf);
            } else {
              this.createPhysicalPersonForm.controls['rua'].setValue(address.logradouro);
              this.createPhysicalPersonForm.controls['bairro'].setValue(address.bairro);
              this.createPhysicalPersonForm.controls['localidade'].setValue(address.localidade);
              this.createPhysicalPersonForm.controls['uf'].setValue(address.uf);
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

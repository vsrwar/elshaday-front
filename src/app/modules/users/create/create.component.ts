import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/app/models/requests/user.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  user: UserRequest;

  constructor(protected service: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.createUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  createUser(){
    if(this.createUserForm?.valid) {
      this.user = Object.assign({}, this.user, this.createUserForm?.value);
      this.user.role = parseInt(this.user.role.toString());
      this.service.createUser(this.user)
        .subscribe({
          next: () => {
            this.toastr.success('User successfully created!', 'Created', {
              progressBar: true,
              closeButton: true
            });
            this.router.navigate(['/users']);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.error, 'Error', {
              progressBar: true,
              closeButton: true
            });
          }
        });
    }
  }
}

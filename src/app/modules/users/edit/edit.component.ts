import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/responses/user.response';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserEditRequest } from 'src/app/models/requests/user.edit.request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: number;
  editUserForm: FormGroup;
  user: UserResponse | undefined;
  request: UserEditRequest;

  constructor(private service: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId') ?? "0");
    this.configureForm();
    this.loadUser();
  }

  configureForm() {
    this.editUserForm = this.fb.group({
      email: [''],
      nickName: [''],
      role: [''],
      active: ['']
    });
  }

  loadUser() {
    this.service.getUser(this.userId)
      .pipe(first())
      .subscribe((data: UserResponse) => {
        this.editUserForm.patchValue(data);
        this.user = data;
      });
  }

  editUser() {
    this.editUserForm.value.role = parseInt(this.editUserForm.value.role.toString());
    this.request = Object.assign({}, this.request, this.editUserForm?.value);
    this.request.id = this.userId;
    
    this.service
      .updateUser(this.request)
      .subscribe({
        next: () => {
          this.toastr.success('User successfully updated!', 'Update', {
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

import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { UserResponse } from 'src/app/models/responses/user.response';
import { Paged } from 'src/app/models/utils/paged.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserResponse[] = [];

  constructor(private service: UsersService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getUsers()
      .subscribe((data: Paged<UserResponse>) => {
        this.users = data.entities;
      });
  }

  delete(id: number) {
    this.service.deleteUser(id)
      .subscribe(() => {
        this.users = this.users.filter(u => u.id != id);

        this.toastr.success('User successfully deleted!', 'Deleted', {
          progressBar: true,
          closeButton: true
        });
      });
  }

  toggleActive(user: UserResponse) {
    if(user.active) {
      this.service.deactivateUser(user.id)
        .subscribe(() => {
          this.toastr.success(`User ${user.nickName} successfully deactivated!`, 'Deactivated', {
            progressBar: true,
            closeButton: true
          });
          
          this.users.filter(u => u.id == user.id)[0].active = false;
        });
    } else {
      this.service.activateUser(user.id)
        .subscribe(() => {
          this.toastr.success(`User ${user.nickName} successfully activated!`, 'Activated', {
            progressBar: true,
            closeButton: true
          });
          
          this.users.filter(u => u.id == user.id)[0].active = true;
        });
    }
  }
}

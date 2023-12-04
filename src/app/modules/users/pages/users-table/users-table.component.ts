import { Component, OnInit } from '@angular/core';

import { GenericDataSource } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { IUser } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  dataSource = new GenericDataSource();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: IUser | null = null;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.init(users);
    });
  }
}

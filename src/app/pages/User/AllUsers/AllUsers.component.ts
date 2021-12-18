import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModule } from '../../../Model/UserModule';

@Component({
  selector: 'app-AllUsers',
  templateUrl: './AllUsers.component.html',
  styleUrls: ['./AllUsers.component.css']
})

export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'uName', 'uEmail', 'gender'];
  dataSource = new MatTableDataSource<UserModule>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  listOfUser: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) {
    // Assign the data to the data source for the table to render
    this.loadDataFromServer();
  }

  loadDataFromServer(): void {
    this.userService.allUsers().subscribe(data => {
      this.listOfUser = data;
      this.dataSource = new MatTableDataSource(this.listOfUser);
      this.dataSource.paginator = this.paginator!;
      this.dataSource.sort = this.sort!;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {

  }

}

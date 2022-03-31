import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/allservices/auth.service';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { Employeereaddto } from 'src/app/interfaces/employeereaddto';
import { DialogEmployeeComponent } from '../dialog-employee/dialog-employee.component';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private empService : AuthService, private dialog : MatDialog, private router : Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName!='Admin'){
      this.router.navigate(['/user-panel'])
    }

    this.readUsers();

  }

  displayedColumns: string[] = ['fio', 'username', 'id'];
  dataSource = new MatTableDataSource<Employeereaddto>(this.myUsers)

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  myUsers? : Employeereaddto[] = [];

  btnDelete_click(id : string) : void{
    this.empService.deleteUser(id).subscribe(
      emp => {
        this.dataSource = new MatTableDataSource<Employeereaddto>(this.myUsers)
        this.readUsers();
      },
      error => {
        console.log(error);
      }
    )
  }


  readUsers() : void{
    this.empService.getAllUsersForAdmin().subscribe(
      emp => {
        this.myUsers = emp;
        this.dataSource = new MatTableDataSource<Employeereaddto>(this.myUsers)
      },
      error => {
        console.log(error);
      }
    )
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  btnAddEmployee()
  {
    let dialogRef = this.dialog.open(DialogEmployeeComponent, {
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readUsers();
    })

  }
}

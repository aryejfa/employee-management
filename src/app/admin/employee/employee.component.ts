import { Component, OnInit } from '@angular/core';
import { trigger, query, transition, animate, style, stagger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter',
          [style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger('300ms', animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true }
        )
      ])
    ])
  ]
})

export class EmployeeComponent implements OnInit {
  title: any;
  isOpen: boolean = true;

  employeesResult: any = {};

  dtOptions: any = {};


  constructor(
    public dialog: MatDialog,
    public router: Router
  ) {
    this.getEmployees();
  }

  getEmployees() {
    let employees: any = localStorage.getItem('employees');
    this.employeesResult = JSON.parse(employees);
  }

  ngOnInit(): void {
    this.title = 'Employee';
    setTimeout(() => {
      this.toggleData();
    }, 1000)
  }

  toggleData() { }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addEditEmployee(data: any, username: any) {
    let dialog = this.dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {

        if (username == undefined) {
          let employees: any = localStorage.getItem('employees');
          let resData = JSON.parse(employees);
          resData.push(res);
          localStorage.setItem('employees', JSON.stringify(resData));

          this.reloadCurrentRoute();
        } else {
          let employees: any = localStorage.getItem('employees');
          let resData = JSON.parse(employees);

          for (let i = 0; i < resData.length; i++) {
            if (resData[i].username == res.username) {
              resData[i].status = res.status;
              resData[i].lastName = res.lastName;
              resData[i].group = res.group;
              resData[i].firstName = res.firstName;
              resData[i].email = res.email;
              resData[i].description = res.description;
              resData[i].birthDate = res.birthDate;
              resData[i].basicSalary = res.basicSalary;
            }
          }
          localStorage.setItem('employees', JSON.stringify(resData));
        }

      }
    })
  }

  detailEmployee(data: any) {
    let dialog = this.dialog.open(EmployeeDetailComponent, {
      width: '600px',
      data: data
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
      }
    })
  }

  deleteEmployee(username: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
      {
        showCloseButton: true,
        title: 'Delete',
        text: 'Are you sure delete?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: false
      }
    ).then((result) => {
      if (result.value) {
        let employees: any = localStorage.getItem('employees');
        let resData = JSON.parse(employees);

        for (let i = 0; i < resData.length; i++) {
          if (resData[i].username == username) {
            resData.splice(i, 1);
          }
        }
        localStorage.setItem('employees', JSON.stringify(resData));

        this.reloadCurrentRoute();
        return;
      }
    });
  }

}
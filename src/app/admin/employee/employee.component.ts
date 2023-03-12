import { Component, OnInit } from '@angular/core';
import { trigger, query, transition, animate, style, stagger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
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
    this.title = 'Employee List';
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

  editEmployee(username: any) {
    this.router.navigate(['admin/employee/edit', username]);
  }

  addFormEmployee() {
    this.router.navigate(['admin/employee/add']);
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
        confirmButton: 'btn btn-primary',
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

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          icon: 'error',
          timer: 3000,
          title: 'delete successfully'
        })
        return;
      }
    });
  }


  formatRupiah(number: any) {
    let str = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
    return str.replace("Rp", "Rp.");
  }

}
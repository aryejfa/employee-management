import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, query, group, transition, animate, style } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave',
          style({ position: 'fixed', width: '100%' })
        ),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out',
              style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out',
              style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ]),
    ])
  ]
})

export class AdminComponent implements OnInit {
  mode: string = 'side';
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    let checkToken = localStorage.getItem('appToken');
    if (checkToken != '123456789') {
      this.router.navigate(['/login']);
    }
  }

  logout() {
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
        title: 'Logout',
        text: 'Are you sure logout?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: false
      }
    ).then((result) => {
      if (result.value) {
        localStorage.removeItem('appToken');
        this.router.navigate(['/login']);
        return;
      }
    });
  }

  menu = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      url: '/admin/dashboard'
    },
    {
      name: 'Employee',
      icon: 'lan ',
      url: '/admin/employee'
    }
  ];

}
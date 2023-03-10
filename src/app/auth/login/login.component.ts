import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  hide: boolean = true;
  constructor(
    public router: Router
  ) { }
  ngOnInit(): void {
  }
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading: boolean = false;
  login(user: any) {
    this.loading = true;
    if (user.username == 'aryejfa@gmail.com' && user.password == '123456') {
      this.loading = false;
      localStorage.setItem('appToken', '123456789');
      this.router.navigate(['admin/dashboard']);
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'success',
        timer: 3000,
        title: 'login successfully'
      })
    } else {
      if (user.username == undefined || user.password == undefined) {
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          icon: 'warning',
          timer: 3000,
          title: 'username or password is required'
        })
      } else {
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          icon: 'error',
          timer: 3000,
          title: 'username or password not match'
        })
      }
      this.router.navigate(['login']);
    }
  }

}

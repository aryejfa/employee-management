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
  //inisial untuk data formulir
  user: any = {};
  hide: boolean = true;
  //constructor
  constructor(
    public router: Router
  ) { }
  //fungsi inisial, dijalankan ketika class ini dipanggil
  ngOnInit(): void {
  }
  //form validation
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  //register
  loading: boolean = false;
  login(user: any) {
    this.loading = true;
    if (user.email == 'aryejfa@gmail.com' && user.password == '123456') {
      this.loading = false;
      localStorage.setItem('appToken', '123456789');
      this.router.navigate(['admin/dashboard']);
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: 'success',
        timer: 3000,
        title: 'Login success'
      })
    } else {
      if (user.email == undefined || user.password == undefined) {
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'warning',
          timer: 3000,
          title: 'Username or password is required'
        })
      } else {
        this.loading = false;
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'error',
          timer: 3000,
          title: 'Username or password not match'
        })
      }
      this.router.navigate(['login']);
    }
  }

}

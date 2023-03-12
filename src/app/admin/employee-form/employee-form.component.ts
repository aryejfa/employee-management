import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {

  private sub: any;
  statusForm: boolean = false;

  username: any;
  firstName: any;
  lastName: any;
  email: any;
  birthDate: any;
  basicSalary: any;
  status: any;
  group: any;
  description: any;
  selected: any;
  data: any = {};

  todayDate: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.username = params['username'];

      if (this.username == undefined) {
        this.statusForm = true;
      } else {
        this.statusForm = false;
      }

      let employees: any = localStorage.getItem('employees');
      let resData = JSON.parse(employees);

      for (let i = 0; i < resData.length; i++) {
        if (resData[i].username == this.username) {
          this.firstName = resData[i].firstName;
          this.lastName = resData[i].lastName;
          this.email = resData[i].email;
          this.birthDate = resData[i].birthDate;
          this.basicSalary = resData[i].basicSalary;
          this.status = resData[i].status;
          this.group = resData[i].group;
          this.description = resData[i].description;
          this.selected = resData[i].group;

          let dt = {
            username: resData[i].username,
            firstName: resData[i].firstName,
            lastName: resData[i].lastName,
            email: resData[i].email,
            birthDate: resData[i].birthDate,
            basicSalary: resData[i].basicSalary,
            status: resData[i].status,
            group: resData[i].group,
            description: resData[i].description,
          }
          this.data = dt;

        }

      }



    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  editData(data: any) {
    let usernameStat = false;
    let firstNameStat = false;
    let lastNameStat = false;
    let emailStat = false;
    let birthDateStat = false;
    let basicSalaryStat = false;
    let statusStat = false;
    let groupStat = false;
    let descriptionStat = false;

    let ket1 = '';
    let ket2 = '';
    let ket3 = '';
    let ket4 = '';
    let ket5 = '';
    let ket6 = '';
    let ket7 = '';
    let ket8 = '';
    let ket9 = '';
    let ket10 = '';

    if (data.username == '') {
      usernameStat = true;
      ket1 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Username is required</div> <br>`;
    }
    if (data.firstName == '') {
      firstNameStat = true;
      ket2 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>First Name is required</div> <br>`;
    }
    if (data.lastName == '') {
      lastNameStat = true;
      ket3 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Last Name is required</div> <br>`;
    }
    if (data.email == '') {
      emailStat = true;
      ket4 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Email is required</div> <br>`;
    } else {
      emailStat = false;
    }
    if (data.birthDate == null) {
      birthDateStat = true;
      ket5 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Birth Date is required</div> <br>`;
    }
    if (data.basicSalary == null) {
      basicSalaryStat = true;
      ket6 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Basic Salary is required</div> <br>`;
    }
    if (data.status == '') {
      statusStat = true;
      ket7 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Status is required</div> <br>`;
    }
    if (data.group == undefined) {
      groupStat = true;
      ket8 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Group is required</div> <br>`;
    }
    if (data.description == null) {
      descriptionStat = true;
      ket9 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Description is required</div> <br>`;
    }
    let checkEmail = this.validateEmail(data.email);

    if (!checkEmail) {
      ket10 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Format email is wrong</div> <br>`;
    }

    if (usernameStat || firstNameStat || lastNameStat ||
      emailStat || birthDateStat || basicSalaryStat || statusStat ||
      groupStat || descriptionStat || !checkEmail
    ) {
      let alertNotif = `${ket1} ${ket2} ${ket3} ${ket4} ${ket5} ${ket6} ${ket7} ${ket8} ${ket9} ${ket10}`;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-warning'
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons.fire(
        {
          showConfirmButton: false,
          showCloseButton: true,
          title: 'Alert',
          icon: 'warning',
          html: alertNotif,
          showCancelButton: false,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: false
        }
      ).then((result) => {
        if (result.value) {
          return;
        }
      });
    } else {
      let employees: any = localStorage.getItem('employees');
      let resData = JSON.parse(employees);

      for (let i = 0; i < resData.length; i++) {
        if (resData[i].username == data.username) {
          resData[i].status = data.status;
          resData[i].lastName = data.lastName;
          resData[i].group = data.group;
          resData[i].firstName = data.firstName;
          resData[i].email = data.email;
          resData[i].description = data.description;
          resData[i].birthDate = data.birthDate;
          resData[i].basicSalary = data.basicSalary;
        }
      }
      localStorage.setItem('employees', JSON.stringify(resData));
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'warning',
        timer: 3000,
        title: 'update successfully'
      })
      this.router.navigate(['admin/employee']);
    }

  }

  saveData(data: any) {
    let usernameStat = false;
    let firstNameStat = false;
    let lastNameStat = false;
    let emailStat = false;
    let birthDateStat = false;
    let basicSalaryStat = false;
    let statusStat = false;
    let groupStat = false;
    let descriptionStat = false;

    let ket1 = '';
    let ket2 = '';
    let ket3 = '';
    let ket4 = '';
    let ket5 = '';
    let ket6 = '';
    let ket7 = '';
    let ket8 = '';
    let ket9 = '';
    let ket10 = '';

    if (data.username == undefined) {
      usernameStat = true;
      ket1 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Username is required</div> <br>`;
    }
    if (data.firstName == undefined) {
      firstNameStat = true;
      ket2 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>First Name is required</div> <br>`;
    }
    if (data.lastName == undefined) {
      lastNameStat = true;
      ket3 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Last Name is required</div> <br>`;
    }
    if (data.email == undefined) {
      emailStat = true;
      ket4 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Email is required</div> <br>`;
    }
    if (data.birthDate == undefined) {
      birthDateStat = true;
      ket5 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Birth Date is required</div> <br>`;
    }
    if (data.basicSalary == undefined) {
      basicSalaryStat = true;
      ket6 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Basic Salary is required</div> <br>`;
    }
    if (data.status == undefined) {
      statusStat = true;
      ket7 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Status is required</div> <br>`;
    }
    if (data.group == undefined) {
      groupStat = true;
      ket8 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Group is required</div> <br>`;
    }
    if (data.description == undefined) {
      descriptionStat = true;
      ket9 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Description is required</div> <br>`;
    }
    let checkEmail = this.validateEmail(data.email);

    if (!checkEmail) {
      ket10 = `<div style='margin-top: -2px !important;margin-bottom:-5px !important;color:red;'>Format email is wrong</div> <br>`;
    }

    if (usernameStat || firstNameStat || lastNameStat ||
      emailStat || birthDateStat || basicSalaryStat || statusStat ||
      groupStat || descriptionStat || !checkEmail
    ) {
      let alertNotif = `${ket1} ${ket2} ${ket3} ${ket4} ${ket5} ${ket6} ${ket7} ${ket8} ${ket9} ${ket10}`;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-warning'
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons.fire(
        {
          showConfirmButton: false,
          showCloseButton: true,
          title: 'Alert',
          icon: 'warning',
          html: alertNotif,
          showCancelButton: false,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: false
        }
      ).then((result) => {
        if (result.value) {
          return;
        }
      });
    } else {
      let employees: any = localStorage.getItem('employees');
      let resData = JSON.parse(employees);
      resData.push(data);
      localStorage.setItem('employees', JSON.stringify(resData));

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        icon: 'success',
        timer: 3000,
        title: 'insert successfully'
      })
      this.router.navigate(['admin/employee']);
    }
  }

  back() {
    this.router.navigate(['admin/employee']);
  }

  dtGroup: string[] = [
    'SQL', 'NO SQL', 'JAVA', 'PHP', 'ANGULAR', 'VUE JS', 'REACT JS', 'DOT NET', 'SCALA', 'GOLANG'
  ];

  selectedGroup = this.dtGroup;

  onKey(value: string) {
    this.selectedGroup = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.dtGroup.filter(option => option.toLowerCase().startsWith(filter));
  }

  validateEmail(mail: any) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
}

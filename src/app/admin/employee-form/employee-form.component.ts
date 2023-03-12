import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  saveData(data: any) {
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
}

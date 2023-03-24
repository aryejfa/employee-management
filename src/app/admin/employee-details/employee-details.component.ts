import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatRupiah } from 'src/app/utilities/utilities';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})

export class EmployeeDetailsComponent {

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

  rupiahNumber: any = formatRupiah;

  constructor(
    private route: ActivatedRoute,
    private location: Location
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

  back() {
    this.location.back();
  }
}

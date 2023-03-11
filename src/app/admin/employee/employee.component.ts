import { Component, OnInit } from '@angular/core';
import { trigger, query, group, transition, animate, style, stagger } from '@angular/animations';
import EmployeesJson from '../../data/data.json';

interface Employees {
  username: String;
  firstName: String;
  lastName: String;
  email: String;
  birthDate: String;
  basicSalary: any;
  status: String;
  group: String;
  description: String;
}

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

  employeesResult: Employees[] = EmployeesJson.data;
  constructor() { }

  ngOnInit(): void {
    this.title = 'Employee';
    setTimeout(() => {
      this.toggleData();
    }, 1000)
  }

  toggleData() {
  }

}
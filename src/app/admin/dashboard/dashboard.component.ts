import { Component, OnInit } from '@angular/core';
import { trigger, query, transition, animate, style, stagger } from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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

export class DashboardComponent implements OnInit {
  title: any;
  isOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Dashboard';
    setTimeout(() => {
      this.toggleData();
    }, 1000)
  }
  toggleData() {
  }

}
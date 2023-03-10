import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations: [
    trigger('myAnimation', [
      state(
        'open',
        style(
          {
            backgroundColor: 'red',
            transform: 'scale(1,1)'
          }
        )
      ),
      state('close', style(
        {
          backgroundColor: 'red',
          transform: 'scale(0.5,0.5)'
        }
      )),
      transition('open => close', [
        animate('0.5s')
      ]),
      transition('close => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class AnimationComponent implements OnInit {
  isOpen: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }
}

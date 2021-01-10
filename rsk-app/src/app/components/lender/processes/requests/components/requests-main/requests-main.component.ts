import {Component, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-requests-main',
  templateUrl: './requests-main.component.html',
  styleUrls: ['./requests-main.component.css']
})
export class RequestsMainComponent implements OnInit {
  progressIncre = 0;
  completeIncre = 0;

  constructor() { }

  ngOnInit(): void {
  }

  changeTab($event: MatTabChangeEvent) {
    if ($event.index === 0) {
      this.progressIncre++;
    } else if ($event.index === 1) {
      this.completeIncre++;
    }
  }
}

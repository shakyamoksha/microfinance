import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../../service/auth/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthenticateService) { }

  ngOnInit(): void {
  }

  buttonClick() {
    // this.service.testCors().subscribe(data => {
    //   console.log(data);
      // console.log(JSON.parse(data));
    // });
  }

}

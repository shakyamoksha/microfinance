import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../service/application.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private toastr: ToastrService, private service: ApplicationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params[('id')];
    console.log(id);
    // this.service
  }

}

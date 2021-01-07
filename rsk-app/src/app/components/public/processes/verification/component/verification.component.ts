import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../../register/service/register.service';
import {User} from '../../../../../shared/schemas/user';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  message: string;
  status: number;

  constructor(private route: ActivatedRoute, private service: RegistrationService) { }

  ngOnInit() {
    this.verification(this.route.snapshot.params[('user')], this.route.snapshot.params[('token')]);
  }

  verification(username: string, toKen: string) {
    const data: User = {userName: username, token: toKen};
    this.service.verifyUser(data).subscribe(response => {
      const status = response[`status`];
      this.status = response[`status`];
      this.message = response[`message`];

      if (status === '200') {
        console.log(response[`message`]);

      } else if (status === '201') {
        console.log(response[`message`]);

      } else if (status === '404') {
        console.log(response[`message`]);

      }

    });
  }

}

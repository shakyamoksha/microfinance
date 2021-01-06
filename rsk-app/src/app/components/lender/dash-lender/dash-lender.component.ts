import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthenticateService} from '../../../service/auth/auth-service';

@Component({
  selector: 'app-dash-lender',
  templateUrl: './dash-lender.component.html',
  styleUrls: ['./dash-lender.component.css']
})
export class DashLenderComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(private breakpointObserver: BreakpointObserver, private authenticateService: AuthenticateService) {}

}

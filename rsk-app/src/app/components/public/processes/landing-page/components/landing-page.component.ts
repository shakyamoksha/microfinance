import { Component, OnInit } from '@angular/core';
import {LandingPageService} from '../service/landing-page.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  productDetails = [];
  constructor(private service: LandingPageService, private router: Router) { }

  ngOnInit(): void {
    this.service.getPublicProducts().subscribe(data => {this.productDetails = data; });
  }

  navigateToRegistration() {
    this.router.navigate(['register']);
  }
}

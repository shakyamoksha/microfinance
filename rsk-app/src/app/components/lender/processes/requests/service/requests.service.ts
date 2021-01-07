import { Injectable } from '@angular/core';
import {HttpService} from "../../../../../service/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private service: HttpService) { }

  
}

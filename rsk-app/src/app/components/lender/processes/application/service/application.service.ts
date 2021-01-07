import { Injectable } from '@angular/core';
import {HttpServiceAdmin} from '../../../../../service/http/http.service.admin';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private service: HttpServiceAdmin) { }
}

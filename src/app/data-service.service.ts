import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  private formDataSource = new BehaviorSubject<any>(null);
  currentFormData = this.formDataSource.asObservable();

  setFormData(data : any)
  {
    this.formDataSource.next(data);
  }
}

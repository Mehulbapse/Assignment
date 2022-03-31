import { Injectable } from '@angular/core';
import { UrlConfig } from '../url.config';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = UrlConfig.registerFormUrl

  constructor(
    private dataService: DataService
  ) { }

  getProfile = (id) => {
    const url = this.url + '/' + id;
    return this.dataService.get(url)
  }
}

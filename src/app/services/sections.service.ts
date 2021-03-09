import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Section} from '../sections/section';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  baseApi = 'http://localhost:4000/';
  // baseApi = 'https://localhost:44300/api/';
  result: any;

  constructor(private http: HttpClient) { }

  getItems(id: number) {
    return this.http.get(this.baseApi + 'section/' + id);
  }
  getSections() {
    return this.http.get<Section[]>(this.baseApi + 'sections/');
  }

  getSingleItem(secID, itemID) {
    return this.http.get(this.baseApi + 'section/' + secID + '/' + itemID);
  }


  postContactData(value: any) {
    return this.http.post(this.baseApi + 'contact', value);
  }

  getAllTechStack() {
    return this.http.get(this.baseApi + 'section/tech');
  }

  getAllSectionsName() {
    return this.http.get<[]>(this.baseApi + 'all/section/name');
  }
}

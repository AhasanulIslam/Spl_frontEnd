import { User } from './../../_models/user';
import { Staff } from './../../_models/staff';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = 'https://localhost:44300/api/admin/';
  // private sectionsApi = 'https://localhost:44300/api/sections/';
  private sectionsApi = 'http://localhost:4000/users/register/Stu/';

  private url = 'https://localhost:44300/api/section/';
  // private accountApi = 'https://localhost:44300/api/account/';
  private accountApi = 'http://localhost:4000/Users/authenticate';

  private stuffApi = 'http://localhost:4000/users/staffs/new/user';
  // http://localhost:4000/StuffUser/user/delete/5
  private deleteApi = 'http://localhost:4000/StuffUser/user/delete/';
  private trnasDeApi = 'http://localhost:4000/StuffUser/new/delete/n/';
  private roomsDeApi = 'http://localhost:4000/Room/room/';
  private invensDeApi = 'http://localhost:4000/Users/inventory/';
  private productDeApi = 'http://localhost:4000/StuffProduct/product/';
  private studentApi = 'http://localhost:4000/Student/student/';

  constructor(private http: HttpClient) { }

  studDeOption(id: number) {
    return this.http.get(this.studentApi + id);
  }

  deleteUser(id: number) {
    return this.http.get(this.deleteApi + id);
  }
  trnsDeOption(id: number) {
    return this.http.get(this.trnasDeApi + id);
  }

  roomsDeOption(id: number) {
    return this.http.get(this.roomsDeApi + id);
  }

  productDeOption(id: number) {
    return this.http.get(this.productDeApi + id);
  }

  inventoryDeOption(id: number) {
    return this.http.get(this.invensDeApi + id);
  }

  getData(apiString) {
    return this.http.get(this.api + apiString);
  }

  getAllStuffs() {
    return this.http.get(this.stuffApi).pipe(map((response => response as Staff[])));
  }

  getSectionData(id: number) {
    return this.http.get(this.url + id);
  }
  getSectionDescription(secId) {
    return this.http.get(this.sectionsApi + secId);
  }

  updateSection(id, obj) {
    return this.http.put(this.api + id, obj);
  }

  updateSectionData(id, obj) {
    return this.http.put(this.url + 'update/' + id, obj);
  }

  addData(secID, obj) {
    // return this.http.post(this.api + 'section/add/' + secID, obj);
    return this.http.post(this.url + 'add/' + secID, obj);
  }

  deleteData(id) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  addTech(tech) {
    return this.http.post(this.url + 'tech/add', tech);
  }

  getTech() {
    return this.http.get(this.url + 'tech');
  }


  deleteTechStack(Id: any) {
    return this.http.delete(this.url + 'delete/tech/' + Id);
  }

  getTechStackById(id) {
    return this.http.get(this.url + 'tech/' + id);
  }

  addTool(id, tool) {
    return this.http.post(this.url + 'tech/add/tool/' + id, tool);
  }

  deleteTool(id: any) {
    return this.http.delete(this.url + 'delete/tool/' + id);
  }

  adminLogin(data) {
    // return this.http.post<string>(this.accountApi + 'login', data);data
    return this.http.post<string>(this.accountApi, data).pipe(map((response => response as unknown as User)));
  }

  changePassword(data) {
    return this.http.put<string>(this.accountApi + 'changepassword', data);
  }

  getAllsections() {
    return this.http.get<[]>(this.sectionsApi);
  }

  addSection(section: any) {
    return this.http.post(this.sectionsApi, section);
  }

  updateOrder(sections: any[]) {
    return this.http.put(this.sectionsApi + 'set-order', sections);
  }

  deleteSection(Id) {
    return this.http.delete(this.sectionsApi + Id);
  }
}

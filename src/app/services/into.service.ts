import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { User } from '../_models';
import { Inventory } from '../_models/inventory';

@Injectable({ providedIn: 'root' })
// tslint:disable-next-line:class-name
export class intoservice {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public baseUrl = 'http://localhost:4000/';


    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    invertory(id: number) {
        // console.log( this.http.get<any>(this.baseUrl + 'Product/' + id).pipe(map((response => response as Invent))));
        return this.http.get<any>(this.baseUrl + 'StuffProduct/' + id).pipe(map(response => response as Inventory[]));
   }
}

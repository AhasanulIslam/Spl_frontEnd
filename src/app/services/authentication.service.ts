import { Product } from './../_models/product';
import { Room } from './../_models/room';
import { Transaction } from './../_models/transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { User } from '../_models';
import { Student } from '../_models/student';
import { Inventory } from '../_models/inventory';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(username: string, password: string, email: string, phone: string, access: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/register/Stu`, { username, password, email, phone, access });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    // tslint:disable-next-line:variable-name
    transac(debit: string, credit: string, date: string, accountTitle: string, description: string, staffName: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(`${environment.apiUrl}/StuffTransaction/id`, { debit, credit, date, accountTitle, description, staffName});

    }
    // tslint:disable-next-line:max-line-length
    studentac(registration: string, address: string, bloodGroup: string, dateOfBirth: string, department: string, fatherName: string, firstname: string, hallRoll: string, lastname: string, motherName: string, nationality: string, religion: string, session: string, stuffName: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(`${environment.apiUrl}/Student/id`, { registration, address, bloodGroup, dateOfBirth, department, fatherName, firstname, hallRoll, lastname, motherName, nationality, religion, session, stuffName});

    }
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:max-line-length
    roomAcc(roomNumber: number, capacity: number, building: string, studentPhoneNo: string, admitDate: string, leftDate: string, hallFee: string, feeYear: string, hallRoll: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(`${environment.apiUrl}/Room/id`, { roomNumber, capacity, building, studentPhoneNo, admitDate, leftDate, hallFee, feeYear, hallRoll});

    }
    productAcc(name: string, date: string, rejectedProduct: number, purchaseProduct: number, rate: number, availableProduct: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(`${environment.apiUrl}/StuffProduct/id`, { name, date, rejectedProduct, purchaseProduct, rate, availableProduct});

    }

    invenAcc(status: string, date: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(`${environment.apiUrl}/Users/id`, { status, date});

    }
    getAllTransactions() {
        return this.http.get<Transaction[]>(`${environment.apiUrl}/StuffTransaction/transactions`);
    }
    getAllRooms() {
        return this.http.get<Room[]>(`${environment.apiUrl}/Room/rooms`);
    }
    getAllProducts() {
        return this.http.get<Product[]>(`${environment.apiUrl}/StuffProduct/products`);
    }
    getAllInventories() {
        return this.http.get<Inventory[]>(`${environment.apiUrl}/Users/inventores`);
    }
    getAllStudents() {
        return this.http.get<Student[]>(`${environment.apiUrl}/Student/students`);
    }
}

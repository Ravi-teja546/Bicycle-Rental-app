import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bicycle } from '../models/bicycle.model';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class BicycleService {
    userType: string;
    userName: string;
    constructor(private httpClient: HttpClient, private userService: UserService) {
        this.userService.utype.subscribe(data => {
            this.userType = data;
        });

        this.userService.user.subscribe( data => {
            this.userName = data;
        });
    }

    public getAllBicycles(): Observable<Bicycle[]> {
        if (this.userType === 'customer') {
            return this.httpClient.get<Bicycle[]>('http://localhost:8080/bicycle');
        } else {
            return this.getBicyclesByDealer();
        }
    }

    private getBicyclesByDealer(): Observable<Bicycle[]> {
        return this.httpClient.get<Bicycle[]>('http://localhost:8080/bicycle/dealer/' + this.userName);
    }

    public addBicycle(bicycle: Bicycle): Observable<Bicycle[]> {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<Bicycle[]>('http://localhost:8080/bicycle', bicycle, {headers});
    }

    public updateBicycle(bicycle: Bicycle): Observable<Bicycle[]> {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.put<Bicycle[]>('http://localhost:8080/bicycle', bicycle, {headers});
    }

    public deleteBicycle(regNo: string) {
        return this.httpClient.delete<Bicycle[]>('http://localhost:8080/bicycle/' + regNo);
    }

    public booknow(booking: Booking) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this.httpClient.post<Bicycle[]>('http://localhost:8080/booking', booking, {headers});
    }

    public getMyBookings(user: string): Observable<Booking[]> {
        return this.httpClient.get<Booking[]>('http://localhost:8080/booking/' + this.userType + '/' + user);
    }
}

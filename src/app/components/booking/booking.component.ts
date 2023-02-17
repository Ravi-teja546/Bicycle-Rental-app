import { Router } from '@angular/router';
import { Component, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BicycleService } from 'src/app/services/bicycle.service';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking.model';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  displayedColumns: string[];
  dataSource;
  userType: string;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageSize = 10;

    constructor(private userService: UserService, private router: Router, private bicycleService: BicycleService) {
        if (this.userService.isLoggedIn) {
            this.userType = this.userService.userType;
            this.bicycleService.getMyBookings(this.userService.userName).subscribe(data => {
                const bookings: Booking[] = data;
                console.log(data);
                this.displayedColumns = ['bookingId', 'bicycleId', 'customerId', 'dealerId', 'startDate', 'endDate'];
                this.dataSource = new MatTableDataSource(bookings);

                setTimeout(() => {
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                });
            });
        } else {
            this.router.navigateByUrl('/');
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}
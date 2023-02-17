import { AddEditDialogComponent } from './../dialog/add-edit-dialog.component';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { BicycleService } from 'src/app/services/bicycle.service';
import { UserService } from '../../services/user.service';
import { Bicycle, BicycleModel } from '../../models/bicycle.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {AddEditDialogDataModel} from '../../models/add-edit-dialog-data.model';
import { Router } from '@angular/router';
import { BooknowDialogComponent } from '../dialog/booknow-dialog.component';
import { BookingModel} from '../../models/booking.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[];
  dataSource;
  isAdding = false;
  isSelected = false;
  selectedRow: Bicycle;
  isEditing: false;
  bicycle: Bicycle;
  selection = new SelectionModel<Bicycle>(true, []); // allowMultiple, initialSelection
  userType: string;
  locations: string[] = ['--None--', 'Virginia', 'Washington DC' , 'Florida', 'New York'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pageSize = 10;

  constructor(private bicycleService: BicycleService, private userService: UserService, private dialog: MatDialog, private router: Router) {
    console.log('Inside Dashboard constructor');
    if (this.userService.isLoggedIn) {
      this.userType = this.userService.userType;
      this.bicycle = new BicycleModel();
      this.bicycleService.getAllBicycles().subscribe(data => {
        const bicycles: Bicycle[] = data;
        console.log(data);
        this.displayedColumns = ['brand', 'model', 'registrationNo', 'price', 'availability', 'locationId', 'dealerId', 'action'];
        this.dataSource = new MatTableDataSource(bicycles);

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle($event) {
    if ($event.checked) {
      this.onCompleteRow(this.dataSource);
    }
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Bicycle): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.brand}`;
  }

  private selectRow($event, row) {
    console.log('checked: ' + $event.checked);
    if ($event.checked) {
      this.selectedRow = row;
      console.log(row);
    }
    this.onSelect($event.checked);
  }

  onCompleteRow(dataSource) {
    dataSource.data.forEach(element => {
      console.log(element.model);
    });
  }

  onSelect(isSelected) {
    this.isSelected = isSelected;
  }

  addBicycle() {
    this.bicycleService.addBicycle(this.bicycle).subscribe(data => {
      this.isAdding = false;
    });
  }

  addNewBicycle() {
    const addEditDialogData = new AddEditDialogDataModel();
    addEditDialogData.isEdit = false;
    const addEditDialog = this.dialog.open(AddEditDialogComponent, {
      width: '350px',
      height: '550px',
      data: addEditDialogData
    });

    addEditDialog.afterClosed().subscribe(data => {
      this.onAddEdit(data);
    });
  }
  editRow(row: Bicycle) {
    const addEditDialogData = new AddEditDialogDataModel();
    addEditDialogData.isEdit = true;
    addEditDialogData.brand = row.brand;
    addEditDialogData.model = row.model;
    addEditDialogData.registrationNo = row.registrationNo;
    addEditDialogData.price = row.price;
    addEditDialogData.locationId = row.locationId;
    addEditDialogData.availability = row.availability;

    const addEditDialog = this.dialog.open(AddEditDialogComponent, {
      width: '350px',
      height: '550px',
      data: addEditDialogData
    });

    addEditDialog.afterClosed().subscribe(data => {
      this.onAddEdit(data);
    });
  }

  booknow(row: Bicycle) {
    const bookingData = new BookingModel();
    bookingData.bookingId = 0;
    bookingData.bicycleId = row.registrationNo;
    bookingData.customerId = this.userService.userName;
    bookingData.dealerId = row.dealerId;

    const booknowDialog = this.dialog.open(BooknowDialogComponent, {
      width: '450px',
      height: '550px',
      data: bookingData
    });

    booknowDialog.afterClosed().subscribe(data => {
      this.onBooking(data);
    });
  }

  onBooking(data) {
    console.log('Booking: ' + JSON.stringify(data));
    this.bicycleService.booknow(data).subscribe((res) => {
      console.log('booknow resp: ' + JSON.stringify(res));
           this.router.navigateByUrl('/booking');
    });
  }

  onAddEdit(data) {
      if (data) {
        const bicycle = new BicycleModel();
        bicycle.brand = data.brand;
        bicycle.model = data.model;
        bicycle.registrationNo = data.registrationNo;
        bicycle.price = data.price;
        bicycle.locationId = data.locationId;
        bicycle.availability = data.availability;
        bicycle.dealerId = this.userService.userName;

        if (data.isEdit) {
          this.bicycleService.updateBicycle(bicycle).subscribe((res) => {
            console.log('update resp: ' + JSON.stringify(res));
            this.bicycleService.getAllBicycles().subscribe(resp => {
              console.log('latest resp after update: ' + JSON.stringify(resp));
              const bicycles: Bicycle[] = resp;
              this.dataSource.data = bicycles;
            });
          });
        } else { // Add New
          this.bicycleService.addBicycle(bicycle).subscribe((res) => {
            console.log('add resp: ' + JSON.stringify(res));
            this.bicycleService.getAllBicycles().subscribe(resp => {
              console.log('latest resp after addition: ' + JSON.stringify(resp));
              const bicycles: Bicycle[] = resp;
              this.dataSource.data = bicycles;
            });
          });
        }
      } else {
        console.log('AddEdit Dialog Cancelled');
      }
  }

  onDelete(row: Bicycle) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '250px',
      data: row
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log('The dialog was closed: ' + JSON.stringify(data));
        this.bicycleService.deleteBicycle(data.registrationNo).subscribe(res => {
          console.log('delete resp: ' + JSON.stringify(res));
          this.bicycleService.getAllBicycles().subscribe(resp => {
            console.log('latest resp after delete: ' + JSON.stringify(resp));
            const bicycles: Bicycle[] = resp;
            this.dataSource.data = bicycles;
          });
        });
      }
    });
  }
}
